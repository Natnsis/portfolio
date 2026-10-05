"use client";

import { useEffect, useRef, useState } from "react";

// Slight overshoot, like a sticker being slapped down.
export const SPRING = "cubic-bezier(.34,1.56,.64,1)";

export function useInView<T extends Element>(margin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, inView] as const;
}

interface RevealProps {
  // Transform before entering, e.g. "translateY(-28px) rotate(-14.4deg)".
  from: string;
  to?: string;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

const Reveal = ({ from, to = "none", delay = 0, duration = 700, className, children }: RevealProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? to : from,
        transition: `opacity ${duration * 0.6}ms ease-out ${delay}ms, transform ${duration}ms ${SPRING} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
