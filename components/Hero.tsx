"use client";

import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="section" id="home">
      <p className="section-label">Introduction</p>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-medium tracking-tight">
            Natnael
            <br />
            Sisay
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Full-stack developer who researches before building, communicates
            openly, and ships quality software — solo or with a team.
          </p>
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-border px-6 py-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              View my work
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-sm aspect-[3/4] border border-border overflow-hidden">
            <Image
              src="/another.webp"
              alt="Natnael Sisay"
              width={400}
              height={533}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
