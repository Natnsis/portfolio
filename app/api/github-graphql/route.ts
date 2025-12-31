import { NextResponse } from "next/server";

type CacheEntry = {
  ts: number;
  data: any;
};

const CACHE_TTL = 60 * 60; // 1 hour
const cache = new Map<string, CacheEntry>();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const user = url.searchParams.get("user") || "Natnsis";

    // Return cached
    const key = `github-graphql:${user}`;
    const now = Date.now() / 1000;
    const cached = cache.get(key);
    if (cached && now - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.data, { status: 200 });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Missing GITHUB_TOKEN on server" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      query($login:String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  weekday
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const resp = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: user } }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return new Response(
        `GitHub GraphQL error: ${resp.status} ${resp.statusText} ${text}`,
        { status: 502 }
      );
    }

    const body = await resp.json();
    if (body.errors) {
      return NextResponse.json({ errors: body.errors }, { status: 502 });
    }

    const weeks =
      body.data.user.contributionsCollection.contributionCalendar.weeks;

    const data = {
      weeks,
      total:
        body.data.user.contributionsCollection.contributionCalendar
          .totalContributions,
    };

    cache.set(key, { ts: now, data });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}
