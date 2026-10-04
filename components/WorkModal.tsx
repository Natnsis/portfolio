"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { ArrowRight, ArrowUpRight, Close } from "./icons";

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
        className={`mb-2 mt-0 text-[15px] font-light leading-[1.7] text-white/75 ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mb-8 cursor-pointer border-0 bg-transparent p-0 text-[11px] uppercase tracking-[.2em] text-white/50 transition-colors hover:text-white"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </>
  );
};

const OutLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 text-xs uppercase tracking-[.2em] text-white/80"
  >
    {label}
    <span className="flex size-8 items-center justify-center rounded-full border border-white/30">
      <ArrowUpRight size={14} />
    </span>
  </a>
);

const WorkModal = ({ project, onClose, onNext }: WorkModalProps) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#0f1a26]/70 px-5 py-12 backdrop-blur-sm"
    >
      <div
        key={project.title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-[1120px] flex-col overflow-hidden border border-white/15 bg-navy text-white md:flex-row"
        style={{ animation: "fadeUp .28s ease both" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-navy text-white transition-colors hover:border-white"
        >
          <Close size={16} />
        </button>

        <div className="h-48 w-full shrink-0 bg-white/5 sm:h-64 md:h-auto md:w-[46%]">
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          )}
        </div>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-7 md:p-10">
          <p className="mb-4 mt-0 pr-12 text-[11px] uppercase tracking-[.25em] text-white/50">
            {project.meta}
          </p>
          <h3 className="mb-5 mt-0 pr-12 display" style={{ fontSize: "clamp(1.5rem,2.4vw,2.25rem)" }}>
            {project.title}
          </h3>
          <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
            {project.tags.map((t) => (
              <span key={t} className="text-[11px] uppercase tracking-[.2em] text-white/60">
                {t}
              </span>
            ))}
          </div>

          <p className="mb-3 mt-0 text-[11px] uppercase tracking-[.3em] text-white/50">The story</p>
          <ClampedText text={project.story} />

          <p className="mb-3 mt-0 text-[11px] uppercase tracking-[.3em] text-white/50">
            How it was built
          </p>
          <ClampedText text={project.built} />

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
            <div className="flex flex-wrap items-center gap-6">
              {project.liveUrl && <OutLink href={project.liveUrl} label="View live" />}
              {project.githubUrl && <OutLink href={project.githubUrl} label="Source" />}
              {!project.liveUrl && !project.githubUrl && (
                <span className="text-xs uppercase tracking-[.2em] text-white/50">
                  {project.live ? "Live in production" : "Source only"}
                </span>
              )}
            </div>
            <button
              onClick={onNext}
              className="group inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-xs uppercase tracking-[.2em] text-white"
            >
              Next project
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-gray-800 transition-transform group-hover:scale-110">
                <ArrowRight size={14} strokeWidth={1.75} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
