import { PROJECTS } from "@/lib/projects";

export const EMAIL = "nsisay49@gmail.com";
export const PHOTO = "/avatar.png";
export const SITE = "https://nasi.work";

export interface Proj {
  slug: string;
  name: string;
  tag: string;
  kind: string;
  year: string;
  role: string;
  stack: string;
  tags: string[];
  desc: string;
  story: string;
  built: string;
  shot?: string;
  live: string;
  repo: string;
}

// Slug is what you type (`open linksy`); tag is what `projects --tag=` filters on.
const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const tagOf = (cats: string[]) => {
  if (cats.includes("Mobile Apps")) return "mobile";
  if (cats.includes("Bots")) return "bot";
  if (cats.includes("Tools") && !cats.some((c) => c === "Web Apps" || c === "Landing Pages")) return "tool";
  return "web";
};
// A missing (or example.com placeholder) URL shows 'not set yet'.
const realUrl = (u?: string) => (u && !/example\.com/.test(u) ? u : "");

// Every project in data/projects.json, in file order.
export const P: Proj[] = PROJECTS.map((x) => {
  const [kind = "", year = "", role = ""] = x.meta.split(" · ");
  return {
    slug: slugify(x.title),
    name: x.title,
    tag: tagOf(x.categories),
    kind: kind.toLowerCase(),
    year,
    role: role.toLowerCase(),
    stack: x.tags.join(" · "),
    tags: x.tags,
    desc: x.summary,
    story: x.story,
    built: x.built,
    // Cloudinary serves a 1100px-wide, auto-compressed copy instead of the full-size original.
    shot: x.image?.replace("/upload/", "/upload/w_1100,c_limit,q_auto,f_auto/"),
    live: x.live ? realUrl(x.liveUrl) : "",
    repo: realUrl(x.githubUrl),
  };
});

export interface Job {
  file: string;
  title: string;
  org: string;
  when: string;
  desc: string;
  link?: [string, string];
  url?: [string, string];
}
export const EXP: Job[] = [
  { file: "fintech.md", title: "Software Engineer", org: "fintech team", when: "present · full-time", desc: "Backend microservices in Go, plus frontend work in TypeScript." },
  { file: "freelance.md", title: "Freelance Full-Stack Developer", org: "independent", when: "2026 · freelance", desc: "Client sites and tools, e.g.", link: ["mereb-landing", "open mereb-landing"] },
  {
    file: "cbe-internship.md",
    title: "Software Development Intern",
    org: "Commercial Bank of Ethiopia",
    when: "internship",
    desc: "Software development internship.",
    url: ["internship letter ↗", `${SITE}/credentials/cbe-internship-letter.pdf`],
  },
];

export const CERTS: [string, string][] = [
  ["B.Sc. in Computer Science", "cs-degree"],
  ["Best Final Year Project Winner", "final-year-project-award"],
  ["Internship at CBE", "cbe-internship-letter"],
  ["Cisco Networking Certified", "cisco-certificate"],
  ["AI Certified", "ai-certificate"],
  ["Android Development Certified", "android-certificate"],
  ["Data Analysis Certified", "data-analysis-certificate"],
];

export const SOCIALS: [string, string][] = [
  ["github", "https://github.com/Natnsis"],
  ["linkedin", "https://www.linkedin.com/in/natnael-sisay-orcadev/"],
  ["telegram", "https://t.me/Flawless_22_4"],
  ["x", "https://x.com/NatnaelSis24858"],
];

export const BIO =
  "I'm a full-stack developer who researches before building, communicates openly, and adapts fast to whatever the project throws at me. Solo or with a team, I bring ideas, honest feedback, and a real drive to ship quality software.";

export const STACK: [string, string][] = [
  ["languages", "ts/js · golang"],
  ["frontend", "react/next · svelte · shadcn/ui · zustand · tanstack query"],
  ["backend", "node/express · gin · prisma · gorm · zod"],
  ["mobile", "react native · flutter"],
  ["editor", "neovim"],
];
