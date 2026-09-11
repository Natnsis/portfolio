"use client";

import { DownloadSimpleIcon, UserIcon } from "@phosphor-icons/react";
import SectionLabel from "./SectionLabel";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Python",
  "Tailwind CSS",
  "Docker",
  "Neovim",
  "Figma",
];

const About = () => {
  return (
    <section className="section" id="about">
      <SectionLabel icon={UserIcon}>About</SectionLabel>
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
          I care about how things work — not just that they work.
        </h2>
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a full-stack developer who researches before building,
            communicates openly, and adapts quickly to whatever the project
            throws my way. Whether working solo or with a team, I bring ideas,
            honest feedback, and a drive to ship quality software.
          </p>
          <p>
            My foundation in computer science, combined with hands-on experience
            across the stack, lets me move from concept to production with
            confidence. I&apos;m constantly exploring new tools and approaches
            to do my best work.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Technologies I work with
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-xs rounded-full bg-accent text-accent-foreground px-3.5 py-1.5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-medium rounded-full border border-border px-5 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          <DownloadSimpleIcon size={16} />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default About;
