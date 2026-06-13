"use client";

import { ArrowRightIcon, GlobeIcon } from "@phosphor-icons/react";
import Link from "next/link";

const projects = [
  {
    title: "Snippet And Boilerplate Manager",
    url: "/sbm.png",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Rate My Portfolio",
    url: "/rmp(1).png",
    tags: ["React", "Node.js"],
  },
  {
    title: "Asu Students App",
    url: "/asu.jpg",
    tags: ["React Native", "Firebase"],
  },
  {
    title: "Fimple NVIM Config",
    url: "fimple.png",
    tags: ["Lua", "Neovim"],
  },
  {
    title: "Poster Boi",
    url: "/tg.jpg",
    tags: ["Python", "PostgreSQL"],
  },
  {
    title: "Ecommerce Web App",
    url: "/ecom-site.png",
    tags: ["Next.js", "Stripe"],
  },
];

const ProjectsCut = () => {
  return (
    <section className="section" id="projects">
      <p className="section-label">Selected work</p>
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((p, index) => (
          <div key={index} className="group flex flex-col gap-3">
            <div className="aspect-video border border-border overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url("${p.url}")` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{p.title}</h3>
              <Link
                href="#"
                className="text-xs uppercase tracking-widest text-muted-foreground hover:underline underline-offset-4 decoration-1 transition-all inline-flex items-center gap-1"
              >
                <GlobeIcon size={12} />
                Visit
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-border px-6 py-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          View all projects
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ProjectsCut;
