"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"; // Removed ModeToggle import

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = useCallback((href: string) => {
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5]/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-sans font-bold text-lg tracking-tight text-[#2a2a2a]">
            Natnael
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium text-[#2a2a2a]/70 transition-colors hover:text-[#2a2a2a] ${
                    isActive ? "text-[#2a2a2a]" : ""
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2a2a2a]" />
                  )}
                </button>
              );
            })}

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[#2a2a2a]/20 text-[#2a2a2a] hover:bg-[#f5f5f5] hover:border-[#2a2a2a]/30"
                onClick={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = "/natnael-sisay-cv.pdf";
                  link.download = "natnael-sisay-cv.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                CV
              </Button>
              {/* ✅ ModeToggle REMOVED HERE */}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#2a2a2a] hover:text-[#2a2a2a]/80 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-3 pb-4 border-t border-[#2a2a2a]/5">
            <div className="flex flex-col gap-1 px-4">
              {navItems.map((item) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full text-left px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-[#2a2a2a] bg-[#f5f5f5]"
                        : "text-[#2a2a2a]/70 hover:text-[#2a2a2a] hover:bg-[#f5f5f5]/60"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between px-4 mt-5">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[#2a2a2a]/20 text-[#2a2a2a] hover:bg-[#f5f5f5]"
                onClick={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = "/natnael-sisay-cv.pdf";
                  link.download = "natnael-sisay-cv.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setIsOpen(false);
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
