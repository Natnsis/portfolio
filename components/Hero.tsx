"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_URL } from "@/lib/site";
import { ArrowDisc, ArrowDown, ArrowRight, ChevronUp } from "./icons";
import SiteNav from "./SiteNav";

const NAVY = "#1D3045";
const EASE = "cubic-bezier(.16,1,.3,1)";

// Staggered reveal for each line of a hero slide.
const reveal = (on: boolean, delay: number) => ({
  opacity: on ? 1 : 0,
  transform: on ? "translateY(0)" : "translateY(24px)",
  transition: `opacity .8s ${EASE} ${delay}ms, transform .8s ${EASE} ${delay}ms`,
});

// Slide opacity as a function of scroll progress through the 500vh track.
const slideOpacity = (p: number) => [
  p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.08),
  p < 0.32 ? 0 : p < 0.4 ? (p - 0.32) / 0.08 : p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.08),
  p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1,
];

const Hero = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState([true, false, false]);
  const [light, setLight] = useState(false);

  useEffect(() => {
    let cur = 0;
    let last = performance.now();
    let raf = 0;
    let blobUrl: string | undefined;
    let prev = { v: [true, false, false], light: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Load the whole video into memory so scrubbing seeks instantly instead of
    // waiting on range requests.
    fetch(HERO_VIDEO_URL)
      .then((r) => (r.ok ? r.blob() : Promise.reject()))
      .then((b) => {
        const v = videoRef.current;
        if (!v) return;
        const t = v.currentTime;
        blobUrl = URL.createObjectURL(b);
        v.src = blobUrl;
        v.addEventListener("loadedmetadata", () => (v.currentTime = t), { once: true });
      })
      .catch(() => {});

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const el = trackRef.current;
      const v = videoRef.current;
      if (el) {
        const span = el.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, window.scrollY / (span || 1)));
        const ops = slideOpacity(p);
        [s1Ref, s2Ref, s3Ref].forEach((r, i) => {
          if (r.current) r.current.style.opacity = String(ops[i]);
        });

        const next = { v: ops.map((o) => o > 0.3), light: p > 0.55 };
        if (next.v.some((on, i) => on !== prev.v[i])) setVisible(next.v);
        if (next.light !== prev.light) setLight(next.light);
        prev = next;

        if (v && v.duration > 0) {
          const target = p * v.duration;
          if (reduce) cur = target;
          else {
            cur += (target - cur) * (1 - Math.exp(-dt * 8));
            if (Math.abs(target - cur) < 0.002) cur = target;
          }
          if (!v.seeking && Math.abs(v.currentTime - cur) > 0.01) v.currentTime = cur;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  const [v1, v2, v3] = visible;

  return (
    <div id="top" ref={trackRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-haze">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0">
          <SiteNav
            color={light ? "#fff" : NAVY}
            className="pointer-events-auto absolute inset-x-0 top-0"
          />

          {/* Slide 1 */}
          <section
            ref={s1Ref}
            className="absolute inset-0 flex flex-col justify-center gutter-x"
            style={{ transition: "opacity .1s ease-out" }}
          >
            <h1
              className="m-0 max-w-[16ch] font-light uppercase leading-[1.2] text-navy"
              style={{ fontSize: "clamp(2rem,5vw,5rem)", ...reveal(v1, 0) }}
            >
              I read the docs and ship things that work
            </h1>
            <p
              className="mt-6 text-sm uppercase tracking-[.3em] text-navy/55"
              style={reveal(v1, 150)}
            >
              Natnael Sisay — Full-stack developer
            </p>
            <a
              href="#work"
              aria-label="View work"
              className="pointer-events-auto absolute bottom-12 flex size-12 items-center justify-center rounded-full border border-navy/50 text-navy"
              style={{ right: "clamp(24px,4vw,48px)", ...reveal(v1, 300) }}
            >
              <ArrowRight />
            </a>
          </section>

          {/* Slide 2 */}
          <section
            ref={s2Ref}
            className="absolute inset-0 flex items-center justify-center opacity-0"
            style={{ padding: "0 clamp(24px,4vw,32px)", transition: "opacity .1s ease-out" }}
          >
            <h2
              className="m-0 max-w-[900px] text-center font-extralight uppercase leading-[1.3] tracking-[.025em] text-navy"
              style={{ fontSize: "clamp(1.5rem,4.5vw,4.5rem)", ...reveal(v2, 0) }}
            >
              I care about how things work{" "}
              <span className="text-navy/80">and why they work</span>{" "}
              <span className="text-navy/50">that way</span>
            </h2>
            <div
              className="pointer-events-auto absolute bottom-16 flex flex-col items-center gap-4"
              style={{ right: "clamp(24px,4vw,48px)" }}
            >
              <a
                href="#work"
                aria-label="Down"
                className="flex size-12 items-center justify-center rounded-full border border-navy/40 text-navy"
                style={reveal(v2, 200)}
              >
                <ArrowDown />
              </a>
              <div className="mt-4 flex flex-col items-center gap-2" style={reveal(v2, 350)}>
                <span className="size-1.5 rounded-full bg-navy/40" />
                <span className="size-2 rounded-full bg-navy" />
                <span className="size-1.5 rounded-full bg-navy/40" />
              </div>
              <a
                href="#top"
                aria-label="Up"
                className="mt-2 flex size-10 items-center justify-center rounded-full border border-navy/30 text-navy/80"
                style={reveal(v2, 500)}
              >
                <ChevronUp size={16} />
              </a>
            </div>
          </section>

          {/* Slide 3 */}
          <section
            ref={s3Ref}
            className="absolute inset-0 flex items-center justify-end opacity-0 gutter-x"
            style={{ transition: "opacity .1s ease-out" }}
          >
            <div className="max-w-[672px]">
              <p className="mb-4 text-lg tracking-[.025em] text-white/60" style={reveal(v3, 0)}>
                Currently shipping
              </p>
              <h2
                className="mb-8 display text-white"
                style={{ fontSize: "clamp(2rem,4vw,4rem)", ...reveal(v3, 150) }}
              >
                Snippet &amp;
                <br />
                Boilerplate Manager
              </h2>
              <a
                href="#work"
                className="group pointer-events-auto inline-flex items-center gap-4"
                style={reveal(v3, 300)}
              >
                <span className="text-sm uppercase tracking-[.3em] text-white/80">
                  Explore the work
                </span>
                <ArrowDisc />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;
