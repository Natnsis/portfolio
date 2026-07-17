"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import ProjectModal, { type ProjectData } from "./ProjectModal";

const projects: ProjectData[] = [
  {
    title: "Snippet And Boilerplate Manager",
    image: "/sbm.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    description:
      "A tool for managing code snippets and boilerplate templates across projects.",
    type: "Personal",
    year: "2025",
    role: "Solo developer",
    story:
      "I was tired of rewriting the same boilerplate every time I started a new project. What began as a personal collection of templates grew into a full snippet manager with search, tagging, and one-click scaffolding. The goal was simple: stop repeating myself and start shipping faster.",
    techHighlight:
      "Built with Next.js for the frontend and API routes, PostgreSQL for storing snippets with full-text search via tsvector, and Docker for portable development. The scaffolding engine uses a custom templating system with Handlebars-style variables.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Rate My Portfolio",
    image: "/rmp(1).png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    description:
      "A community platform for developers to share and get portfolio feedback.",
    type: "Personal",
    year: "2024",
    role: "Full-stack developer",
    contributors: ["Yonas A."],
    story:
      "After spending hours reviewing portfolios on Reddit, I realized there was no dedicated space for structured feedback. Rate My Portfolio lets developers upload their work, tag specific areas they want critiqued, and receive anonymous ratings with comments. It turned into a small community of its own.",
    techHighlight:
      "React frontend with Tailwind for rapid UI iteration, Node.js/Express backend, MongoDB for flexible review data. Implemented a reputation system to prevent spam and encourage quality feedback. Images are optimized and cached via a CDN layer.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Asu Students App",
    image: "/asu.jpg",
    tags: ["React Native", "Firebase", "Expo"],
    description:
      "A mobile app for university students to access campus resources.",
    type: "Academic",
    year: "2024",
    role: "Mobile developer",
    contributors: ["Mekdes W.", "Biruk T."],
    story:
      "A group project that actually shipped. We noticed students struggled to find updated campus information — event schedules, cafeteria menus, library hours — all scattered across different platforms. We built a single app that aggregates everything and sends push notifications for important updates.",
    techHighlight:
      "React Native with Expo for cross-platform deployment, Firebase for real-time data sync and authentication. Implemented a role-based content management system so university staff can post updates without technical help. Push notifications via Firebase Cloud Messaging.",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Fimple NVIM Config",
    image: "/fimple.png",
    tags: ["Lua", "Neovim", "LSP"],
    description:
      "A carefully curated Neovim configuration optimized for full-stack development.",
    type: "Open Source",
    year: "2024",
    role: "Creator & maintainer",
    story:
      "I spent years jumping between editors and never felt at home. After discovering Neovim's Lua API, I decided to build my perfect config from scratch — not a distro, just a clean, intentional setup. Every plugin earns its place, and the config is designed to be readable, not mystical.",
    techHighlight:
      "Written entirely in Lua using Neovim 0.10+ native LSP for language support. Uses lazy.nvim for plugin management with lazy-loading for fast startup (~50ms). Custom keybindings follow mnemonic patterns — the config is documented inline so anyone can fork and adapt it.",
    contributors: ["Community (12+ contributors)"],
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Poster Boi",
    image: "/tg.jpg",
    tags: ["Python", "PostgreSQL", "Pillow"],
    description:
      "A poster generation and management tool that automates design workflows.",
    type: "Freelance",
    year: "2023",
    role: "Backend developer",
    story:
      "A local event organizer was spending hours each week manually creating posters in Photoshop. I built a system where they fill in a form, and the poster is generated automatically with their branding, event details, and QR codes. Templates are customizable without touching code.",
    techHighlight:
      "Python backend using Pillow for image processing and WeasyPrint for PDF generation. PostgreSQL stores templates as JSON configurations. The rendering pipeline supports dynamic text wrapping, QR code generation, and multi-format export (PNG, PDF, SVG).",
    isLive: true,
    visitUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Ecommerce Web App",
    image: "/ecom-site.png",
    tags: ["Next.js", "Stripe", "Prisma", "TypeScript"],
    description:
      "A full-featured online store with product management and payment integration.",
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
];

const ProjectsCut = () => {
  const [selected, setSelected] = useState<ProjectData | null>(null);

  return (
    <section className="section" id="work">
      <p className="section-label">Recent projects</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 auto-rows-[220px]">
        {projects.map((p, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden"
            style={
              index === 0
                ? { gridColumn: "1 / 3", gridRow: "1 / 3" }
                : index === 5
                  ? { gridColumn: "2 / 4", gridRow: "3 / 5" }
                  : undefined
            }
            onClick={() => setSelected(p)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url("${p.image}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-white/80 border border-white/20 px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-medium text-white">{p.title}</h3>
                <p className="text-xs text-white/60 mt-0.5">
                  {p.type} &middot; {p.year}
                </p>
              </div>
              <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-sm font-medium text-white">{p.title}</h3>
                <p className="text-xs text-white/60 mt-0.5">
                  {p.type} &middot; {p.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all projects
          <ArrowRightIcon size={15} />
        </Link>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default ProjectsCut;
