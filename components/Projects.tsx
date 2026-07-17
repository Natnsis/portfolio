"use client";

import Image from "next/image";
import { GlobeIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import ProjectModal, { type ProjectData } from "./ProjectModal";

const projects: ProjectData[] = [
  {
    title: "E-Commerce Platform",
    image: "/ecom-site.png",
    aspect: "4/3",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    description:
      "A full-featured online store with product management, cart, and payment integration.",
    type: "Personal",
    year: "2025",
    role: "Full-stack developer",
    story:
      "I wanted to understand the full e-commerce flow — from product listing to checkout to order fulfillment. This project was my deep dive into payment processing, inventory management, and building a smooth shopping experience. Every cart abandonment scenario taught me something about UX.",
    techHighlight:
      "Next.js app router with server components for fast product pages. Stripe integration with webhook handling for payment confirmation and refund management. Prisma ORM with PostgreSQL for inventory tracking. Image optimization with next/image and a custom CDN layer for product photos.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Analytics Dashboard",
    image: "/rmp(1).png",
    aspect: "3/4",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    description:
      "Interactive data visualizations and reporting dashboard with custom charts.",
    type: "Freelance",
    year: "2024",
    role: "Frontend developer",
    story:
      "A client had months of user data sitting in spreadsheets with no way to extract insights. I built a dashboard that ingests CSV/API data and renders interactive charts — filters, drill-downs, exportable reports. They went from guessing to knowing in two weeks.",
    techHighlight:
      "React frontend with D3.js for custom chart types (line, bar, heatmap, sankey). Node.js backend processes and caches aggregations. Implemented a query builder UI that lets non-technical users filter data without writing SQL. Charts export to PNG and SVG.",
    isLive: true,
    visitUrl: "#",
  },
  {
    title: "Task Manager",
    image: "/sbm.png",
    aspect: "16/9",
    tags: ["React", "TanStack Query", "Node.js", "Prisma"],
    description:
      "A Kanban board with drag-and-drop, real-time sync, and team collaboration.",
    type: "Personal",
    year: "2024",
    role: "Solo developer",
    story:
      "I built this to scratch my own organizational itch. Existing tools were either too heavy (Jira) or too limited (Trello's free tier). I wanted something in between — fast, keyboard-friendly, with just enough structure to keep projects moving without getting in the way.",
    techHighlight:
      "React frontend with TanStack Query for optimistic updates and cache management — drag a card and it moves instantly. Node.js backend with WebSocket sync for real-time collaboration. Prisma + PostgreSQL for persistence. The board layout is stored as a JSON tree for flexible nesting.",
    isLive: false,
    sourceUrl: "#",
  },
  {
    title: "Portfolio Site",
    image: "/another.webp",
    aspect: "1/1",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    description:
      "You are looking at it. Designed to feel open and honest.",
    type: "Personal",
    year: "2025",
    role: "Designer & developer",
    story:
      "Every developer needs a portfolio, but most look the same. I wanted mine to feel like a conversation — warm, minimal, and genuine. No animations for the sake of it, no dark patterns, no fluff. Just the work and the person behind it, presented clearly.",
    techHighlight:
      "Built with Next.js 16 and Tailwind CSS v4. Uses CSS columns for the Pinterest-style project layout. The modal system uses React portals with smooth CSS transitions. All theme tokens are defined as CSS custom properties for easy dark mode support. Font is Manrope for clean readability.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "AI Chat Application",
    image: "/project.webp",
    aspect: "4/5",
    tags: ["Next.js", "TypeScript", "Python", "FastAPI"],
    description:
      "A real-time chat app powered by LLMs with context-aware conversations.",
    type: "Personal",
    year: "2025",
    role: "Full-stack developer",
    story:
      "I wanted to go beyond a basic ChatGPT wrapper. This app maintains conversation context across sessions, lets you inject custom system prompts, and streams responses token-by-token. The eerie part is when the AI starts finishing your sentences — that is when you realize how far the tech has come.",
    techHighlight:
      "Next.js frontend with server-sent events for streaming token-by-token responses. Python FastAPI backend orchestrates LLM calls (OpenAI + local models via Ollama). Conversation context is stored as a compressed token history in PostgreSQL for efficient retrieval. Custom rate limiting and prompt injection protection.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Blog Platform",
    image: "/asu.jpg",
    aspect: "3/2",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    description:
      "A markdown-first blog engine with comments, tags, and RSS.",
    type: "Personal",
    year: "2024",
    role: "Solo developer",
    story:
      "I built this because I wanted to write more — I am still working on the writing part. The platform itself supports markdown with live preview, tagging, RSS feeds, and a comment system. It is ready whenever I am.",
    techHighlight:
      "Next.js with MDX for markdown processing with embedded React components. Comments use a nested threading model stored as adjacency lists in PostgreSQL. RSS and Atom feeds generated at build time. Full-text search via PostgreSQL tsvector. Image uploads with automatic WebP conversion.",
    isLive: false,
    sourceUrl: "#",
  },
  {
    title: "Weather App",
    image: "/tg.jpg",
    aspect: "1/1",
    tags: ["React", "TypeScript", "TanStack Query"],
    description:
      "A weather dashboard with forecasts, radar maps, and historical data.",
    type: "Personal",
    year: "2024",
    role: "Frontend developer",
    story:
      "I wanted a weather app that did not scream at me with ads or require an account. This one pulls data from multiple free APIs, shows you the forecast, radar, and historical trends, and gets out of your way. It turned out way more useful than I expected — I actually use it daily.",
    techHighlight:
      "React frontend with TanStack Query for caching and background refetching of weather data. Open-Meteo API for forecasts and historical data, with MapLibre for radar overlay visualization. Location detection via browser Geolocation API with manual city search fallback. PWA support for offline access.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "DevOps Toolkit",
    image: "/fimple.png",
    aspect: "16/9",
    tags: ["Python", "Docker", "Node.js", "Bash"],
    description:
      "A collection of scripts and configs for CI/CD, containers, and deployment.",
    type: "Open Source",
    year: "2023",
    role: "Creator & maintainer",
    story:
      "This started as a private gist of Docker Compose files and grew into a public toolkit. It includes CI/CD pipeline templates, monitoring stacks, deployment scripts, and infrastructure-as-code examples. Every config is battle-tested across my own projects. If I have to set it up more than once, it goes in the toolkit.",
    techHighlight:
      "Modular Docker Compose setups for common stacks (Next.js + Postgres, React + Node + Mongo, Python + FastAPI + Redis). GitHub Actions templates for CI/CD with caching optimizations. Monitoring with Prometheus + Grafana dashboards pre-configured for Node.js and Python apps. Bash scripts for server provisioning and SSL renewal.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
];

const Projects = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<ProjectData | null>(null);

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
      <div className="mb-3">
        <h1 className="text-3xl md:text-4xl font-medium">
          Things I have built
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-lg leading-relaxed">
          Some are shipping in production, some are experiments that got out of
          hand. Each one taught me something.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 pb-5 border-b border-border">
        {allTags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 border transition-all ${
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

      <div className="columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {filteredProjects.map((p, i) => (
          <div
            key={i}
            className="group break-inside-avoid mb-5 cursor-pointer"
            onClick={() => setSelected(p)}
          >
            <div
              className="relative border border-border overflow-hidden"
              style={{ aspectRatio: p.aspect ?? "4/3" }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-medium leading-snug">
                  {p.title}
                </h2>
                <div className="flex gap-2 shrink-0 mt-0.5">
                  {p.isLive && p.visitUrl && (
                    <a
                      href={p.visitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GlobeIcon size={14} />
                    </a>
                  )}
                  {p.sourceUrl && (
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubLogoIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                {p.description}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                {p.type} &middot; {p.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-10">
          Nothing here matches those filters.
        </p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
