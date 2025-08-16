"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-background via-muted/30 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Natnael Sisay
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-primary">
              Full-Stack Developer
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              I design and build scalable, user-focused applications with modern
              technologies. <br /> Passionate about solving real-world problems
              through clean code and innovative solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={() => scrollToSection("projects")}
            >
              🚀 View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              ✉️ Contact Me
            </Button>
          </div>

          <div className="flex justify-center space-x-6 pt-8">
            <a
              href="https://github.com/Natnsis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-7 w-7" />
            </a>
            <a
              href="https://linkedin.com/in/natnael-sisay-orcadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              href="mailto:nsisay49@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
