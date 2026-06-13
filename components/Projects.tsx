"use client";

import { GlobeIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface Project {
  title: string;
  image: string;
  tags: string[];
  isLive?: boolean;
  visitUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    image: "/project.webp",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "AI Chat Application",
    image: "/project.webp",
    tags: ["Next.js", "TypeScript", "Python", "FastAPI"],
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Task Manager",
    image: "/project.webp",
    tags: ["React", "TanStack Query", "Node.js", "Prisma"],
    isLive: false,
    sourceUrl: "#",
  },
  {
    title: "Portfolio Site",
    image: "/project.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    image: "/project.webp",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    isLive: true,
    visitUrl: "#",
  },
  {
    title: "Blog Platform",
    image: "/project.webp",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    isLive: false,
    sourceUrl: "#",
  },
  {
    title: "Weather App",
    image: "/project.webp",
    tags: ["React", "TypeScript", "TanStack Query"],
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "DevOps Toolkit",
    image: "/project.webp",
    tags: ["Python", "Docker", "Node.js"],
    isLive: true,
    visitUrl: "#",
  },
];

const Projects = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort();

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredProjects =
    activeTags.length === 0
      ? projects
      : projects.filter((p) => activeTags.every((tag) => p.tags.includes(tag)));

  return (
    <section className="section" id="projects-page">
      <p className="section-label">Projects</p>
      <h1 className="text-4xl md:text-5xl font-medium mb-8">Explore my work</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {allTags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {filteredProjects.map((p, i) => (
          <div key={i} className="group flex flex-col gap-3">
            <div className="aspect-video border border-border overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">{p.title}</h2>
              <div className="flex gap-3">
                {p.isLive && p.visitUrl && (
                  <a
                    href={p.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-muted-foreground hover:underline underline-offset-4 decoration-1 transition-all inline-flex items-center gap-1"
                  >
                    <GlobeIcon size={12} />
                    Visit
                  </a>
                )}
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest text-muted-foreground hover:underline underline-offset-4 decoration-1 transition-all inline-flex items-center gap-1"
                  >
                    <GithubLogoIcon size={12} />
                    Source
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-10">
          No projects match your filters.
        </p>
      )}
    </section>
  );
};

export default Projects;
