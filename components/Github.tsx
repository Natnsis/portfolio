"use client";
import { useEffect, useMemo, useState } from "react";
type ContributionDay = {
  date: string;
  weekday: number;
  contributionCount: number;
};

type Week = {
  contributionDays: ContributionDay[];
};

type Props = {
  username?: string;
  className?: string;
};

export default function GithubCalendar({
  username = "Natnsis",
  className = "github-calendar text-sm text-muted-foreground",
}: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(
          `/api/github-graphql?user=${encodeURIComponent(username)}`
        );
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          setErrorMessage(
            `Server error: ${res.status} ${res.statusText} ${text}`
          );
          setStatus("error");
          return;
        }
        const body = await res.json();
        if (body.errors) {
          setErrorMessage(JSON.stringify(body.errors));
          setStatus("error");
          return;
        }

        if (!mounted) return;

        setWeeks(body.weeks);
        setStatus("ready");
      } catch (err: unknown) {
        setErrorMessage(String(err));
        setStatus("error");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [username]);

  const columns = useMemo(() => {
    if (!weeks) return [];
    return weeks.map((w: Week) => w.contributionDays);
  }, [weeks]);

  const maxCount = useMemo(() => {
    if (!columns.length) return 0;
    let max = 0;
    columns.forEach((col: ContributionDay[]) =>
      col.forEach((d) => (max = Math.max(max, d.contributionCount)))
    );
    return max;
  }, [columns]);

  function levelFor(count: number) {
    if (count <= 0) return 0;
    if (maxCount === 0) return 1;
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }

  return (
    <div className="w-full">
      <section
        className={className}
        aria-live="polite"
        aria-label={`GitHub contributions calendar for ${username}`}
      >
        {status === "loading" && (
          <div className="text-sm text-muted-foreground">
            Loading GitHub activity…
          </div>
        )}

        {status === "error" && (
          <div className="text-sm text-destructive">
            <div>Failed to load contributions.</div>
            {errorMessage && (
              <div className="text-xs text-muted-foreground mt-1">
                {errorMessage}
              </div>
            )}
            <div className="mt-2">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="underline mr-4"
              >
                View on GitHub
              </a>
              <button
                className="text-xs underline"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {status === "ready" && (
          <div className="overflow-auto p-2">
            <div className="graph-wrapper">
              <div className="flex gap-1 md:gap-2 items-start justify-center flex-wrap">
                {columns.map((col: ContributionDay[], i: number) => (
                  <div key={i} className="flex flex-col gap-1 md:gap-2">
                    {col.map((d: ContributionDay) => {
                      const lvl = levelFor(d.contributionCount);
                      return (
                        <div
                          key={d.date}
                          title={`${d.contributionCount} contributions on ${d.date}`}
                          aria-label={`${d.contributionCount} contributions on ${d.date}`}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm border`}
                          style={{
                            background: `var(--contrib-${lvl})`,
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
