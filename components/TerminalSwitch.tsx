"use client";

import { setMode, TERMINAL_PATH } from "@/lib/mode";

// Mini terminal in the corner of the animated UI: switches back to the terminal look.
const TerminalSwitch = () => (
  <a
    href={TERMINAL_PATH}
    onClick={() => setMode("terminal")}
    aria-label="Switch to the terminal version"
    title="Switch to terminal"
    className="group fixed bottom-4 right-4 z-[70] flex items-center gap-2 border-2 border-ca-ink bg-[#1d1d1b] px-3 py-2 text-[#f0eee9] transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
  >
    <span aria-hidden className="ca-mono text-sm font-bold leading-none text-[#2ea44f]">
      &gt;_
    </span>
    <span className="ca-mono hidden text-xs uppercase leading-none tracking-widest sm:inline">
      Terminal
    </span>
  </a>
);

export default TerminalSwitch;
