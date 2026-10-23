"use client";

// First-visit choice, asked in plain words and buttons, so someone who has never
// used a terminal can still pick the regular site. The terminal stays visible
// (blurred) behind it as a preview of what the other option looks like.
import { useEffect, useRef } from "react";

type Choice = "ui" | "terminal";

export default function ModeGate({ onChoose, leaving }: { onChoose: (c: Choice) => void; leaving: boolean }) {
  const first = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => first.current?.focus({ preventScroll: true }), 80);
    return () => clearTimeout(t);
  }, []);

  // Keep Tab inside the dialog; arrow keys move between the two choices.
  const onKey = (e: React.KeyboardEvent) => {
    const btns = [...(panel.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "Tab" || /^Arrow(Left|Right|Up|Down)$/.test(e.key)) {
      e.preventDefault();
      const back = e.shiftKey || e.key === "ArrowLeft" || e.key === "ArrowUp";
      btns[(i + (back ? -1 : 1) + btns.length) % btns.length]?.focus();
    }
    e.stopPropagation();
  };

  return (
    <div className="gate" data-leaving={leaving ? "1" : "0"} onKeyDown={onKey}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-desc" className="gate-panel">
        <p className="gate-hello">
          <span className="gate-wave" aria-hidden>
            ●
          </span>
          Hi, I&apos;m Natnael
        </p>
        <h1 id="gate-title" className="gate-title">
          How would you like to look around?
        </h1>
        <p id="gate-desc" className="gate-desc">
          This site comes in two styles. Both show the same projects and work, so pick whichever feels comfortable.
        </p>

        <div className="gate-options">
          <button ref={first} type="button" className="gate-card" data-primary="1" onClick={() => onChoose("ui")} disabled={leaving}>
            <span className="gate-art gate-art-ui" aria-hidden>
              <span className="gate-art-bar" />
              <span className="gate-art-hero" />
              <span className="gate-art-row">
                <span />
                <span />
                <span />
              </span>
            </span>
            <span className="gate-badge">Recommended</span>
            <span className="gate-card-title">Regular website</span>
            <span className="gate-card-text">Scroll and click like any other site. The easy choice for most visitors.</span>
            <span className="gate-go" aria-hidden>
              Take me there →
            </span>
          </button>

          <button type="button" className="gate-card" onClick={() => onChoose("terminal")} disabled={leaving}>
            <span className="gate-art gate-art-term" aria-hidden>
              <span className="gate-art-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="gate-art-line">
                <b>❯</b> ls projects
              </span>
              <span className="gate-art-line gate-art-dim">api/ web/ tools/</span>
              <span className="gate-art-line">
                <b>❯</b> <span className="gate-art-caret" />
              </span>
            </span>
            <span className="gate-card-title">Developer terminal</span>
            <span className="gate-card-text">Explore by typing commands, the way programmers do. Fun if you write code.</span>
            <span className="gate-go" aria-hidden>
              Keep the terminal →
            </span>
          </button>
        </div>

        <p className="gate-note">You can switch between the two at any time.</p>
      </div>
    </div>
  );
}
