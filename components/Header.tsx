"use client";

import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon, SendIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

const Header = ({ username = "Natnsis" }: { username?: string }) => {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          `/api/github-graphql?user=${encodeURIComponent(username)}`
        );
        if (!res.ok) return;
        const body = await res.json();
        if (!mounted) return;
        setTotal(body.total ?? null);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [username]);

  return (
    <header className="flex flex-col md:flex-row md:justify-between gap-3 items-start md:items-center">
      <h1 className="text-lg md:text-2xl font-tertiary">
        {loading ? "…" : total ?? "—"}{" "}
        <span className="block text-sm">GitHub contributions this year</span>
      </h1>
      <nav className="flex flex-wrap gap-3 items-center">
        <Button asChild size="icon" variant="ghost">
          <a
            href="https://t.me/Flawless_22_4"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
          >
            <SendIcon />
          </a>
        </Button>

        <Button asChild size="icon" variant="ghost">
          <a
            href="https://github.com/Natnsis"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        </Button>

        <Button asChild size="icon" variant="ghost">
          <a
            href="https://www.linkedin.com/in/natnael-sisay-orcadev/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
        </Button>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
