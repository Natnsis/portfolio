"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { PROJECTS_PATH } from "@/lib/site";
import OpenBook from "./Book";

const N = PROJECTS.length;

// Cool cloth covers to match the slate room, with one amber now and then: [cover, text].
const COVERS: [string, string][] = [
  ["#2f3a52", "#dfe6f0"],
  ["#d6dce6", "#1f2430"],
  ["#34464a", "#dfe9e7"],
  ["#b07f4b", "#fff4e6"],
  ["#20242e", "#c9d1de"],
  ["#4a5b78", "#eef2f8"],
  ["#66778c", "#f2f5f9"],
];

// Deterministic per-book size so the shelf looks lived in, not uniform.
const spine = (i: number) => ({
  height: 228 + ((i * 37) % 5) * 13,
  width: 48 + ((i * 53) % 4) * 5,
  cover: COVERS[(i * 3) % COVERS.length],
});

const Shelf = () => {
  // Newest project starts open, so there's something to read before any click.
  const [open, setOpen] = useState(N - 1);
  const bookRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLUListElement>(null);

  // On narrow screens the shelf scrolls sideways; keep the open book's spine in view.
  useEffect(() => {
    const ul = shelfRef.current;
    const li = ul?.children[open] as HTMLElement | undefined;
    if (!ul || !li || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: li.offsetLeft - ul.clientWidth / 2 + li.offsetWidth / 2, behavior: "smooth" });
  }, [open]);

  const pick = (i: number, scroll = false) => {
    setOpen(i);
    if (scroll) bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="relative">
        <ul ref={shelfRef} className="relative flex items-end gap-1.5 overflow-x-auto px-4 pt-6 [scrollbar-width:none] justify-center-safe lg:px-0">
          {PROJECTS.map((p, i) => {
            const s = spine(i);
            const on = i === open;
            return (
              <li key={p.title} className="shrink-0">
                <button
                  onClick={() => pick(i)}
                  aria-label={`Open ${p.title}`}
                  aria-pressed={on}
                  title={p.title}
                  className={`group relative flex flex-col items-center justify-between rounded-t-[3px] py-3 shadow-[inset_-6px_0_10px_-6px_rgba(0,0,0,0.45),inset_4px_0_6px_-4px_rgba(255,255,255,0.15)] transition-transform duration-300 ease-out ${
                    on ? "-translate-y-5" : "hover:-translate-y-2"
                  }`}
                  style={{ height: s.height, width: s.width, backgroundColor: s.cover[0], color: s.cover[1] }}
                >
                  <span aria-hidden className="w-full border-y border-current opacity-30" style={{ height: 5 }} />
                  <span className="font-mono text-[10px] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex min-h-0 flex-1 items-center overflow-hidden py-2">
                    <span className="whitespace-nowrap font-serif text-[13px] leading-none [writing-mode:vertical-rl] rotate-180">
                      {p.title}
                    </span>
                  </span>
                  {p.live ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-dk-live" title="Live" />
                  ) : (
                    <span className="h-1.5 w-1.5" />
                  )}
                  <span aria-hidden className="mt-2 w-full border-y border-current opacity-30" style={{ height: 5 }} />
                </button>
              </li>
            );
          })}
        </ul>
        {/* The plank */}
        <div className="relative h-4 rounded-sm bg-gradient-to-b from-[#3b4254] to-[#1c2029] shadow-[0_18px_30px_-8px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[13px] text-dk-faint">
        <span>
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-dk-live align-middle" />
          dot = live in production
        </span>
        <Link href={PROJECTS_PATH} className="text-dk-mute hover:text-dk-sky">
          Prefer a plain list? →
        </Link>
      </div>

      <div ref={bookRef} className="mt-10 scroll-mt-6">
        <OpenBook
          key={open}
          index={open}
          onPrev={() => pick((open - 1 + N) % N, true)}
          onNext={() => pick((open + 1) % N, true)}
        />
      </div>
    </div>
  );
};

export default Shelf;
