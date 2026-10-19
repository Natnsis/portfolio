"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, SpeakerHigh, SpeakerSlash, X } from "@phosphor-icons/react";
import { useRef, useState, useSyncExternalStore } from "react";
import { playPageTurn, setSoundOn, soundOn, subscribeSound } from "@/lib/pageTurn";
import { imageAt, liveUrl, PROJECTS, projectMeta, type Project } from "@/lib/projects";

const PAGES = 4;
const FLIP_MS = 900;

const media = (q: string) => ({
  subscribe: (cb: () => void) => {
    const m = window.matchMedia(q);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  },
  get: () => window.matchMedia(q).matches,
});
const wide = media("(min-width: 768px)");
const calm = media("(prefers-reduced-motion: reduce)");

const Folio = ({ n }: { n: number }) => (
  <p className="mt-auto pt-6 text-center font-mono text-[11px] text-dk-ink/40">— {n + 1} —</p>
);

const Chapter = ({ title, text, n }: { title: string; text: string; n: number }) => (
  <>
    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dk-ink/45">Chapter {n - 1}</p>
    <h4 className="mt-2 font-serif text-3xl">{title}</h4>
    <p className="mt-4 font-read text-[16px] leading-[1.75] text-dk-ink/80">{text}</p>
    <Folio n={n} />
  </>
);

// One page of a project's book. 0: cover, 1: facts and links, 2: the story, 3: how it was built.
const Page = ({ p, index, n }: { p: Project; index: number; n: number }) => {
  const { kind, year, role } = projectMeta(p);
  const live = liveUrl(p);

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6 [scrollbar-width:thin] sm:p-9">
      {n === 0 && (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dk-ink/45">
            No. {String(index + 1).padStart(2, "0")} · {kind}
          </p>
          <h3 className="mt-2 pr-8 font-serif text-4xl leading-[1.05] sm:text-[2.6rem]">{p.title}</h3>
          <p className="mt-2 text-[14px] text-dk-ink/60">
            {year} · {role}
            {p.live && <span className="ml-2 rounded-full bg-dk-live/15 px-2 py-0.5 text-[12px] font-medium text-dk-live">Live</span>}
          </p>
          {p.image && (
            <div className="mt-6 overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageAt(p.image, 1000)} alt={p.title} className="aspect-video w-full object-contain" />
            </div>
          )}
          <Folio n={n} />
        </>
      )}

      {n === 1 && (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dk-ink/45">In short</p>
          <p className="mt-3 font-read text-[1.4rem] font-light leading-snug text-dk-ink/90">{p.summary}</p>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-dk-ink/10 pt-5 text-[14px]">
            <dt className="text-dk-ink/50">Type</dt>
            <dd>{kind}</dd>
            <dt className="text-dk-ink/50">Year</dt>
            <dd>{year}</dd>
            <dt className="text-dk-ink/50">Role</dt>
            <dd>{role}</dd>
            <dt className="text-dk-ink/50">Status</dt>
            <dd>{p.live ? "Live in production" : "Source only"}</dd>
          </dl>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="px-2 py-1 text-[12px] rounded-md bg-black/30 font-mono text-dk-cream/85 ring-1 ring-white/10">
                {t}
              </span>
            ))}
          </div>
          {(live || p.githubUrl) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] rounded-full bg-dk-amber/15 px-4 py-2 font-medium text-[#f2c38c] ring-1 ring-dk-amber/45 transition-colors hover:bg-dk-amber/25"
                >
                  Visit site <ArrowUpRight size={14} />
                </a>
              )}
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] rounded-full bg-dk-sky/10 px-4 py-2 font-medium text-dk-sky ring-1 ring-dk-sky/30 transition-colors hover:bg-dk-sky/20"
                >
                  <GithubLogo size={15} /> Source
                </a>
              )}
            </div>
          )}
          <Folio n={n} />
        </>
      )}

      {n === 2 && <Chapter title="The story" text={p.story} n={n} />}
      {n === 3 && <Chapter title="How it was built" text={p.built} n={n} />}
    </div>
  );
};

// Strips per leaf. Each one bends a little off the last, so the page curls like paper
// instead of swinging like a board.
const STRIPS = 5;

// One face of one strip: the whole page, shifted so only this strip's slice shows.
// Strips are `w + 1` px wide and start every `w` px, so each tucks 1px under the next
// with no gap and no lost text.
const Face = ({ content, left, width, back }: { content: React.ReactNode; left: number; width: number; back?: boolean }) => (
  <div
    className="absolute inset-0 overflow-hidden bg-dk-paper [backface-visibility:hidden]"
    style={back ? { transform: "rotateY(180deg)" } : undefined}
  >
    <div className="absolute inset-y-0" style={{ width, left }}>
      {content}
    </div>
  </div>
);

const Strip = ({ k, w, W, front, back }: { k: number; w: number; W: number; front: React.ReactNode; back: React.ReactNode }) => (
  <div
    className="absolute inset-y-0 [transform-style:preserve-3d]"
    style={{
      // The first strip hangs on the spine; each next one hangs on the previous strip.
      left: k === 0 ? 0 : w,
      width: w + 1,
      transformOrigin: "left center",
      transform: k === 0 ? "rotateY(var(--flip))" : "rotateY(var(--bend))",
    }}
  >
    <Face content={front} width={W} left={-k * w} />
    <Face content={back} width={W} left={-(STRIPS - 1 - k) * w + 1} back />
    {k < STRIPS - 1 && <Strip k={k + 1} w={w} W={W} front={front} back={back} />}
  </div>
);

// The turning leaf, hinged at its left edge. Backward turns replay a forward turn in reverse.
const Leaf = ({
  front,
  back,
  full,
  width,
  reverse,
  onDone,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  full: boolean;
  width: number;
  reverse: boolean;
  onDone: () => void;
}) => (
  <div
    // Only the leaf's own animation ends the turn, never one bubbling up from its pages.
    onAnimationEnd={(e) => e.target === e.currentTarget && onDone()}
    className="absolute inset-y-0 z-20 [transform-style:preserve-3d]"
    style={{
      left: full ? 0 : "50%",
      width: full ? "100%" : "50%",
      animation: `dk-turn ${FLIP_MS}ms cubic-bezier(.42,.08,.24,1) both ${reverse ? "reverse" : "normal"}`,
    }}
  >
    <Strip k={0} w={width / STRIPS} W={width} front={front} back={back} />
  </div>
);

// A project as a small book: two pages at a time on wide screens, one on phones.
const OpenBook = ({
  index,
  onPrev,
  onNext,
  onClose,
}: {
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onClose?: () => void;
}) => {
  const p = PROJECTS[index];
  const isWide = useSyncExternalStore(wide.subscribe, wide.get, () => true);
  const reduce = useSyncExternalStore(calm.subscribe, calm.get, () => false);
  const sound = useSyncExternalStore(subscribeSound, soundOn, () => true);

  const step = isWide ? 2 : 1;
  const [rawPage, setPage] = useState(0);
  // Snap to a spread start when the layout switches between one and two pages.
  const page = rawPage - (rawPage % step);
  const [flip, setFlip] = useState<{ to: number; dir: 1 | -1; width: number } | null>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  const atStart = page === 0;
  const atEnd = page + step >= PAGES;

  const turn = (dir: 1 | -1) => {
    if (flip) return;
    playPageTurn();
    const to = page + dir * step;
    if (reduce) setPage(to);
    else {
      // Leaf width in px, so strip slices line up exactly.
      const full = pagesRef.current?.offsetWidth ?? 0;
      setFlip({ to, dir, width: isWide ? full / 2 : full });
    }
  };
  const done = () => {
    if (!flip) return;
    setPage(flip.to);
    setFlip(null);
  };

  const P = (n: number) => (n >= 0 && n < PAGES ? <Page p={p} index={index} n={n} /> : null);

  // What sits underneath while a leaf turns, and what the leaf carries.
  let left = P(page);
  let right = isWide ? P(page + 1) : null;
  let leaf: React.ReactNode = null;
  if (flip) {
    if (isWide && flip.dir === 1) {
      right = P(page + 3);
      leaf = <Leaf full={false} width={flip.width} front={P(page + 1)} back={P(page + 2)} reverse={false} onDone={done} />;
    } else if (isWide) {
      left = P(page - 2);
      leaf = <Leaf full={false} width={flip.width} front={P(page - 1)} back={P(page)} reverse onDone={done} />;
    } else if (flip.dir === 1) {
      left = P(page + 1);
      leaf = <Leaf full width={flip.width} front={P(page)} back={null} reverse={false} onDone={done} />;
    } else {
      leaf = <Leaf full width={flip.width} front={P(page - 1)} back={null} reverse onDone={done} />;
    }
  }

  const range = isWide ? `${page + 1}–${page + 2}` : `${page + 1}`;
  const NAV = "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors disabled:opacity-40";

  return (
    <article
      aria-label={p.title}
      className="relative overflow-hidden rounded-md bg-dk-paper text-dk-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.06]"
      style={{ animation: "dk-open .3s ease-out both" }}
    >
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-dk-ink/5 hover:bg-dk-ink/10"
        >
          <X size={16} />
        </button>
      )}

      <div ref={pagesRef} className="relative h-[min(600px,72svh)] overflow-hidden [perspective:2200px] md:h-[540px]">
        <div className="grid h-full md:grid-cols-2">
          <div className="min-h-0">{left}</div>
          {isWide && <div className="min-h-0">{right}</div>}
        </div>
        {/* Spine crease */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-16 -translate-x-1/2 md:block"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.28) 52%, transparent)" }}
        />
        {flip && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[15]"
            style={{
              background: "radial-gradient(ellipse 60% 120% at 50% 50%, rgba(0,0,0,0.45), transparent 70%)",
              animation: `dk-cast ${FLIP_MS}ms ease-in-out both`,
            }}
          />
        )}
        {leaf}
      </div>

      <nav className="flex items-center justify-between gap-2 border-t border-dk-ink/10 bg-dk-wood px-3 py-2 text-[14px] font-medium sm:px-5">
        {atStart ? (
          <button onClick={onPrev} disabled={!!flip} className={`${NAV} text-dk-ink/60 hover:text-dk-ink`}>
            <ArrowLeft size={14} /> <span className="sm:hidden">Prev book</span>
            <span className="hidden sm:inline">Previous book</span>
          </button>
        ) : (
          <button onClick={() => turn(-1)} disabled={!!flip} className={`${NAV} text-dk-ink/70 hover:text-dk-ink`}>
            <ArrowLeft size={14} /> <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Previous page</span>
          </button>
        )}

        <div className="flex items-center gap-3 font-mono text-[12px] text-dk-ink/50">
          <span>
            {isWide ? "Pages" : "Page"} {range} of {PAGES}
          </span>
          <button
            onClick={() => setSoundOn(!sound)}
            aria-label={sound ? "Mute page sound" : "Turn page sound on"}
            title={sound ? "Mute page sound" : "Turn page sound on"}
            className="rounded p-1 text-dk-ink/50 hover:text-dk-ink"
          >
            {sound ? <SpeakerHigh size={15} /> : <SpeakerSlash size={15} />}
          </button>
        </div>

        {atEnd ? (
          <button onClick={onNext} disabled={!!flip} className={`${NAV} text-dk-sky hover:text-dk-ink`}>
            Next book <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => turn(1)}
            disabled={!!flip}
            className={`${NAV} rounded-full bg-dk-amber/15 px-3.5 text-[#f2c38c] ring-1 ring-dk-amber/45 hover:bg-dk-amber/25`}
          >
            Next page <ArrowRight size={14} />
          </button>
        )}
      </nav>
    </article>
  );
};

export default OpenBook;
