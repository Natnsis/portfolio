"use client";

import { SPRING, useInView } from "./Reveal";

interface LettersProps {
  text: string;
  className?: string;
  // How far each letter drops in from, in em.
  rise?: number;
  delay?: number;
}

// Display headline whose letters pop up one after another.
const Letters = ({ text, className = "", rise = 0.5, delay = 0 }: LettersProps) => {
  const [ref, inView] = useInView<HTMLSpanElement>();
  let n = 0;

  return (
    <span ref={ref} data-reveal className={`ca-display ${className}`} style={{ display: "inline-block" }}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w, words) => (
        <span key={w}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {[...word].map((c, i) => {
              const d = delay + n++ * 40;
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : `translateY(${rise}em)`,
                    transition: `opacity .35s ease-out ${d}ms, transform .6s ${SPRING} ${d}ms`,
                  }}
                >
                  {c}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
};

export default Letters;
