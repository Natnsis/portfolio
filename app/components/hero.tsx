"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2a2a] leading-tight">
              Natnael Sisay
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-[#2a2a2a]/80">
              Full-Stack Developer
            </p>
            <p className="text-lg text-[#2a2a2a]/70 mt-4">
              I build practical web and mobile applications that solve real
              problems — from student tools to full-stack platforms — using
              React, Node.js, and modern TypeScript.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#1a1a1a] font-medium"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-[#2a2a2a]/20 text-[#2a2a2a] hover:bg-[#f5f5f5] font-medium"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-5 pt-6">
            <a
              href="https://github.com/Natnsis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a2a2a]/50 hover:text-[#2a2a2a] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/natnael-sisay-orcadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a2a2a]/50 hover:text-[#2a2a2a] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:nsisay49@gmail.com"
              className="text-[#2a2a2a]/50 hover:text-[#2a2a2a] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
