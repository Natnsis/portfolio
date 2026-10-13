"use client";

import { useEffect, useRef } from "react";

interface LensGroupProps {
  group: "name" | "talk";
  className?: string;
  // Keep the lens center within this % range of the box on both axes.
  clamp?: [number, number];
  children: React.ReactNode;
}

// Hover area with an inverting lens that follows the cursor, framed by crop marks.
const LensGroup = ({ group, className = "", clamp = [3, 97], children }: LensGroupProps) => {
  const lens = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lens.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = box.getBoundingClientRect();
      const [lo, hi] = clamp;
      const x = Math.min(hi, Math.max(lo, ((clientX - r.left) / r.width) * 100));
      const y = Math.min(hi, Math.max(lo, ((clientY - r.top) / r.height) * 100));
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
    });
  };

  return (
    <div
      onMouseMove={onMove}
      className={`${group === "name" ? "group/name" : "group/talk"} ${className}`}
    >
      {children}
      <span
        ref={lens}
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 scale-[0.35] opacity-0 transition-[opacity,scale] duration-300 ease-out [backdrop-filter:invert(1)] lg:block ${
          group === "name"
            ? "group-hover/name:scale-100 group-hover/name:opacity-100"
            : "group-hover/talk:scale-100 group-hover/talk:opacity-100"
        }`}
      >
        <span className="absolute -left-2 -top-2 h-4 w-4 bg-ca-ink" />
        <span className="absolute -right-2 -top-2 h-4 w-4 bg-ca-ink" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 bg-ca-ink" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 bg-ca-ink" />
      </span>
    </div>
  );
};

export default LensGroup;
