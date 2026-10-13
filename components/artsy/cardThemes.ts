// Project card colorways, cycled by index. Dark cards take white type and
// white tags; light cards take ink type and ink tags.
export interface CardTheme {
  bg: string;
  dark: boolean;
}

export const CARD_THEMES: CardTheme[] = [
  { bg: "var(--ca-blue)", dark: true },
  { bg: "var(--ca-ink)", dark: true },
  { bg: "var(--ca-yellow)", dark: false },
  { bg: "var(--ca-magenta)", dark: false },
  { bg: "var(--ca-green)", dark: true },
  { bg: "var(--ca-orange)", dark: false },
];

export const cardTheme = (i: number) => {
  const t = CARD_THEMES[i % CARD_THEMES.length];
  return {
    ...t,
    text: t.dark ? "text-white" : "text-ca-ink",
    body: t.dark ? "text-white/90" : "text-ca-ink/85",
    accent: t.dark ? "#ffffff" : "var(--ca-ink)",
    tag: t.dark ? "text-ca-ink" : "text-white",
  };
};
