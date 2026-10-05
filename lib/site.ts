export type NavKey = "home" | "about" | "work" | "projects";

export interface NavLink {
  key: NavKey;
  label: string;
  // Homepage section id ("top" = page top); "/projects" is its own route.
  section?: string;
  href?: string;
}

export const NAV: NavLink[] = [
  { key: "home", label: "Home", section: "top" },
  { key: "about", label: "About", section: "about" },
  { key: "work", label: "Work", section: "work" },
  { key: "projects", label: "Projects", href: "/projects" },
];

// Section links resolve to "#id" on the homepage and "/#id" elsewhere.
export const navHref = (l: NavLink, onHome: boolean) =>
  l.href ?? (onHome ? `#${l.section}` : `/#${l.section}`);

export const STACK: string[] = [
  "TS/JS",
  "Golang",
  "Node/Express",
  "React/Next",
  "shadcn/ui",
  "Zod",
  "Zustand",
  "TanStack Query",
  "Svelte",
  "Prisma",
  "GORM",
  "Gin",
  "React Native",
  "Flutter",
  "Neovim",
];

export const EMAIL = "nsisay49@gmail.com";
export const RESUME_URL = "/resume.pdf";
export const PORTRAIT_URL = "/avatar.png";
export const SIDEKICK_URL = "/another.webp";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Natnsis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/natnael-sisay-orcadev/" },
  { label: "Telegram", href: "https://t.me/Flawless_22_4" },
  { label: "X", href: "https://x.com/NatnaelSis24858" },
] as const;
