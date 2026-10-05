"use client";

import { useState } from "react";
import { FILTERS, PROJECTS } from "@/lib/projects";
import { HandLabel, TAG, TapeFlat } from "./artsy/Bits";
import { cardTheme } from "./artsy/cardThemes";
import Letters from "./artsy/Letters";
import Reveal from "./artsy/Reveal";
import { ArrowUpRight } from "./icons";
import WorkModal from "./WorkModal";

const Projects = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));
  const active = activeIdx === null ? null : PROJECTS[activeIdx];
  const liveCount = PROJECTS.filter((p) => p.live).length;

  return (
    <section id="top" className="ca-grid scroll-mt-24 px-4 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <HandLabel underline="w-28">everything I&apos;ve shipped!</HandLabel>
        <span className="mt-6 block">
          <Letters
            text="ALL PROJECTS"
            className="max-w-[9ch] text-6xl leading-[0.92] tracking-tight text-ca-ink sm:text-8xl lg:text-9xl"
          />
        </span>
        <Reveal from="translateY(-28px) rotate(-5.4deg)" to="rotate(-3deg)" className="mt-8 max-w-md">
          <span className="ca-tape inline-block bg-ca-yellow-soft px-6 py-2.5 text-base font-medium leading-snug text-ca-ink shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)]">
            Some are in production, some are experiments that got out of hand. Open one for the
            full story.
          </span>
        </Reveal>
        <div className="ca-mono mt-10 flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
          <span className="inline-flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-ca-blue" />
            {PROJECTS.length} projects
          </span>
          <span className="inline-flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-ca-green" />
            {liveCount} live in production
          </span>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
            className={`${TAG} text-sm transition-colors ${
              f === filter ? "bg-ca-ink text-white" : "bg-ca-chrome text-ca-ink hover:bg-ca-yellow"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => {
          const idx = PROJECTS.indexOf(p);
          const t = cardTheme(idx);
          return (
            <Reveal key={p.title} from="translateY(28px) scale(0.97)">
              <button
                onClick={() => setActiveIdx(idx)}
                className="group flex h-full w-full flex-col p-5 text-left transition-transform duration-200 hover:-translate-y-1 sm:p-6"
                style={{ backgroundColor: t.bg }}
              >
                <div className="relative w-full">
                  <TapeFlat w="w-20" />
                  <div className="aspect-[16/10] w-full overflow-hidden border-4" style={{ borderColor: t.accent }}>
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                </div>
                <span className={`ca-mono mt-6 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] ${t.text}`}>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: t.accent }} />
                  {p.meta}
                </span>
                <h2 className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${t.text}`}>{p.title}</h2>
                <p className={`mt-3 text-base leading-relaxed ${t.body}`}>{p.summary}</p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className={`${TAG} text-xs ${t.tag}`} style={{ backgroundColor: t.accent }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className={`h-6 w-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${t.text}`}
                  />
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="ca-hand mt-16 text-center text-3xl text-ca-ink/60">
          nothing here matches that filter (yet!)
        </p>
      )}

      <WorkModal
        project={active}
        index={activeIdx ?? 0}
        onClose={() => setActiveIdx(null)}
        onNext={() => setActiveIdx((i) => (i === null ? null : (i + 1) % PROJECTS.length))}
      />
    </section>
  );
};

export default Projects;
