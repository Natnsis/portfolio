// Which look a visitor picked: the terminal ("/") or the animated UI ("/ui").
// Remembered so the "are you technical?" question is only asked once.
export type Mode = "terminal" | "ui";

const KEY = "nasi-mode";

export const getMode = (): Mode | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "terminal" || v === "ui" ? v : null;
  } catch {
    return null;
  }
};

export const setMode = (m: Mode) => {
  try {
    localStorage.setItem(KEY, m);
  } catch {}
};

export const UI_PATH = "/ui";
export const TERMINAL_PATH = "/";
