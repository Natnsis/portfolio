"use client";

import { useEffect, useState } from "react";
import { FILTERS, imageAt, PROJECTS, projectMeta } from "@/lib/projects";
import OpenBook from "./Book";

const ProjectList = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="mx-auto max-w-3xl px-5 pb-10 pt-8 sm:pt-14">
      <h1 className="font-serif text-5xl">All projects</h1>
      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-dk-mute">
        Some are in production, some are experiments that got out of hand. Open one for the full story.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const n = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(f)).length;
          const on = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={on}
              className={`rounded-full px-3 py-1 text-[13px] ring-1 transition-colors ${
                on ? "bg-dk-amber text-dk-ink ring-dk-amber" : "bg-dk-wood text-dk-cream/80 ring-dk-line hover:ring-dk-faint"
              }`}
            >
              {f} <span className={on ? "text-dk-ink/60" : "text-dk-faint"}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 divide-y divide-dk-line border-t border-dk-line">
        {list.map((p) => {
          const i = PROJECTS.indexOf(p);
          const { kind, year } = projectMeta(p);
          return (
            <li key={p.title}>
              <button onClick={() => setOpen(i)} className="group flex w-full flex-col gap-5 py-7 text-left sm:flex-row sm:items-start">
                <span className="block aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10 sm:w-56">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageAt(p.image, 600)}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-2xl text-dk-cream group-hover:text-dk-amber">{p.title}</span>
                    {p.live && <span className="text-[12px] text-[#9fdc7c]">● live</span>}
                  </span>
                  <span className="mt-1 block text-[13px] text-dk-faint">
                    {kind} · {year}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-dk-mute">{p.summary}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded bg-dk-wood px-2 py-0.5 font-mono text-[12px] text-dk-cream/75 ring-1 ring-dk-line">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && <p className="py-16 text-center text-dk-faint">Nothing here matches that filter (yet).</p>}

      {open !== null && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-3 sm:p-8">
          <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" className="mx-auto max-w-5xl">
            <OpenBook
              index={open}
              onClose={() => setOpen(null)}
              onPrev={() => setOpen((open - 1 + PROJECTS.length) % PROJECTS.length)}
              onNext={() => setOpen((open + 1) % PROJECTS.length)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectList;
