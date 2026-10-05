"use client";

import { useState } from "react";
import { NAV, type NavKey, navHref, RESUME_URL } from "@/lib/site";
import { SocialDots } from "./artsy/Bits";
import { ArrowDown, Close, Heart, Menu, NavIcons, Smiley } from "./icons";

const ITEM =
  "ca-mono flex items-center gap-2.5 px-5 py-4 text-sm font-bold uppercase leading-none tracking-widest text-ca-ink transition-colors";

const SiteHeader = ({ active }: { active: NavKey }) => {
  const [open, setOpen] = useState(false);
  const onHome = active !== "projects";
  const home = onHome ? "#top" : "/";

  return (
    <header className="sticky top-0 z-50 bg-ca-surface/95 backdrop-blur-sm">
      <div className="relative flex items-stretch justify-between border-b border-ca-ink/10 pl-4 pr-3 sm:pl-5">
        <div className="flex items-stretch gap-2">
          <a href={home} aria-label="Natnael Sisay — home" className="flex items-center pr-2">
            <Smiley />
          </a>
          <nav className="hidden items-stretch md:flex">
            {NAV.map((l) => {
              const Icon = NavIcons[l.key];
              const current = l.key === active;
              return (
                <a
                  key={l.key}
                  href={navHref(l, onHome)}
                  aria-current={current ? "page" : undefined}
                  className={`${ITEM} justify-center ${current ? "bg-ca-yellow" : "hover:bg-ca-chrome"}`}
                >
                  <Icon />
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 py-2">
          <SocialDots className="hidden min-[360px]:flex" />
          <a
            href={onHome ? "#contact" : "/#contact"}
            className="ca-mono hidden items-center gap-2.5 border-2 border-ca-ink px-5 py-2 text-sm font-bold uppercase tracking-widest text-ca-ink transition-colors hover:bg-ca-ink hover:text-white sm:inline-flex"
          >
            <Heart />
            Contact
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center border-2 border-ca-ink bg-ca-surface md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="absolute inset-x-0 top-full flex flex-col border-b-2 border-ca-ink bg-ca-surface md:hidden">
            {NAV.map((l) => {
              const Icon = NavIcons[l.key];
              return (
                <a
                  key={l.key}
                  href={navHref(l, onHome)}
                  onClick={() => setOpen(false)}
                  className={`${ITEM} border-t border-ca-ink/10 ${l.key === active ? "bg-ca-yellow" : ""}`}
                >
                  <Icon />
                  {l.label}
                </a>
              );
            })}
            <a
              href={onHome ? "#contact" : "/#contact"}
              onClick={() => setOpen(false)}
              className={`${ITEM} border-t border-ca-ink/10`}
            >
              <Heart className="h-5 w-5" />
              Contact
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ITEM} border-t border-ca-ink/10`}
            >
              <ArrowDown className="h-5 w-5" />
              Resume
            </a>
            <SocialDots className="border-t border-ca-ink/10 px-5 py-4 min-[360px]:hidden" />
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
