"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SPOTLIGHT = [
  {
    title: "Snippet & Boilerplate Manager",
    desc: "A tool for managing code snippets and boilerplate templates across projects.",
  },
  {
    title: "Rate My Portfolio",
    desc: "A community platform for developers to share and get feedback on their portfolios.",
  },
  {
    title: "Asu Students App",
    desc: "A mobile app built for university students to access campus resources and updates.",
  },
  {
    title: "Fimple NVIM Config",
    desc: "A carefully curated Neovim configuration optimized for full-stack development.",
  },
];

const Hero = () => {
  const [spot, setSpot] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpot((s) => (s + 1) % SPOTLIGHT.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const current = SPOTLIGHT[spot];

  return (
    <section
      id="top"
      className="grid md:grid-cols-[1.12fr_1fr] gap-11 items-center pt-14 pb-8"
    >
      <div>
        <h1
          className="font-extrabold leading-[0.92] tracking-[-0.045em] mb-5 relative"
          style={{ fontSize: "clamp(46px,6.4vw,72px)" }}
        >
          <span className="block" style={{ color: "var(--ink)" }}>
            Natnael
          </span>
          <span className="flex items-end gap-3.5 flex-wrap">
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--ink)",
              }}
            >
              Sisay
            </span>
            <span
              className="font-caveat font-semibold tracking-normal text-[22px] leading-[1.25] flex flex-col pb-3 whitespace-nowrap"
              style={{ color: "var(--ink-2)", transform: "rotate(-4deg)" }}
            >
              <span>builds the</span>
              <span>whole thing</span>
            </span>
          </span>
        </h1>
        <p
          className="text-[17px] leading-[1.55] mb-8 max-w-[36ch]"
          style={{ color: "var(--ink-2)" }}
        >
          I read the docs, talk to my rubber duck, and ship things that
          actually work. Full-stack developer, solo or with a team — bugs
          included at no extra charge.
        </p>
        <div className="flex gap-3.5 flex-wrap">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2.5 text-[15px] font-semibold px-6 py-[15px] rounded-[10px] whitespace-nowrap transition-all duration-200 hover:-translate-y-px hover:opacity-90"
            style={{ background: "var(--dark)", color: "var(--bg)" }}
          >
            View My Projects <ArrowRightIcon size={16} />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center border text-[15px] font-semibold px-6 py-[15px] rounded-[10px] whitespace-nowrap transition-colors duration-200 hover:bg-[var(--card)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <div className="relative pt-6 pb-2.5">
        <div
          className="absolute left-3.5 top-1.5 right-[34px] h-[86%] rounded-2xl border"
          style={{
            background: "var(--card-2)",
            borderColor: "var(--line)",
            transform: "rotate(-4.5deg)",
          }}
        />
        <div
          className="absolute left-6 top-3.5 right-5.5 h-[86%] rounded-2xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--line)",
            transform: "rotate(-1.8deg)",
          }}
        />
        <div
          className="relative rounded-2xl border p-5 shadow-[0_24px_50px_-34px_rgba(0,0,0,.55)]"
          style={{ background: "var(--card)", borderColor: "var(--wire)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-semibold"
              style={{ color: "var(--ink-3)" }}
            >
              Currently building
            </span>
            <span className="flex gap-1.5">
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: "var(--wire-2)" }}
              />
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: "var(--wire-2)" }}
              />
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: "var(--wire-2)" }}
              />
            </span>
          </div>

          <div
            className="rounded-[11px] py-[15px] px-4 flex flex-col gap-[9px] mb-[18px]"
            style={{ background: "var(--darker)" }}
          >
            <span
              className="h-[5px] w-[78%] rounded-full"
              style={{ background: "rgba(255,255,255,.5)" }}
            />
            <span
              className="h-[5px] w-[52%] rounded-full ml-3.5"
              style={{ background: "rgba(255,255,255,.28)" }}
            />
            <span
              className="h-[5px] w-[66%] rounded-full ml-3.5"
              style={{ background: "rgba(255,255,255,.28)" }}
            />
            <span
              className="h-[5px] w-[40%] rounded-full ml-7"
              style={{ background: "rgba(255,255,255,.28)" }}
            />
            <span
              className="h-[5px] w-[58%] rounded-full"
              style={{ background: "rgba(255,255,255,.5)" }}
            />
          </div>

          <div className="min-h-[74px]">
            <h3
              className="text-[17px] font-bold tracking-[-0.02em] mb-[7px]"
              style={{ color: "var(--ink)" }}
            >
              {current.title}
            </h3>
            <p
              className="text-[13.5px] leading-[1.5]"
              style={{ color: "var(--ink-2)" }}
            >
              {current.desc}
            </p>
          </div>

          <div
            className="flex items-center justify-between mt-4 pt-3.5 border-t"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="flex gap-1.5">
              {SPOTLIGHT.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSpot(i)}
                  aria-label={`Show project ${i + 1}`}
                  className="w-[18px] h-1 border-0 p-0 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    background: i === spot ? "var(--ink)" : "var(--wire)",
                  }}
                />
              ))}
            </span>
            <Link
              href="/#work"
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold transition-colors hover:text-[var(--ink)]"
              style={{ color: "var(--ink-2)" }}
            >
              Explore the work <ArrowRightIcon size={12} />
            </Link>
          </div>
        </div>

        <div className="hidden md:block absolute left-[-86px] bottom-0.5 text-right pointer-events-none">
          <p
            className="font-caveat tracking-normal text-xl leading-[1.3]"
            style={{ color: "var(--ink-2)", transform: "rotate(-5deg)" }}
          >
            shipped,
            <br />
            not just
            <br />
            designed
          </p>
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            stroke="var(--ink-2)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="mt-0.5 ml-auto"
          >
            <path d="M2 6c10 20 30 28 54 26" />
            <path d="M46 24l10 8-11 5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
