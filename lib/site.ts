export interface NavLink {
  label: string;
  // Section id on the homepage; links resolve to "#id" there and "/#id" elsewhere.
  section: string;
  active?: boolean;
}

export const NAV: NavLink[] = [
  { label: "Natnael Sisay", section: "top", active: true },
  { label: "Work", section: "work" },
  { label: "About", section: "about" },
  { label: "Credentials", section: "credentials" },
  { label: "Contact", section: "contact" },
];

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
export const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Natnsis" },
  { label: "Telegram", href: "https://t.me/Flawless_22_4" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/natnael-sisay-orcadev/" },
  { label: "X", href: "https://x.com/NatnaelSis24858" },
];
