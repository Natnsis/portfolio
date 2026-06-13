"use client";

import { GlobeIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
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
    <div className="py-10 md:py-20 px-4 md:px-10">
      <h1 className="text-4xl md:text-6xl text-center mb-12">
        Explore my work
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 text-sm border rounded-full transition-colors ${
                isActive
                  ? "bg-black text-[#F7F4EB] border-black"
                  : "bg-transparent text-black border-black hover:bg-black/5"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p, i) => (
          <div key={i} className="border border-black p-5 flex flex-col gap-4">
            <div className="w-full h-48 bg-black/5 border border-black overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{p.title}</h2>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-black px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-auto">
              {p.isLive && p.visitUrl && (
                <a href={p.visitUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black gap-2"
                  >
                    <GlobeIcon size={16} /> Visit
                  </Button>
                </a>
              )}
              {p.sourceUrl && (
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black gap-2"
                  >
                    <GithubLogoIcon size={16} /> Source
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-lg mt-10 opacity-60">
          No projects match your filters.
        </p>
      )}
    </div>
  );
};

export default Projects;
