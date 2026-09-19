import projectsData from "@/data/projects.json";

export interface Project {
  title: string;
  cat: string;
  tags: string[];
  meta: string;
  live: boolean;
  featured: boolean;
  summary: string;
  story: string;
  built: string;
}

// Adding a project is just an entry in data/projects.json — no code changes.
export const PROJECTS: Project[] = projectsData as Project[];

export const FEATURED_PROJECTS: Project[] = (() => {
  const featured = PROJECTS.filter((p) => p.featured);
  const pool = featured.length > 0 ? featured : PROJECTS;
  return pool.slice(0, 9);
})();

export const FILTERS: string[] = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.cat))),
];
