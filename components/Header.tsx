"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/#top" },
  { name: "Projects", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const Header = () => {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="sticky top-[14px] z-50 max-w-[1060px] mx-auto px-7">
      <div
        className="flex items-center gap-5 my-2.5 py-[9px] pl-5 pr-2.5 rounded-2xl border backdrop-blur-2xl shadow-[0_10px_30px_-24px_rgba(0,0,0,.5)]"
        style={{
          borderColor: "var(--line)",
          background: "color-mix(in oklab, var(--bg) 72%, transparent)",
        }}
      >
        <Link
          href="/#top"
          className="text-base font-bold tracking-tight whitespace-nowrap"
          style={{ color: "var(--ink)" }}
        >
          N.S
        </Link>

        <nav className="hidden md:flex gap-0.5 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold px-3.5 py-2 rounded-[9px] transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
              style={
                link.name === "Projects"
                  ? { color: "var(--ink)", background: "var(--card-2)" }
                  : { color: "var(--ink-2)" }
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div
          className="hidden md:flex items-center gap-1.5"
          style={{ color: "var(--ink-2)" }}
        >
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.75 23 11 23 14.3V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.52-2.3 3.1V21h-4V9Z" />
            </svg>
          </a>
          <span
            className="w-px h-5 mx-1"
            style={{ background: "var(--line)" }}
          />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center border-0 bg-transparent cursor-pointer text-[15px] transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
          >
            {dark ? "☀" : "☾"}
          </button>
        </div>

        <button
          className="md:hidden w-[34px] h-[34px] rounded-[9px] grid place-items-center border-0 bg-transparent cursor-pointer ml-auto"
          style={{ color: "var(--ink-2)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden mb-2.5 p-3 rounded-2xl border flex flex-col gap-1"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold px-3.5 py-2.5 rounded-[9px]"
              style={{ color: "var(--ink-2)" }}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-3.5 pt-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold"
              style={{ color: "var(--ink-2)" }}
            >
              GitHub
            </a>
            <span style={{ color: "var(--line)" }}>·</span>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold"
              style={{ color: "var(--ink-2)" }}
            >
              LinkedIn
            </a>
            <span style={{ color: "var(--line)" }}>·</span>
            <button
              onClick={toggleTheme}
              className="text-sm font-semibold"
              style={{ color: "var(--ink-2)" }}
            >
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
