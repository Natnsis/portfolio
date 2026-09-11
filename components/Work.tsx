"use client";

import { useState } from "react";
import WorkModal from "./WorkModal";

export interface WorkProject {
  title: string;
  cat: "Web" | "Mobile" | "Full Stack";
  tags: string[];
  meta: string;
  live: boolean;
  summary: string;
  story: string;
  built: string;
}

const DATA: WorkProject[] = [
  {
    title: "E-Commerce Platform",
    cat: "Full Stack",
    tags: ["Next.js", "Stripe", "Prisma"],
    meta: "Personal · 2025 · Full-stack developer",
    live: true,
    summary:
      "A full-featured online store with product management, cart and payments.",
    story:
      "I wanted to understand the full e-commerce flow, from product listing to checkout to order fulfillment. This project was my deep dive into payment processing, inventory management, and building a smooth shopping experience. Every cart abandonment scenario taught me something about UX.",
    built:
      "Next.js app router with server components for fast product pages. Stripe integration with webhook handling for payment confirmation and refund management. Prisma ORM with PostgreSQL for inventory tracking. Image optimization with next/image and a custom CDN layer for product photos.",
  },
  {
    title: "Analytics Dashboard",
    cat: "Web",
    tags: ["React", "D3.js", "Node.js"],
    meta: "Freelance · 2024 · Frontend developer",
    live: true,
    summary: "Interactive data visualizations and reporting with custom charts.",
    story:
      "A client had months of user data sitting in spreadsheets with no way to extract insights. I built a dashboard that ingests CSV/API data and renders interactive charts, filters, drill-downs, exportable reports. They went from guessing to knowing in two weeks.",
    built:
      "React frontend with D3.js for custom chart types (line, bar, heatmap, sankey). Node.js backend processes and caches aggregations. A query builder UI lets non-technical users filter data without writing SQL. Charts export to PNG and SVG.",
  },
  {
    title: "Task Manager",
    cat: "Full Stack",
    tags: ["React", "TanStack", "Prisma"],
    meta: "Personal · 2024 · Solo developer",
    live: false,
    summary: "A Kanban board with drag-and-drop, real-time sync and collaboration.",
    story:
      "I built this to scratch my own organizational itch. Existing tools were either too heavy or too limited. I wanted something in between, fast, keyboard-friendly, with just enough structure to keep projects moving without getting in the way.",
    built:
      "React frontend with TanStack Query for optimistic updates, drag a card and it moves instantly. Node.js backend with WebSocket sync for real-time collaboration. Prisma + PostgreSQL for persistence. The board layout is stored as a JSON tree for flexible nesting.",
  },
  {
    title: "Asu Students App",
    cat: "Mobile",
    tags: ["React Native", "Expo"],
    meta: "Personal · 2025 · Mobile developer",
    live: true,
    summary: "A mobile app for university students to access campus resources.",
    story:
      "Campus information was scattered across noticeboards, Telegram groups and PDFs. This app pulls schedules, announcements and resources into one place students actually check, with offline caching for spotty campus wifi.",
    built:
      "React Native with Expo for fast iteration and OTA updates. Local caching layer so schedules and announcements work offline. Push notifications for schedule changes, and a lightweight admin panel for staff to post updates.",
  },
  {
    title: "AI Chat Application",
    cat: "Full Stack",
    tags: ["Next.js", "Python", "FastAPI"],
    meta: "Personal · 2025 · Full-stack developer",
    live: true,
    summary: "A real-time chat app powered by LLMs with context-aware threads.",
    story:
      "I wanted to go beyond a basic chat wrapper. This app maintains conversation context across sessions, lets you inject custom system prompts, and streams responses token-by-token. The eerie part is when it starts finishing your sentences.",
    built:
      "Next.js frontend with server-sent events for streaming responses. Python FastAPI backend orchestrates LLM calls. Conversation context is stored as a compressed token history in PostgreSQL. Custom rate limiting and prompt injection protection.",
  },
  {
    title: "Poster Boi",
    cat: "Web",
    tags: ["Python", "PostgreSQL", "Pillow"],
    meta: "Freelance · 2023 · Backend developer",
    live: true,
    summary: "A poster generation tool that automates repetitive design workflows.",
    story:
      "A local event organizer was spending hours each week manually creating posters. I built a system where they fill in a form and the poster is generated automatically with their branding, event details and QR codes. Templates are customizable without touching code.",
    built:
      "Python backend using Pillow for image processing and WeasyPrint for PDF generation. PostgreSQL stores templates as JSON configurations. The rendering pipeline supports dynamic text wrapping, QR generation and multi-format export.",
  },
  {
    title: "Weather App",
    cat: "Web",
    tags: ["React", "TanStack", "PWA"],
    meta: "Personal · 2024 · Frontend developer",
    live: true,
    summary: "A weather dashboard with forecasts, radar maps and historical data.",
    story:
      "I wanted a weather app that did not scream at me with ads or require an account. This one pulls data from multiple free APIs, shows the forecast, radar and historical trends, and gets out of your way. I actually use it daily.",
    built:
      "React frontend with TanStack Query for caching and background refetching. Open-Meteo API for forecasts, MapLibre for radar overlays. Geolocation with manual city search fallback. PWA support for offline access.",
  },
  {
    title: "Fimple NVIM Config",
    cat: "Web",
    tags: ["Lua", "Neovim"],
    meta: "Open Source · 2024 · Creator",
    live: true,
    summary: "A curated Neovim setup optimized for full-stack development.",
    story:
      "After years of copy-pasting config snippets I finally built a setup I trust, fast startup, sane defaults, LSP that just works for TypeScript, Python and Go. It is the editor I reach for every day.",
    built:
      "Lazy-loaded plugin management with lazy.nvim for sub-50ms startup. Preconfigured LSP, treesitter and DAP for the stacks I use. Keymaps documented in-editor so new users can discover them without reading the source.",
  },
  {
    title: "DevOps Toolkit",
    cat: "Full Stack",
    tags: ["Docker", "Python", "Bash"],
    meta: "Open Source · 2023 · Maintainer",
    live: true,
    summary: "Scripts and configs for CI/CD, containers and deployment.",
    story:
      "This started as a private gist of Docker Compose files and grew into a public toolkit, pipeline templates, monitoring stacks, deployment scripts. If I have to set it up more than once, it goes in the toolkit.",
    built:
      "Modular Docker Compose setups for common stacks. GitHub Actions templates with caching optimizations. Prometheus + Grafana dashboards pre-configured for Node and Python apps. Bash scripts for provisioning and SSL renewal.",
  },
];

const FILTERS = ["All", "Web", "Mobile", "Full Stack"] as const;

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
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const list =
    filter === "All" ? DATA : DATA.filter((p) => p.cat === filter);

  const active = activeIdx === null ? null : DATA[activeIdx];

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
              className="font-caveat font-semibold text-[19px] pb-1.5"
              style={{ color: "var(--ink-2)", transform: "rotate(-4deg)" }}
            >
              nine so far
            </span>
          </h2>
        </div>
        <div className="flex gap-1 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-sm font-semibold px-[19px] py-2.5 border-0 rounded-full cursor-pointer transition-colors duration-200"
              style={{
                background: f === filter ? "var(--dark)" : "transparent",
                color: f === filter ? "var(--bg)" : "var(--ink-2)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
        {list.map((p) => {
          const idx = DATA.indexOf(p);
          return (
            <button
              key={p.title}
              onClick={() => setActiveIdx(idx)}
              className="text-left flex flex-col rounded-[14px] border p-4.5 cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:border-[var(--wire-2)] hover:shadow-[0_16px_30px_-22px_rgba(0,0,0,.35)]"
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
                <span className="ml-auto text-[15px]" style={{ color: "var(--ink-2)" }}>
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <WorkModal
        project={active}
        onClose={() => setActiveIdx(null)}
        onNext={() =>
          setActiveIdx((i) => (i === null ? null : (i + 1) % DATA.length))
        }
      />
    </section>
  );
};

export default Work;
