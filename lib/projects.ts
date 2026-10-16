import projectsData from "@/data/projects.json";

export interface Project {
  title: string;
  categories: string[];
  tags: string[];
  image?: string;
  meta: string;
  live: boolean;
  liveUrl?: string;
  githubUrl?: string;
  summary: string;
  story: string;
  built: string;
}

// Adding a project is just an entry appended to the end of data/projects.json
// — no code changes, and it's automatically picked up by the homepage.
export const PROJECTS: Project[] = projectsData as Project[];

// Homepage shows whatever was added most recently — the last 6 entries in
// the file — instead of a manually curated flag.
export const FEATURED_PROJECTS: Project[] = PROJECTS.slice(-6);

// A project can belong to more than one of these (e.g. a Next.js dashboard is
// "Full Stack", "Web Apps", "Next.js" and "React" all at once).
export const FILTERS: string[] = [
  "All",
  "Landing Pages",
  "Mobile Apps",
  "Flutter",
  "React Native",
  "Tools",
  "Bots",
  "Web Apps",
  "Full Stack",
  "React",
  "Next.js",
  "Golang",
];

// "Freelance · 2026 · Frontend developer" → its three parts.
export const projectMeta = (p: Project) => {
  const [kind = "", year = "", role = ""] = p.meta.split(" · ");
  return { kind, year, role };
};

// Some entries keep a placeholder liveUrl while not live; only link real ones.
export const liveUrl = (p: Project) => (p.live ? p.liveUrl : undefined);

// 0 → "001"
export const projectNo = (i: number) => String(i + 1).padStart(3, "0");

// Cloudinary screenshots are full 1920px PNGs; ask for a resized, auto-format copy.
export const imageAt = (url: string | undefined, width: number) =>
  url?.replace("/image/upload/", `/image/upload/w_${width},f_auto,q_auto/`);
