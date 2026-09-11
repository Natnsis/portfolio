"use client";

import {
  EnvelopeIcon,
  FolderIcon,
  HouseIcon,
  LinkedinLogoIcon,
  MoonIcon,
  SunIcon,
  TelegramLogoIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const routes = [
  { id: "top", href: "/#top", label: "Home", icon: HouseIcon },
  { id: "work", href: "/#work", label: "Projects", icon: FolderIcon },
  { id: "about", href: "/#about", label: "About", icon: UserIcon },
  { id: "contact", href: "/#contact", label: "Contact", icon: EnvelopeIcon },
];

const iconButtonClass =
  "w-8 h-8 rounded-[9px] grid place-items-center transition-colors duration-200 hover:text-[var(--ink)] hover:bg-[var(--card-2)]";

const SideDock = () => {
  const [dark, setDark] = useState(false);
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
    const sections = routes
      .map((r) => document.getElementById(r.id))
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
    <div
      className="fixed z-40 flex flex-row sm:flex-col items-center gap-1 p-1.5 rounded-2xl border bottom-4 left-1/2 -translate-x-1/2 sm:left-6 sm:top-1/2 sm:bottom-auto sm:translate-x-0 sm:-translate-y-1/2"
      style={{ background: "var(--bg)", borderColor: "var(--line)" }}
    >
      {routes.map((r) => (
        <Link
          key={r.id}
          href={r.href}
          aria-label={r.label}
          className={iconButtonClass}
          style={
            active === r.id
              ? { color: "var(--ink)", background: "var(--card-2)" }
              : { color: "var(--ink-2)" }
          }
        >
          <r.icon size={16} />
        </Link>
      ))}

      <span
        className="w-px h-5 sm:w-5 sm:h-px mx-1 sm:mx-0 sm:my-1"
        style={{ background: "var(--line)" }}
      />

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={iconButtonClass}
        style={{ color: "var(--ink-2)" }}
      >
        {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </button>
      <a
        href="https://www.linkedin.com/in/natnael-sisay-orcadev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={iconButtonClass}
        style={{ color: "var(--ink-2)" }}
      >
        <LinkedinLogoIcon size={16} />
      </a>
      <a
        href="https://t.me/Flawless_22_4"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className={iconButtonClass}
        style={{ color: "var(--ink-2)" }}
      >
        <TelegramLogoIcon size={16} />
      </a>
    </div>
  );
};

export default SideDock;
