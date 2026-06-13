"use client";

import { ListIcon, XIcon, SunIcon, MoonIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const routes = [
  { name: "Work", path: "/#work" },
  { name: "About", path: "/#about" },
  { name: "Contact", path: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 bg-background flex items-center justify-between py-5 md:py-6">
      <Link href="/" className="text-base font-medium tracking-tight">
        Natnael<span className="text-primary">.</span>
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {r.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-10">
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
    </header>
  );
};

export default Header;
