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
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-tertiary">
        {loading ? "…" : total ?? "—"}{" "}
        <span className="text-sm">GitHub contributions this year</span>
      </h1>
      <nav className=" flex gap-3 items-center">
        <Button size="icon" variant="ghost">
          <SendIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <GithubIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <LinkedinIcon />
        </Button>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
