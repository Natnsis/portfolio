"use client";

import {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectThumb from "./ProjectThumb";

interface WorkModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
}

const ClampedText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`text-[15px] leading-[1.68] mb-1.5 ${expanded ? "" : "line-clamp-4"}`}
        style={{ color: "var(--ink-2)" }}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-[12px] font-semibold mb-6 cursor-pointer transition-colors hover:text-[var(--ink)]"
        style={{ color: "var(--ink-3)" }}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </>
  );
};

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
      className="fixed inset-0 z-[60] flex items-center justify-center px-5.5 py-[52px] overflow-y-auto"
      style={{ background: "rgba(15,17,19,.45)", backdropFilter: "blur(4px)" }}
    >
      <div
        key={project.title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1120px] max-h-[85vh] rounded-2xl border overflow-hidden shadow-[0_30px_70px_-30px_rgba(0,0,0,.5)] flex flex-col md:flex-row"
        style={{
          background: "var(--card)",
          borderColor: "var(--line)",
          animation: "fadeUp .28s ease both",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 grid place-items-center rounded-[8px] cursor-pointer transition-colors hover:bg-[var(--card-2)] hover:text-[var(--ink)]"
          style={{ background: "var(--card)", border: "1px solid var(--wire-2)", color: "var(--ink-2)" }}
        >
          <XIcon size={15} />
        </button>

        <div className="w-full h-40 sm:h-64 md:h-auto md:w-[46%] shrink-0" style={{ background: "var(--card-2)" }}>
          <ProjectThumb image={project.image} title={project.title} variant="full" />
        </div>

        <div className="flex-1 min-w-0 min-h-0 overflow-y-auto p-7 md:p-8.5">
          <div className="mb-5 pr-10">
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
          <ClampedText text={project.story} />

          <p
            className="text-[11px] font-semibold tracking-[.02em] mb-2"
            style={{ color: "var(--ink-3)" }}
          >
            How it was built
          </p>
          <ClampedText text={project.built} />

          <div
            className="flex items-center justify-between gap-4 pt-5 border-t flex-wrap"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[13px]" style={{ color: "var(--ink-3)" }}>
                {project.live ? "Live in production" : "Source only"}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-pulse inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full border px-3 py-1.5 transition-colors hover:bg-[var(--card-2)] hover:text-[var(--ink)]"
                  style={{ color: "var(--ink-2)", borderColor: "var(--wire-2)" }}
                >
                  View live <ArrowSquareOutIcon size={12} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-pulse inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full border px-3 py-1.5 transition-colors hover:bg-[var(--card-2)] hover:text-[var(--ink)]"
                  style={{ color: "var(--ink-2)", borderColor: "var(--wire-2)" }}
                >
                  Source <GithubLogoIcon size={12} />
                </a>
              )}
            </div>
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
    </div>
  );
};

export default WorkModal;
