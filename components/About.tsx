"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Python",
  "Tailwind",
  "Docker",
  "Neovim",
  "Figma",
];

const About = () => {
  return (
    <section
      id="about"
      className="py-[88px] mt-16 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <p
        className="text-[11px] font-semibold tracking-[.02em] mb-2.5"
        style={{ color: "var(--ink-3)" }}
      >
        About
      </p>
      <div className="grid md:grid-cols-[1.15fr_1fr] gap-14 items-start">
        <div>
          <h2
            className="font-extrabold leading-[1.18] tracking-[-0.04em] mb-5.5"
            style={{ fontSize: "clamp(26px,3.4vw,34px)", color: "var(--ink)" }}
          >
            I care about how things work,{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.3px var(--ink)",
              }}
            >
              and why they work that way.
            </span>
          </h2>
          <p
            className="text-[15px] leading-[1.68] mb-4"
            style={{ color: "var(--ink-2)" }}
          >
            I&apos;m a full-stack developer who researches before building,
            communicates openly, and adapts quickly to whatever the project
            throws my way. Whether working solo or with a team, I bring
            ideas, honest feedback, and a drive to ship quality software.
          </p>
          <p
            className="text-[15px] leading-[1.68] mb-7"
            style={{ color: "var(--ink-2)" }}
          >
            My foundation in computer science, combined with hands-on
            experience across the stack, lets me move from concept to
            production with confidence.
          </p>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2.5 border text-sm font-semibold px-5 py-3.5 rounded-[10px] whitespace-nowrap transition-colors hover:bg-[var(--card)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
          >
            Download Resume <DownloadSimpleIcon size={15} />
          </a>
        </div>

        <div
          className="rounded-[14px] border p-5.5"
          style={{ background: "var(--card)", borderColor: "var(--line)" }}
        >
          <p
            className="text-[11px] font-semibold tracking-[.02em] mb-4"
            style={{ color: "var(--ink-3)" }}
          >
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold rounded-full px-3 py-1.5"
                style={{ color: "var(--ink-2)", background: "var(--card-2)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
