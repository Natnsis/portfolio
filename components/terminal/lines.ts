// Output model shared by the terminal and its shell: a block of lines, each a row of
// coloured segments, some clickable (cmd runs a command, url opens a tab).

// Tokyo Night–style palette; keep in sync with app/(terminal)/globals.css.
export const C = {
  accent: "#7aa2f7", // headings, links, selection, active tab
  teal: "#73daca", // paths and command arguments
  prompt: "#c3d86b", // the ❯ prompt character
  cursor: "#c0caf5",
  live: "#9ece6a",
  amber: "#e0af68",
  red: "#f7768e",
  purple: "#bb9af7",
  dim: "#7c84a8",
  fg: "#c0caf5",
  bright: "#e9ecfb",
  ink: "#1a1b26",
  panel: "#24283b",
  line: "#2f334d",
  edge: "#414868",
};

export interface Seg {
  text: string;
  color?: string;
  bg?: string; // a label-style background (vim status, table headers)
  weight?: number;
  cmd?: string;
  url?: string;
}
export interface TextLine {
  kind: "text";
  segs: Seg[];
  size?: string;
  lh?: string;
  weight?: number;
  ls?: string;
}
export interface BoxLine {
  kind: "box";
  label: string;
  h?: string;
  src?: string;
}
export interface RowLine {
  kind: "row";
  label: string;
  src?: string;
  sub: TextLine[];
}
export type Line = TextLine | BoxLine | RowLine;

export const T = (...segs: (string | Seg)[]): TextLine => ({
  kind: "text",
  segs: segs.map((s) => (typeof s === "string" ? { text: s } : s)),
});
const tint = (color: string) => (text: string): Seg => ({ text, color });
export const g = tint(C.accent);
export const d = tint(C.dim);
export const t = tint(C.teal);
export const a = tint(C.amber);
export const r = tint(C.red);
export const p = tint(C.purple);
export const ok = tint(C.live);
export const b = (text: string): Seg => ({ text, weight: 700 });
export const L = (text: string, cmd: string): Seg => ({ text, cmd });
export const U = (text: string, url: string): Seg => ({ text, url });
export const pad = (s: string, n: number): Seg => ({ text: " ".repeat(Math.max(1, n - s.length)) });

// Plain text of a line, for pipes (grep, wc, sort…).
export const plain = (l: Line) => (l.kind === "text" ? l.segs.map((s) => s.text).join("") : `[ ${l.label} ]`);

// "open solaris" echoed the way a shell shows it: ❯ command args.
export const echoLine = (cmd: string): TextLine => {
  const [c0 = "", ...rest] = cmd.split(" ");
  return T(
    { text: "❯ ", color: C.prompt, weight: 700 },
    { text: c0, color: C.bright },
    { text: rest.length ? " " + rest.join(" ") : "", color: C.teal },
  );
};
