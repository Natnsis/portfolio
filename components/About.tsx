"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import Image from "next/image";

const skills = [
  {
    title: "Fast Learner",
    description:
      "I pick up new technologies and concepts quickly, adapting to any stack or tool with ease.",
  },
  {
    title: "Continuous Growth",
    description:
      "Always leveling up — reading, building, and pushing my skills forward every day.",
  },
  {
    title: "Adaptable",
    description:
      "Whether it's a new framework, role, or problem domain, I adjust fast and deliver.",
  },
  {
    title: "Solo & Team Player",
    description:
      "I thrive working independently or collaborating closely with a team to ship great products.",
  },
  {
    title: "Researches Before Building",
    description:
      "I dig deep into how things work first — no blind vibecoding. Understanding before applying is my rule.",
  },
  {
    title: "Brilliant Ideas",
    description:
      "I bring creative, out-of-the-box solutions that elevate every project.",
  },
  {
    title: "Direct & Honest Feedback",
    description:
      "Not shy to speak up. Clear, honest feedback helps teams grow and products improve.",
  },
  {
    title: "Problem Solver",
    description:
      "Complex challenges excite me. I break them down and build clean solutions.",
  },
];

const storyEntries = [
  {
    title: "Computer Science Degree",
    subtitle: "Education",
    description:
      "Built a strong foundation in algorithms, data structures, and software engineering principles through formal education.",
    image: "/another.webp",
  },
  {
    title: "Full Stack Developer",
    subtitle: "Work Experience",
    description:
      "Designed and shipped production applications using modern frameworks, databases, and cloud infrastructure.",
    image: "/another.webp",
  },
  {
    title: "Freelance & Contract Work",
    subtitle: "Independent Projects",
    description:
      "Collaborated with diverse clients to build custom solutions, from landing pages to full-scale platforms.",
    image: "/another.webp",
  },
  {
    title: "Open Source Contributions",
    subtitle: "Community",
    description:
      "Contributed to open source projects, reviewing code, fixing bugs, and adding features used by developers worldwide.",
    image: "/another.webp",
  },
];

const About = () => {
  return (
    <section className="section" id="about">
      <p className="section-label">About</p>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
            About Me
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I am a developer who cares about how things work — not just that
            they work. I research before I build, communicate openly, and adapt
            quickly to whatever the project throws my way. Whether solo or in a
            team, I bring ideas, feedback, and a drive to ship quality software.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-6xl md:text-8xl font-medium leading-none">120%</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            That is the energy I bring to every project. Full commitment, full
            focus, full delivery — no half measures.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
          Skills &amp; Qualities
        </h3>
        <div>
          {skills.map((s, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 py-4 border-b border-border"
            >
              <span className="text-xs text-muted-foreground font-mono mt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="text-sm font-medium">{s.title}</span>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          Journey
        </h3>
        <p className="text-sm text-muted-foreground mb-8">
          A timeline of my journey through education, work, and building things.
        </p>
      </div>

      <div className="relative overflow-hidden w-full pb-6">
        <div
          className="flex gap-8 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...storyEntries, ...storyEntries].map((entry, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-3"
            >
              <div className="w-full h-40 border border-border overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  width={350}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium">{entry.title}</h4>
                <p className="text-xs text-muted-foreground">{entry.subtitle}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-border px-6 py-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          <DownloadSimpleIcon size={16} />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default About;
