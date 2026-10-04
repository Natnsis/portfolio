"use client";

import Link from "next/link";
import { useState } from "react";
import { FILTERS, PROJECTS } from "@/lib/projects";
import { ArrowDisc } from "./icons";
import ProjectRow from "./ProjectRow";
import WorkModal from "./WorkModal";

const Projects = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const list =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));
  const active = activeIdx === null ? null : PROJECTS[activeIdx];
  const liveCount = PROJECTS.filter((p) => p.live).length;

  return (
    <section
      className="bg-navy text-white gutter-x"
      style={{ paddingTop: "clamp(48px,6vw,96px)", paddingBottom: "clamp(80px,12vw,160px)" }}
    >
      <p className="mb-4 eyebrow text-white/60">All work</p>
      <h1 className="mb-6 mt-0 display" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>
        Every project
        <br />
        <span className="text-white/50">I&apos;ve shipped</span>
      </h1>
      <p className="mb-10 mt-0 max-w-[46ch] text-base font-light leading-[1.65] text-white/75">
        Some are in production, some are experiments that got out of hand. Filter by
        category or open one up for the full story.
      </p>
      <div className="mb-16 flex flex-wrap gap-8 eyebrow text-white/60">
        <span>{PROJECTS.length} projects</span>
        <span>{liveCount} live in production</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 py-8">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative cursor-pointer border-0 bg-transparent p-0 pb-2 text-xs font-medium uppercase tracking-[.15em] transition-colors ${
                f === filter ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {f}
              {f === filter && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current" />}
            </button>
          ))}
        </div>
        <Link href="/#contact" className="group inline-flex items-center gap-4">
          <span className="text-xs uppercase tracking-[.3em] text-white/80">
            Have something in mind?
          </span>
          <ArrowDisc />
        </Link>
      </div>

      <div className="flex flex-col border-b border-white/15">
        {list.map((p) => {
          const idx = PROJECTS.indexOf(p);
          return (
            <ProjectRow key={p.title} project={p} index={idx} onOpen={() => setActiveIdx(idx)} />
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="mt-16 text-center eyebrow text-white/50">
          Nothing here matches that filter.
        </p>
      )}

      <WorkModal
        project={active}
        onClose={() => setActiveIdx(null)}
        onNext={() => setActiveIdx((i) => (i === null ? null : (i + 1) % PROJECTS.length))}
      />
    </section>
  );
};

export default Projects;
