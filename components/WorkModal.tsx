"use client";

import { ArrowRightIcon, XIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import type { Project } from "@/lib/projects";

interface WorkModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
}

const WorkModal = ({ project, onClose, onNext }: WorkModalProps) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start justify-center px-5.5 py-[52px] overflow-y-auto"
      style={{ background: "rgba(15,17,19,.45)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[660px] rounded-2xl border p-8.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,.5)]"
        style={{
          background: "var(--card)",
          borderColor: "var(--line)",
          animation: "fadeUp .28s ease both",
        }}
      >
        <div className="flex items-start justify-between gap-5 mb-5">
          <div>
            <p
              className="text-[11px] font-semibold tracking-[.02em] mb-2.5"
              style={{ color: "var(--ink-3)" }}
            >
              {project.meta}
            </p>
            <h3
              className="text-[25px] font-bold tracking-[-0.03em]"
              style={{ color: "var(--ink)" }}
            >
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 shrink-0 grid place-items-center border rounded-[8px] bg-transparent cursor-pointer transition-colors hover:bg-[var(--card-2)] hover:text-[var(--ink)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink-2)" }}
          >
            <XIcon size={15} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold rounded-full px-2.5 py-1"
              style={{ color: "var(--ink-2)", background: "var(--card-2)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          className="text-[11px] font-semibold tracking-[.02em] mb-2"
          style={{ color: "var(--ink-3)" }}
        >
          The story
        </p>
        <p
          className="text-[15px] leading-[1.68] mb-6"
          style={{ color: "var(--ink-2)" }}
        >
          {project.story}
        </p>

        <p
          className="text-[11px] font-semibold tracking-[.02em] mb-2"
          style={{ color: "var(--ink-3)" }}
        >
          How it was built
        </p>
        <p
          className="text-[15px] leading-[1.68] mb-7"
          style={{ color: "var(--ink-2)" }}
        >
          {project.built}
        </p>

        <div
          className="flex items-center justify-between gap-4 pt-5 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="text-[13px]" style={{ color: "var(--ink-3)" }}>
            {project.live ? "Live in production" : "Source only"}
          </span>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold border rounded-[9px] px-4.5 py-2.5 whitespace-nowrap cursor-pointer transition-colors hover:bg-[var(--card-2)]"
            style={{ color: "var(--ink)", borderColor: "var(--wire-2)" }}
          >
            Next project <ArrowRightIcon size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
