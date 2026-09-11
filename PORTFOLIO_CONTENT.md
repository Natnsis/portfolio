# Portfolio Content

All copy currently used across the site (natnael.dev), organized by page/section. Source of truth for each string is the component listed in the heading.

---

## Site metadata (`app/layout.tsx`)

- **Title:** Natnael Sisay — Full-Stack Developer
- **Description:** Full-stack developer who researches before building, communicates openly, and ships quality software.

---

## Header (`components/Header.tsx`)

- **Logo:** N
- **Status badge:** Available Now
- **Nav:** Work · About · Credentials · Contact
- **CTA button:** Say Hello

---

## Home page (`app/page.tsx`)

### Hero (`components/Hero.tsx`)

- **Label:** I'm
- **Name:** Natnael Sisay
- **Tagline:** Full-stack developer who researches before building, communicates openly, and ships quality software — solo or with a team.
- **Primary button:** See my work
- **Secondary link:** View credentials

**Featured project showcase** (auto-rotating carousel, label "Featured project", link "Explore the work"):

| # | Title | Description |
|---|-------|-------------|
| 1 | Snippet & Boilerplate Manager | A tool for managing code snippets and boilerplate templates across projects. |
| 2 | Rate My Portfolio | A community platform for developers to share and get feedback on their portfolios. |
| 3 | Asu Students App | A mobile app built for university students to access campus resources and updates. |
| 4 | Fimple NVIM Config | A carefully curated Neovim configuration optimized for full-stack development. |

### Recent projects (`components/ProjectsCut.tsx`)

Section label: **Recent projects**. Bento grid of 6 projects (subset of the full project list below): Snippet And Boilerplate Manager, Rate My Portfolio, Asu Students App, Fimple NVIM Config, Poster Boi, Ecommerce Web App.

Link: **View all projects**

### About (`components/About.tsx`)

- **Section label:** About
- **Heading:** I care about how things work — not just that they work.
- **Paragraph 1:** I'm a full-stack developer who researches before building, communicates openly, and adapts quickly to whatever the project throws my way. Whether working solo or with a team, I bring ideas, honest feedback, and a drive to ship quality software.
- **Paragraph 2:** My foundation in computer science, combined with hands-on experience across the stack, lets me move from concept to production with confidence. I'm constantly exploring new tools and approaches to do my best work.
- **Skills label:** Technologies I work with
- **Skills:** React, Next.js, TypeScript, Node.js, PostgreSQL, Python, Tailwind CSS, Docker, Neovim, Figma
- **Button:** Download Resume (links to `/resume.pdf`)

### Contact (`components/Contact.tsx`)

- **Section label:** Contact
- **Heading:** Let's build something together.
- **Paragraph:** Whether you have a project in mind or just want to say hi, I'm always open to a conversation.
- **Links:**
  - Email: nsisay49@gmail.com
  - GitHub
  - Telegram
  - X / Twitter

### Footer (`components/Footer.tsx`)

- © {current year} Natnael Sisay
- nsisay49@gmail.com

---

## Projects page (`app/projects/page.tsx` → `components/Projects.tsx`)

- **Section label:** Projects
- **Heading:** Things I have built
- **Subheading:** Some are shipping in production, some are experiments that got out of hand. Each one taught me something.
- Filterable by tag (all tags used across projects).

### Full project list

#### 1. E-Commerce Platform
- **Tags:** Next.js, TypeScript, Stripe, Prisma
- **Type / Year / Role:** Personal · 2025 · Full-stack developer
- **Summary:** A full-featured online store with product management, cart, and payment integration.
- **Story:** I wanted to understand the full e-commerce flow — from product listing to checkout to order fulfillment. This project was my deep dive into payment processing, inventory management, and building a smooth shopping experience. Every cart abandonment scenario taught me something about UX.
- **How it was built:** Next.js app router with server components for fast product pages. Stripe integration with webhook handling for payment confirmation and refund management. Prisma ORM with PostgreSQL for inventory tracking. Image optimization with next/image and a custom CDN layer for product photos.
- **Live:** yes

#### 2. Analytics Dashboard
- **Tags:** React, TypeScript, D3.js, Node.js
- **Type / Year / Role:** Freelance · 2024 · Frontend developer
- **Summary:** Interactive data visualizations and reporting dashboard with custom charts.
- **Story:** A client had months of user data sitting in spreadsheets with no way to extract insights. I built a dashboard that ingests CSV/API data and renders interactive charts — filters, drill-downs, exportable reports. They went from guessing to knowing in two weeks.
- **How it was built:** React frontend with D3.js for custom chart types (line, bar, heatmap, sankey). Node.js backend processes and caches aggregations. Implemented a query builder UI that lets non-technical users filter data without writing SQL. Charts export to PNG and SVG.
- **Live:** yes

#### 3. Task Manager
- **Tags:** React, TanStack Query, Node.js, Prisma
- **Type / Year / Role:** Personal · 2024 · Solo developer
- **Summary:** A Kanban board with drag-and-drop, real-time sync, and team collaboration.
- **Story:** I built this to scratch my own organizational itch. Existing tools were either too heavy (Jira) or too limited (Trello's free tier). I wanted something in between — fast, keyboard-friendly, with just enough structure to keep projects moving without getting in the way.
- **How it was built:** React frontend with TanStack Query for optimistic updates and cache management — drag a card and it moves instantly. Node.js backend with WebSocket sync for real-time collaboration. Prisma + PostgreSQL for persistence. The board layout is stored as a JSON tree for flexible nesting.
- **Live:** no (source only)

#### 4. Portfolio Site
- **Tags:** Next.js, TypeScript, Tailwind CSS
- **Type / Year / Role:** Personal · 2025 · Designer & developer
- **Summary:** You are looking at it. Designed to feel open and honest.
- **Story:** Every developer needs a portfolio, but most look the same. I wanted mine to feel like a conversation — warm, minimal, and genuine. No animations for the sake of it, no dark patterns, no fluff. Just the work and the person behind it, presented clearly.
- **How it was built:** Built with Next.js 16 and Tailwind CSS v4. Uses CSS columns for the Pinterest-style project layout. The modal system uses React portals with smooth CSS transitions. All theme tokens are defined as CSS custom properties for easy dark mode support. Font is Manrope for clean readability.
- **Live:** yes

#### 5. AI Chat Application
- **Tags:** Next.js, TypeScript, Python, FastAPI
- **Type / Year / Role:** Personal · 2025 · Full-stack developer
- **Summary:** A real-time chat app powered by LLMs with context-aware conversations.
- **Story:** I wanted to go beyond a basic ChatGPT wrapper. This app maintains conversation context across sessions, lets you inject custom system prompts, and streams responses token-by-token. The eerie part is when the AI starts finishing your sentences — that is when you realize how far the tech has come.
- **How it was built:** Next.js frontend with server-sent events for streaming token-by-token responses. Python FastAPI backend orchestrates LLM calls (OpenAI + local models via Ollama). Conversation context is stored as a compressed token history in PostgreSQL for efficient retrieval. Custom rate limiting and prompt injection protection.
- **Live:** yes

#### 6. Blog Platform
- **Tags:** Next.js, TypeScript, PostgreSQL, Prisma
- **Type / Year / Role:** Personal · 2024 · Solo developer
- **Summary:** A markdown-first blog engine with comments, tags, and RSS.
- **Story:** I built this because I wanted to write more — I am still working on the writing part. The platform itself supports markdown with live preview, tagging, RSS feeds, and a comment system. It is ready whenever I am.
- **How it was built:** Next.js with MDX for markdown processing with embedded React components. Comments use a nested threading model stored as adjacency lists in PostgreSQL. RSS and Atom feeds generated at build time. Full-text search via PostgreSQL tsvector. Image uploads with automatic WebP conversion.
- **Live:** no (source only)

#### 7. Weather App
- **Tags:** React, TypeScript, TanStack Query
- **Type / Year / Role:** Personal · 2024 · Frontend developer
- **Summary:** A weather dashboard with forecasts, radar maps, and historical data.
- **Story:** I wanted a weather app that did not scream at me with ads or require an account. This one pulls data from multiple free APIs, shows you the forecast, radar, and historical trends, and gets out of your way. It turned out way more useful than I expected — I actually use it daily.
- **How it was built:** React frontend with TanStack Query for caching and background refetching of weather data. Open-Meteo API for forecasts and historical data, with MapLibre for radar overlay visualization. Location detection via browser Geolocation API with manual city search fallback. PWA support for offline access.
- **Live:** yes

#### 8. DevOps Toolkit
- **Tags:** Python, Docker, Node.js, Bash
- **Type / Year / Role:** Open Source · 2023 · Creator & maintainer
- **Summary:** A collection of scripts and configs for CI/CD, containers, and deployment.
- **Story:** This started as a private gist of Docker Compose files and grew into a public toolkit. It includes CI/CD pipeline templates, monitoring stacks, deployment scripts, and infrastructure-as-code examples. Every config is battle-tested across my own projects. If I have to set it up more than once, it goes in the toolkit.
- **How it was built:** Modular Docker Compose setups for common stacks (Next.js + Postgres, React + Node + Mongo, Python + FastAPI + Redis). GitHub Actions templates for CI/CD with caching optimizations. Monitoring with Prometheus + Grafana dashboards pre-configured for Node.js and Python apps. Bash scripts for server provisioning and SSL renewal.
- **Live:** yes

> Note: `components/ProjectsCut.tsx` (the homepage "Recent projects" grid) uses a slightly different subset/naming for some of the same and additional projects — Snippet And Boilerplate Manager, Rate My Portfolio, Asu Students App, Fimple NVIM Config, Poster Boi, and Ecommerce Web App — each with its own story/tech-highlight copy. See that file if you need those exact strings; they largely overlap with the entries above plus:

#### Poster Boi (homepage only)
- **Tags:** Python, PostgreSQL, Pillow
- **Type / Year / Role:** Freelance · 2023 · Backend developer
- **Summary:** A poster generation and management tool that automates design workflows.
- **Story:** A local event organizer was spending hours each week manually creating posters in Photoshop. I built a system where they fill in a form, and the poster is generated automatically with their branding, event details, and QR codes. Templates are customizable without touching code.
- **How it was built:** Python backend using Pillow for image processing and WeasyPrint for PDF generation. PostgreSQL stores templates as JSON configurations. The rendering pipeline supports dynamic text wrapping, QR code generation, and multi-format export (PNG, PDF, SVG).

---

## Credentials page (`app/credentials/page.tsx` → `components/Credentials.tsx`)

- **Section label:** Credentials
- **Heading:** Education & Documents
- **Subheading:** A collection of certificates, degrees, and professional documents. Each one represents a milestone I have worked toward.

| # | Title | Issuer | Date | Description |
|---|-------|--------|------|--------------|
| 01 | B.Sc. in Computer Science | Addis Ababa University | 2021 – 2025 | Four-year degree with a focus on software engineering, algorithms, data structures, and distributed systems. Graduated with a strong foundation in both theory and practical application. |
| 02 | Full Stack Web Development | FreeCodeCamp | 2024 | Comprehensive certification covering modern web development — React, Node.js, databases, and API design. Built multiple projects as part of the curriculum. |
| 03 | Professional Resume | Self | 2025 | Detailed resume outlining professional experience, technical skills, and a portfolio of shipped projects. Available in PDF format. |
| 04 | AWS Cloud Practitioner | Amazon Web Services | 2024 | Foundational certification validating knowledge of AWS cloud architecture, core services, pricing models, and best practices for building on the cloud. |

---

## Contact / social details (used in `Contact.tsx` and `Footer.tsx`)

- **Email:** nsisay49@gmail.com
- **GitHub, Telegram, X/Twitter:** links currently placeholders (`#`) — need real URLs.
