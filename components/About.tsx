"use client";

import { DownloadSimpleIcon, GlobeIcon } from "@phosphor-icons/react";
import Image from "next/image";

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
    <div id="about" className="py-10 md:py-20 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl mb-6">About Me</h1>
          <p className="text-base md:text-lg leading-relaxed">
            I am a developer who cares about how things work — not just that
            they work. I research before I build, communicate openly, and adapt
            quickly to whatever the project throws my way. Whether solo or in a
            team, I bring ideas, feedback, and a drive to ship quality software.
          </p>
        </div>

        <div className="flex flex-col gap-5 bg-black/5 px-6 md:px-10 py-6 md:py-8 border border-black">
          <div className="flex gap-5 items-center">
            <div className="border border-black p-3 rounded-full w-fit">
              <GlobeIcon size={40} className="md:w-[60px] md:h-[60px]" />
            </div>
            <h1 className="text-5xl md:text-7xl">120%</h1>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            That is the energy I bring to every project. Full commitment, full
            focus, full delivery — no half measures.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl mb-2">My Story</h1>
        <p className="text-base md:text-lg">
          A timeline of my journey through education, work, and building things.
        </p>
      </div>

      <div className="relative overflow-hidden w-full py-6">
        <div
          className="flex gap-8 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...storyEntries, ...storyEntries].map((entry, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[350px] p-5 flex flex-col gap-3"
            >
              <div className="w-full h-40 bg-black/10 flex items-center justify-center overflow-hidden">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  width={350}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{entry.title}</h2>
                  <p className="text-sm opacity-60">{entry.subtitle}</p>
                </div>
                <DownloadSimpleIcon
                  size={20}
                  className="cursor-pointer hover:opacity-60 transition-opacity flex-shrink-0"
                />
              </div>
              <p className="text-sm leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 border border-black px-6 py-4 text-base hover:bg-black/5 transition-colors"
        >
          <DownloadSimpleIcon size={20} />
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default About;
