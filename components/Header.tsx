"use client";

import { ListIcon, XIcon, SunIcon, MoonIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const routes = [
  { name: "Work", path: "/#work" },
  { name: "About", path: "/#about" },
  { name: "Credentials", path: "/credentials" },
  { name: "Contact", path: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of persisted theme on mount
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between py-4 md:py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-sm font-bold">
              N
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border pl-2 pr-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Available Now
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            {routes.map((r, i) => (
              <span key={r.path} className="flex items-center gap-2">
                {i !== 0 && <span className="text-border">&bull;</span>}
                <Link
                  href={r.path}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {r.name}
                </Link>
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </button>

            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground pl-4 pr-3.5 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Say Hello
              <ArrowUpRightIcon size={13} />
            </Link>

            <button
              className="md:hidden w-9 h-9 rounded-xl border border-border flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon size={16} /> : <ListIcon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-10 font-mono uppercase tracking-wider">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="text-2xl"
              onClick={() => setMobileOpen(false)}
            >
              {r.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
