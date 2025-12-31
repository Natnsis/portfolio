export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const user = url.searchParams.get("user") || "Natnsis"

    const res = await fetch(
      `https://github.com/users/${encodeURIComponent(
        user,
      )}/contributions`,
      {
        headers: { "User-Agent": "nextjs-github-calendar-proxy" },
      },
    )

    if (!res.ok) {
      return new Response("Failed to fetch contributions from GitHub", {
        status: 502,
      })
    }

    const svg = await res.text()
    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
    })
  } catch (err) {
    return new Response("Server error", { status: 500 })
  }
}
