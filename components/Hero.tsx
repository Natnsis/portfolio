"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const featured = [
  {
    title: "Snippet & Boilerplate Manager",
    url: "/sbm.png",
    desc: "A tool for managing code snippets and boilerplate templates across projects.",
  },
  {
    title: "Rate My Portfolio",
    url: "/rmp(1).png",
    desc: "A community platform for developers to share and get feedback on their portfolios.",
  },
  {
    title: "Asu Students App",
    url: "/asu.jpg",
    desc: "A mobile app built for university students to access campus resources and updates.",
  },
  {
    title: "Fimple NVIM Config",
    url: "fimple.png",
    desc: "A carefully curated Neovim configuration optimized for full-stack development.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % featured.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const p = featured[current];

  return (
    <section className="py-14 md:py-20" id="home">
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="flex flex-col gap-5">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-border overflow-hidden">
            <Image
              src="/another.webp"
              alt="Natnael Sisay"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
              Natnael Sisay
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-md leading-relaxed">
              Full-stack developer who researches before building, communicates
              openly, and ships quality software — solo or with a team.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              See my work
              <ArrowRightIcon size={15} />
            </Link>
            <Link
              href="/credentials"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View credentials
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-4 p-6 border border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Available for new projects
            </span>
          </div>
          <div className="border-t border-border" />
          <div className="relative h-[340px]">
            <div
              key={current}
              className={`absolute inset-0 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              <div className="h-[180px] border border-border overflow-hidden mb-3">
                <img
                  src={p.url}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Featured project
              </p>
              <p className="text-sm font-medium leading-snug">{p.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                {p.desc}
              </p>
              <Link
                href="/projects"
                className="text-xs text-primary hover:underline underline-offset-4 mt-2 inline-flex items-center gap-1"
              >
                View project <ArrowRightIcon size={12} />
              </Link>
            </div>
          </div>
          <div className="flex gap-1.5">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? "bg-foreground w-3" : "bg-border"
                }`}
                aria-label={`Show project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
