"use client";

import {
  ArrowRightIcon,
  FolderIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { FILTERS, PROJECTS } from "@/lib/projects";
import WorkModal from "./WorkModal";

const CardThumb = () => (
  <div
    className="h-32 rounded-[9px] grid place-items-center mb-4.5 overflow-hidden"
    style={{ background: "var(--card-2)" }}
  >
    <div className="w-[76%] flex gap-[7px] items-stretch h-[66%]">
      <div
        className="w-[26%] rounded-[4px] p-[7px] flex flex-col gap-[5px]"
        style={{ background: "var(--wire)" }}
      >
        <span className="h-1 rounded-full" style={{ background: "var(--card)" }} />
        <span
          className="h-1 w-[78%] rounded-full"
          style={{ background: "var(--card)" }}
        />
        <span
          className="h-1 w-[62%] rounded-full"
          style={{ background: "var(--card)" }}
        />
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
        <div className="flex-1 flex gap-1.5">
          <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
          <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const list =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  const active = activeIdx === null ? null : PROJECTS[activeIdx];
  const liveCount = PROJECTS.filter((p) => p.live).length;

  return (
    <section className="pt-14 pb-24">
      <p
        className="text-[11px] font-semibold tracking-[.02em] mb-2.5"
        style={{ color: "var(--ink-3)" }}
      >
        All work
      </p>
      <h1
        className="font-extrabold tracking-[-0.045em] leading-[1.02] mb-4"
        style={{ fontSize: "clamp(34px,4.6vw,52px)", color: "var(--ink)" }}
      >
        Every{" "}
        <span
          style={{ color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }}
        >
          project
        </span>
        <br />
        I&apos;ve shipped.
      </h1>
      <p
        className="text-[15px] leading-[1.6] max-w-[46ch] mb-9"
        style={{ color: "var(--ink-2)" }}
      >
        Some are in production, some are experiments that got out of hand.
        Filter by category or open one up for the full story.
      </p>

      <div className="flex items-center gap-6 flex-wrap mb-10">
        <div
          className="flex items-center gap-2.5 rounded-full border pl-3 pr-4 py-2"
          style={{ borderColor: "var(--line)" }}
        >
          <span
            className="w-6 h-6 rounded-full grid place-items-center"
            style={{ background: "var(--card-2)", color: "var(--ink)" }}
          >
            <FolderIcon size={13} />
          </span>
          <span className="text-[13px] font-semibold" style={{ color: "var(--ink-2)" }}>
            {PROJECTS.length} projects
          </span>
        </div>
        <div
          className="flex items-center gap-2.5 rounded-full border pl-3 pr-4 py-2"
          style={{ borderColor: "var(--line)" }}
        >
          <span
            className="w-6 h-6 rounded-full grid place-items-center"
            style={{ background: "var(--card-2)", color: "var(--ink)" }}
          >
            <RocketLaunchIcon size={13} />
          </span>
          <span className="text-[13px] font-semibold" style={{ color: "var(--ink-2)" }}>
            {liveCount} live in production
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 flex-wrap mb-7.5 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="flex gap-1 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-sm font-semibold px-[19px] py-2.5 border-0 rounded-full cursor-pointer transition-colors duration-200"
              style={{
                background: f === filter ? "var(--dark)" : "transparent",
                color: f === filter ? "var(--bg)" : "var(--ink-2)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--ink)]"
          style={{ color: "var(--ink-2)" }}
        >
          Have something in mind? <ArrowRightIcon size={14} />
        </Link>
      </div>

      <div
        className="grid gap-4.5"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}
      >
        {list.map((p) => {
          const idx = PROJECTS.indexOf(p);
          return (
            <button
              key={p.title}
              onClick={() => setActiveIdx(idx)}
              className="text-left flex flex-col rounded-[14px] border p-4.5 cursor-pointer transition-colors duration-200 hover:border-[var(--wire-2)]"
              style={{ background: "var(--card)", borderColor: "var(--line)" }}
            >
              <CardThumb />
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  className="text-[17px] font-bold tracking-[-0.02em]"
                  style={{ color: "var(--ink)" }}
                >
                  {p.title}
                </h3>
                <span
                  className="shrink-0 mt-0.5 text-[10px] font-semibold rounded-full px-2 py-0.5"
                  style={
                    p.live
                      ? { color: "var(--bg)", background: "var(--dark)" }
                      : { color: "var(--ink-2)", background: "var(--card-2)" }
                  }
                >
                  {p.live ? "Live" : "Source"}
                </span>
              </div>
              <p
                className="text-sm leading-[1.5] min-h-[42px]"
                style={{ color: "var(--ink-2)" }}
              >
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4 items-center">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold rounded-full px-2.5 py-1"
                    style={{ color: "var(--ink-2)", background: "var(--card-2)" }}
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto" style={{ color: "var(--ink-2)" }}>
                  <ArrowRightIcon size={15} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {list.length === 0 && (
        <p
          className="text-center text-sm mt-16"
          style={{ color: "var(--ink-3)" }}
        >
          Nothing here matches that filter.
        </p>
      )}

      <WorkModal
        project={active}
        onClose={() => setActiveIdx(null)}
        onNext={() =>
          setActiveIdx((i) => (i === null ? null : (i + 1) % PROJECTS.length))
        }
      />
    </section>
  );
};

export default Projects;
