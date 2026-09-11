"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
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

const Work = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const list =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  const active = activeIdx === null ? null : PROJECTS[activeIdx];

  return (
    <section id="work" className="pt-11 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="flex items-end justify-between gap-6 flex-wrap mb-7.5">
        <div>
          <p
            className="text-[11px] font-semibold tracking-[.02em] mb-2.5"
            style={{ color: "var(--ink-3)" }}
          >
            My work
          </p>
          <h2
            className="font-extrabold tracking-[-0.04em] leading-none flex items-end gap-3 flex-wrap"
            style={{ fontSize: "clamp(30px,4vw,40px)", color: "var(--ink)" }}
          >
            Featured{" "}
            <span
              style={{ color: "transparent", WebkitTextStroke: "1.4px var(--ink)" }}
            >
              Projects
            </span>
            <span
              className="font-caveat font-semibold tracking-normal text-[19px] pb-1.5"
              style={{ color: "var(--ink-2)", transform: "rotate(-4deg)" }}
            >
              nine so far
            </span>
          </h2>
        </div>
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
      </div>

      <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
        {list.map((p) => {
          const idx = PROJECTS.indexOf(p);
          return (
            <button
              key={p.title}
              onClick={() => setActiveIdx(idx)}
              className="text-left flex flex-col rounded-[14px] border p-4.5 cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:border-[var(--wire-2)] hover:shadow-[0_16px_30px_-22px_rgba(0,0,0,.35)]"
              style={{ background: "var(--card)", borderColor: "var(--line)" }}
            >
              <CardThumb />
              <h3
                className="text-[17px] font-bold tracking-[-0.02em] mb-2"
                style={{ color: "var(--ink)" }}
              >
                {p.title}
              </h3>
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

export default Work;
