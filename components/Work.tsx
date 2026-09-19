"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { FEATURED_PROJECTS } from "@/lib/projects";
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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const active = activeIdx === null ? null : FEATURED_PROJECTS[activeIdx];

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
              {FEATURED_PROJECTS.length} so far
            </span>
          </h2>
        </div>
      </div>

      <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
        {FEATURED_PROJECTS.map((p, idx) => (
          <button
            key={p.title}
            onClick={() => setActiveIdx(idx)}
            className="text-left flex flex-col rounded-[14px] border p-4.5 cursor-pointer transition-colors duration-200 hover:border-[var(--wire-2)]"
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
        ))}
      </div>

      <div className="flex justify-center mt-9">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 border rounded-[10px] whitespace-nowrap transition-colors duration-200 hover:bg-[var(--card-2)]"
          style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
        >
          View all projects <ArrowRightIcon size={15} />
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
