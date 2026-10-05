"use client";

import Link from "next/link";
import { useState } from "react";
import { FEATURED_PROJECTS, type Project, PROJECTS } from "@/lib/projects";
import { HandLabel, TAG, TapeFlat } from "./artsy/Bits";
import { cardTheme } from "./artsy/cardThemes";
import Letters from "./artsy/Letters";
import Reveal from "./artsy/Reveal";
import { ArrowUpRight, Sparkle } from "./icons";
import WorkModal from "./WorkModal";

// Folder tab sticking up from each card; later tabs step right so the
// stacked cards read like dividers in a binder.
const FolderTab = ({ i, bg, text }: { i: number; bg: string; text: string }) => (
  <div
    className="flex"
    style={{ marginLeft: i === 0 ? 0 : `min(calc(${i * 21}% - 72px), calc(100% - 340px))` }}
  >
    <span
      className={`ca-mono inline-flex items-center gap-2 py-3.5 pr-14 text-xs font-bold uppercase tracking-[0.2em] sm:gap-3.5 sm:py-6 sm:pr-28 sm:text-base ${text} ${
        i === 0
          ? "pl-5 [clip-path:polygon(0_0,calc(100%-44px)_0,100%_100%,0_100%)] sm:pl-9 sm:[clip-path:polygon(0_0,calc(100%-76px)_0,100%_100%,0_100%)]"
          : "pl-16 [clip-path:polygon(44px_0,calc(100%-44px)_0,100%_100%,0_100%)] sm:pl-[6.75rem] sm:[clip-path:polygon(76px_0,calc(100%-76px)_0,100%_100%,0_100%)]"
      }`}
      style={{ backgroundColor: bg }}
    >
      <Sparkle />
      Project {String(i + 1).padStart(2, "0")}
    </span>
  </div>
);

const ProjectCard = ({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) => {
  const t = cardTheme(i);
  return (
    <article className="lg:sticky lg:top-28">
      <FolderTab i={i} bg={t.bg} text={t.text} />
      <div
        className="grid grid-cols-1 gap-6 p-6 sm:p-10 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-14"
        style={{ backgroundColor: t.bg }}
      >
        <div className="flex flex-col">
          <span className={`ca-mono inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] ${t.text}`}>
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: t.accent }} />
            {p.meta}
          </span>
          <h2 className={`mt-6 text-5xl font-semibold tracking-tight sm:text-6xl xl:text-7xl ${t.text}`}>
            {p.title}
          </h2>
          <p className={`mt-5 max-w-lg text-lg leading-relaxed ${t.body}`}>{p.summary}</p>
          <button
            onClick={onOpen}
            className={`ca-mono mt-8 inline-flex items-center gap-2.5 self-start border-b-2 bg-transparent pb-1 text-sm font-bold uppercase tracking-[0.2em] ${t.text}`}
            style={{ borderColor: t.accent }}
          >
            View project
            <ArrowUpRight />
          </button>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-12">
            {p.tags.map((tag) => (
              <span key={tag} className={`${TAG} text-base ${t.tag}`} style={{ backgroundColor: t.accent }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:self-center">
          <div className="relative">
            <TapeFlat />
            <button
              onClick={onOpen}
              aria-label={`Open ${p.title}`}
              className="relative block aspect-square w-full overflow-hidden border-4 bg-ca-surface p-0 lg:aspect-auto lg:h-[calc(100vh-21rem)]"
              style={{ borderColor: t.accent }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const Work = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx === null ? null : FEATURED_PROJECTS[activeIdx];

  return (
    <section id="work" className="ca-grid scroll-mt-24 pb-24 pt-10 sm:pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 text-center sm:pb-24">
        <HandLabel underline="w-24">explore my work!</HandLabel>
        <span className="mt-6 block text-center">
          <Letters
            text="FEATURED WORKS"
            className="max-w-[9ch] text-center text-6xl leading-[0.92] tracking-tight text-ca-ink sm:text-8xl lg:text-9xl"
          />
        </span>
        <Reveal from="translateY(-28px) rotate(-5.4deg)" to="rotate(-3deg)" className="mt-8 max-w-md">
          <span className="ca-tape inline-block bg-ca-yellow-soft px-6 py-2.5 text-base font-medium leading-snug text-ca-ink shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)]">
            The latest things I&apos;ve shipped, from client sites to tools I built for myself.
          </span>
        </Reveal>
      </div>

      <div className="flex flex-col gap-16 px-4 sm:px-8 lg:gap-[12vh] lg:px-20">
        {FEATURED_PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} onOpen={() => setActiveIdx(i)} />
        ))}
      </div>

      <div className="mt-20 flex justify-center px-4">
        <Link
          href="/projects"
          className="group/cta ca-mono inline-flex items-center gap-3 border-2 border-ca-ink bg-ca-ink py-2.5 pl-2.5 pr-6 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-transparent hover:text-ca-ink"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-ca-yellow text-ca-ink transition-colors duration-200 group-hover/cta:bg-ca-magenta">
            <ArrowUpRight />
          </span>
          All {PROJECTS.length} projects
        </Link>
      </div>

      <WorkModal
        project={active}
        index={activeIdx ?? 0}
        onClose={() => setActiveIdx(null)}
        onNext={() => setActiveIdx((i) => (i === null ? null : (i + 1) % FEATURED_PROJECTS.length))}
      />
    </section>
  );
};

export default Work;
