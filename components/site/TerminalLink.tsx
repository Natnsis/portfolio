"use client";

import { setMode, TERMINAL_PATH } from "@/lib/mode";

// Saves the choice first, or the terminal page would bounce a "ui" visitor straight back.
const TerminalLink = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <a href={TERMINAL_PATH} onClick={() => setMode("terminal")} className={className}>
    {children}
  </a>
);

export default TerminalLink;
