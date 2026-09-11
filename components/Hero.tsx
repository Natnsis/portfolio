"use client";

import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
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
    url: "/fimple.png",
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
    <section className="section" id="home">
      <div className="flex flex-col gap-10 md:gap-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-border overflow-hidden shrink-0">
              <Image
                src="/another.webp"
                alt="Natnael Sisay"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="mono-label mb-1">I&apos;m</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tight">
                Natnael Sisay
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:pt-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Full-stack developer who researches before building, communicates
              openly, and ships quality software — solo or with a team.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium rounded-full bg-primary text-primary-foreground pl-5 pr-4 py-2.5 hover:opacity-90 transition-opacity"
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
        </div>

        <div className="rounded-3xl bg-secondary text-secondary-foreground p-5 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <p className="font-mono text-xs uppercase tracking-widest text-secondary-foreground/50">
              Featured project
            </p>
            <p className="font-mono text-xs text-primary">
              {"// "}
              {String(current + 1).padStart(2, "0")}
            </p>
          </div>

          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-center">
            <div
              key={current}
              className={`transition-opacity duration-300 order-2 md:order-1 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                {p.title}
              </h2>
              <p className="text-sm text-secondary-foreground/60 leading-relaxed mb-5 max-w-sm">
                {p.desc}
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
              >
                Explore the work
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>

            <div
              key={`${current}-img`}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden order-1 md:order-2 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={p.url}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex gap-1.5 mt-6">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrent(i);
                    setFade(true);
                  }, 300);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "bg-primary w-6" : "bg-secondary-foreground/20 w-1.5"
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
