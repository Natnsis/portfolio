"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { TAG, TapeFlat } from "./artsy/Bits";
import { cardTheme } from "./artsy/cardThemes";
import { ArrowRight, ArrowUpRight, Close } from "./icons";

interface WorkModalProps {
  project: Project | null;
  // Position in the list it was opened from, so the colorway matches the card.
  index: number;
  onClose: () => void;
  onNext: () => void;
}

const ClampedText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p className={`mb-2 mt-0 text-[15px] leading-[1.7] text-ca-ink/80 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="ca-mono mb-8 border-0 bg-transparent p-0 text-xs font-bold uppercase tracking-[0.2em] text-ca-ink/60 transition-colors hover:text-ca-ink"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="ca-hand mb-1 mt-0 text-2xl text-ca-ink">{children}</p>
);

const OutLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="ca-mono inline-flex items-center gap-2 border-b-2 border-ca-ink pb-0.5 text-xs font-bold uppercase tracking-[0.2em] text-ca-ink"
  >
    {label}
    <ArrowUpRight className="h-3.5 w-3.5" />
  </a>
);

const WorkModal = ({ project, index, onClose, onNext }: WorkModalProps) => {
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
  const t = cardTheme(index);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-ca-ink/60 px-5 py-12 backdrop-blur-sm"
    >
      <div
        key={project.title}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-[1120px] flex-col border-[3px] border-ca-ink bg-ca-surface text-ca-ink shadow-[8px_12px_0_var(--ca-ink)] md:flex-row"
        style={{ animation: "ca-fade-up .28s ease both" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border-2 border-ca-ink bg-ca-surface text-ca-ink transition-colors hover:bg-ca-ink hover:text-white"
        >
          <Close />
        </button>

        <div className="w-full shrink-0 p-5 md:w-[46%] md:p-7" style={{ backgroundColor: t.bg }}>
          <div className="relative h-48 sm:h-64 md:h-full">
            <TapeFlat />
            <div className="h-full overflow-hidden border-4" style={{ borderColor: t.accent }}>
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        </div>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-7 md:p-10">
          <p className="ca-mono mb-4 mt-0 inline-flex items-center gap-2.5 pr-14 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: t.bg }} />
            {project.meta}
          </p>
          <h3 className="mb-5 mt-0 pr-14 text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h3>
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`${TAG} bg-ca-ink text-sm text-white`}>
                {tag}
              </span>
            ))}
          </div>

          <Label>the story</Label>
          <ClampedText text={project.story} />

          <Label>how it was built</Label>
          <ClampedText text={project.built} />

          <div className="flex flex-wrap items-center justify-between gap-6 border-t-2 border-dashed border-ca-ink/20 pt-6">
            <div className="flex flex-wrap items-center gap-6">
              {project.liveUrl && <OutLink href={project.liveUrl} label="View live" />}
              {project.githubUrl && <OutLink href={project.githubUrl} label="Source" />}
              {!project.liveUrl && !project.githubUrl && (
                <span className="ca-mono text-xs font-bold uppercase tracking-[0.2em] text-ca-ink/60">
                  {project.live ? "Live in production" : "Source only"}
                </span>
              )}
            </div>
            <button
              onClick={onNext}
              className="group/cta ca-mono inline-flex items-center gap-3 border-2 border-ca-ink bg-ca-ink py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-ca-ink"
            >
              <span className="flex h-7 w-7 items-center justify-center bg-ca-yellow text-ca-ink transition-colors group-hover/cta:bg-ca-magenta">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              Next project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
