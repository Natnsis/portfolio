"use client";

import { useEffect } from "react";
import {
  XIcon,
  GlobeIcon,
  GithubLogoIcon,
  UsersIcon,
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  BookOpenIcon,
} from "@phosphor-icons/react";

export interface ProjectData {
  title: string;
  image: string;
  tags: string[];
  description: string;
  aspect?: string;
  isLive?: boolean;
  visitUrl?: string;
  sourceUrl?: string;
  type: string;
  year: string;
  role?: string;
  contributors?: string[];
  story: string;
  techHighlight: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-background border border-border hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <XIcon size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="border-r border-border max-md:border-r-0 max-md:border-b">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover max-md:aspect-video md:min-h-[400px]"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium leading-snug">
                {project.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseIcon size={14} />
                  {project.type}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon size={14} />
                  {project.year}
                </span>
                {project.role && (
                  <span className="inline-flex items-center gap-1.5">
                    <CodeIcon size={14} />
                    {project.role}
                  </span>
                )}
              </div>

              {project.contributors && project.contributors.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                  <UsersIcon size={14} />
                  <span>
                    with {project.contributors.join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-border" />

            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1.5">
                <BookOpenIcon size={13} />
                The story
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                {project.story}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 inline-flex items-center gap-1.5">
                <CodeIcon size={13} />
                How it was built
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.techHighlight}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-muted-foreground border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.isLive || project.sourceUrl) && (
              <div className="flex gap-4 pt-2">
                {project.isLive && project.visitUrl && (
                  <a
                    href={project.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:underline underline-offset-4 transition-all"
                  >
                    <GlobeIcon size={14} />
                    Visit Live
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest hover:underline underline-offset-4 transition-all"
                  >
                    <GithubLogoIcon size={14} />
                    View Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
