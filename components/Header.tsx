"use client";

import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/#top", id: "top" },
  { name: "Projects", href: "/#work", id: "work" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

const Header = () => {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("top");

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

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
                active === link.id
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
            <GithubLogoIcon size={19} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
          >
            <LinkedinLogoIcon size={19} />
          </a>
          <span
            className="w-px h-5 mx-1"
            style={{ background: "var(--line)" }}
          />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center border-0 bg-transparent cursor-pointer transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]"
          >
            {dark ? <SunIcon size={17} /> : <MoonIcon size={17} />}
          </button>
        </div>

        <button
          className="md:hidden w-[34px] h-[34px] rounded-[9px] grid place-items-center border-0 bg-transparent cursor-pointer ml-auto"
          style={{ color: "var(--ink-2)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon size={18} /> : <ListIcon size={18} />}
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
              style={
                active === link.id
                  ? { color: "var(--ink)", background: "var(--card-2)" }
                  : { color: "var(--ink-2)" }
              }
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 px-3.5 pt-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "var(--ink-2)" }}
            >
              <GithubLogoIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "var(--ink-2)" }}
            >
              <LinkedinLogoIcon size={18} />
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--ink-2)" }}
            >
              {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
