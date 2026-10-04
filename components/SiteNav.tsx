"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NAV, RESUME_URL } from "@/lib/site";
import { ArrowDown, Close } from "./icons";

const EASE = "cubic-bezier(.16,1,.3,1)";

interface SiteNavProps {
  // Foreground color; the hero flips it to white once the video turns dark.
  color?: string;
  // Homepage uses in-page anchors; other routes link back to "/#section".
  onHome?: boolean;
  className?: string;
}

const SiteNav = ({ color = "#1D3045", onHome = true, className = "" }: SiteNavProps) => {
  const [entered, setEntered] = useState(false);
  const [menu, setMenu] = useState(false);
  const inverse = color === "#fff" ? "#1D3045" : "#fff";
  const href = (section: string) => (onHome ? `#${section}` : `/#${section}`);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const enter = (delay: number) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(-12px)",
    transition: `opacity .6s ${EASE} ${delay}ms, transform .6s ${EASE} ${delay}ms`,
  });

  return (
    <>
      <nav
        className={`z-50 flex items-center justify-between ${className}`}
        style={{
          padding: "clamp(32px,4vw,48px) clamp(24px,4vw,48px) 24px",
          color,
          transition: "color .5s",
        }}
      >
        <div className="hidden lg:flex items-center" style={{ gap: "clamp(32px,2.6vw,40px)" }}>
          {NAV.map((l, i) => (
            <a
              key={l.section}
              href={href(l.section)}
              className="relative text-xs font-medium uppercase tracking-[.15em]"
              style={enter(i * 80 + 100)}
            >
              {l.label}
              {l.active && (
                <span className="absolute inset-x-0 -bottom-3 h-0.5 bg-current" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenu(true)}
          aria-label="Open menu"
          className="lg:hidden flex flex-col gap-[5px] py-2 bg-transparent border-0 cursor-pointer"
        >
          {[24, 24, 16].map((w, i) => (
            <span
              key={i}
              className="block h-0.5"
              style={{ width: w, background: color, transition: "background .5s" }}
            />
          ))}
        </button>

        <div className="hidden sm:flex items-center gap-8" style={enter(500)}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[.2em]"
          >
            Resume
            <span
              className="flex size-5 items-center justify-center rounded-full"
              style={{ background: color, color: inverse, transition: "background .5s" }}
            >
              <ArrowDown size={10} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </nav>

      {/* Mobile menu — portaled so the hero's sticky stacking context can't trap it */}
      {entered &&
        createPortal(
      <div
        className="fixed inset-0 z-[100] flex flex-col bg-navy text-white"
        style={{
          opacity: menu ? 1 : 0,
          visibility: menu ? "visible" : "hidden",
          transition: "opacity .5s var(--ease-menu), visibility .5s var(--ease-menu)",
        }}
      >
        <div
          className="flex flex-1 flex-col"
          style={{
            transform: menu ? "translateY(0)" : "translateY(-32px)",
            transition: "transform .5s var(--ease-menu)",
          }}
        >
          <div
            className="flex justify-end"
            style={{ padding: "clamp(32px,4vw,48px) clamp(24px,4vw,32px) 0" }}
          >
            <button
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-colors hover:border-white"
            >
              <Close />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            {NAV.map((l, i) => (
              <a
                key={l.section}
                href={href(l.section)}
                onClick={() => setMenu(false)}
                className="py-3 font-light uppercase tracking-[.025em]"
                style={{
                  paddingInline: "clamp(32px,4vw,48px)",
                  fontSize: "clamp(1.5rem,3vw,1.875rem)",
                  color: l.active ? "#fff" : "rgba(255,255,255,.6)",
                  opacity: menu ? 1 : 0,
                  transform: menu ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div
            className="flex gap-8 pb-10 text-xs uppercase tracking-[.2em] text-white/60"
            style={{ paddingInline: "clamp(32px,4vw,48px)" }}
          >
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
            <a href={href("contact")} onClick={() => setMenu(false)}>
              Contact
            </a>
          </div>
        </div>
      </div>,
          document.body,
        )}
    </>
  );
};

export default SiteNav;
