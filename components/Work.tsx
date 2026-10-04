"use client";

import Link from "next/link";
import { useState } from "react";
import { FEATURED_PROJECTS, PROJECTS } from "@/lib/projects";
import { ArrowDisc } from "./icons";
import ProjectRow from "./ProjectRow";
import WorkModal from "./WorkModal";

const Work = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx === null ? null : FEATURED_PROJECTS[activeIdx];

  return (
    <section
      id="work"
      className="bg-navy text-white gutter-x"
      style={{ paddingBlock: "clamp(80px,12vw,160px)" }}
    >
      <div
        className="flex flex-wrap items-end justify-between gap-6"
        style={{ marginBottom: "clamp(48px,6vw,96px)" }}
      >
        <div>
          <p className="mb-4 eyebrow text-white/60">My work</p>
          <h2 className="m-0 display" style={{ fontSize: "clamp(2rem,4vw,4rem)" }}>
            Featured projects
          </h2>
        </div>
        <p className="m-0 eyebrow text-white/60">{PROJECTS.length} so far</p>
      </div>

      <div className="flex flex-col">
        {FEATURED_PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} index={i} onOpen={() => setActiveIdx(i)} />
        ))}
      </div>

      <div className="flex justify-end border-t border-white/15 pt-12">
        <Link href="/projects" className="group inline-flex items-center gap-4">
          <span className="text-sm uppercase tracking-[.3em] text-white/80">
            View all projects
          </span>
          <ArrowDisc />
        </Link>
      </div>

      <WorkModal
        project={active}
        onClose={() => setActiveIdx(null)}
        onNext={() =>
          setActiveIdx((i) => (i === null ? null : (i + 1) % FEATURED_PROJECTS.length))
        }
      />
    </section>
  );
};

export default Work;
