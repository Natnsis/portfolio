import type { Project } from "@/lib/projects";

interface ProjectRowProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

// One editorial row: number, title, summary and tags beside a 16:10 shot.
const ProjectRow = ({ project: p, index, onOpen }: ProjectRowProps) => (
  <article className="border-t border-white/15">
    <button
      onClick={onOpen}
      className="grid w-full cursor-pointer items-center border-0 bg-transparent p-0 text-left text-white transition-opacity hover:opacity-80"
      style={{
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
        gap: "clamp(24px,4vw,64px)",
        paddingBlock: "clamp(40px,5vw,64px)",
      }}
    >
      <div className="flex flex-col gap-5">
        <span className="text-xs tracking-[.3em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="m-0 display" style={{ fontSize: "clamp(1.5rem,2.6vw,2.5rem)" }}>
          {p.title}
        </h3>
        <p className="m-0 max-w-[52ch] text-base font-light leading-[1.65] text-white/75 text-pretty">
          {p.summary}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] uppercase tracking-[.2em] text-white/60">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="aspect-[16/10] overflow-hidden bg-white/5">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        )}
      </div>
    </button>
  </article>
);

export default ProjectRow;
