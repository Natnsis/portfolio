import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, X } from "@phosphor-icons/react";
import { imageAt, liveUrl, PROJECTS, projectMeta } from "@/lib/projects";

const Chapter = ({ title, text }: { title: string; text: string }) => (
  <div className="mt-6 first:mt-0">
    <p className="font-serif text-xl italic">{title}</p>
    <p className="mt-1.5 font-read text-[16.5px] leading-[1.7] text-dk-ink/80">{text}</p>
  </div>
);

const PageNo = ({ n }: { n: number }) => (
  <p className="mt-8 text-center font-mono text-[11px] text-dk-ink/40">— {n} —</p>
);

// A project laid open like a book: picture and facts on the left page, the story on the right.
const OpenBook = ({
  index,
  onPrev,
  onNext,
  onClose,
}: {
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onClose?: () => void;
}) => {
  const p = PROJECTS[index];
  const { kind, year, role } = projectMeta(p);
  const live = liveUrl(p);

  return (
    <article
      key={p.title}
      aria-label={p.title}
      className="relative overflow-hidden rounded-md bg-dk-paper text-dk-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      style={{ animation: "dk-open .3s ease-out both" }}
    >
      {/* Spine crease down the middle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 md:block"
        style={{ background: "linear-gradient(90deg, transparent, rgba(43,34,25,0.14) 48%, rgba(43,34,25,0.22) 50%, rgba(43,34,25,0.14) 52%, transparent)" }}
      />
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-dk-ink/5 hover:bg-dk-ink/10"
        >
          <X size={16} />
        </button>
      )}

      <div className="grid md:grid-cols-2">
        {/* Left page */}
        <div className="p-6 sm:p-9 md:pr-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dk-ink/45">
            No. {String(index + 1).padStart(2, "0")} · {kind}
          </p>
          <h3 className="mt-2 pr-10 font-serif text-4xl font-normal leading-[1.05] sm:text-[2.75rem]">{p.title}</h3>
          <p className="mt-2 text-[14px] text-dk-ink/60">
            {year} · {role}
            {p.live && <span className="ml-2 rounded-full bg-[#7fae62]/20 px-2 py-0.5 text-[12px] font-medium text-[#4d7a35]">Live</span>}
          </p>

          {p.image && (
            <div className="mt-6 overflow-hidden rounded bg-dk-ink shadow-[0_10px_30px_-12px_rgba(43,34,25,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageAt(p.image, 1000)} alt={p.title} className="aspect-video w-full object-contain" />
            </div>
          )}

          <p className="mt-6 font-read text-[1.3rem] italic leading-snug text-dk-ink/90">{p.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded bg-dk-ink/[0.07] px-2 py-1 font-mono text-[12px] text-dk-ink/70">
                {t}
              </span>
            ))}
          </div>

          {(live || p.githubUrl) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-dk-ink px-4 py-2 text-[14px] font-medium text-dk-paper hover:bg-black"
                >
                  Visit site <ArrowUpRight size={14} />
                </a>
              )}
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dk-ink/20 px-4 py-2 text-[14px] font-medium hover:bg-dk-ink/5"
                >
                  <GithubLogo size={15} /> Source
                </a>
              )}
            </div>
          )}
          <PageNo n={index * 2 + 1} />
        </div>

        {/* Right page */}
        <div className="flex flex-col border-t border-dk-ink/10 p-6 sm:p-9 md:border-t-0 md:pl-12">
          <Chapter title="The story" text={p.story} />
          <Chapter title="How it was built" text={p.built} />

          <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-[14px] font-medium">
            <button onClick={onPrev} className="inline-flex items-center gap-1.5 text-dk-ink/60 hover:text-dk-ink">
              <ArrowLeft size={14} /> Previous
            </button>
            <button onClick={onNext} className="inline-flex items-center gap-1.5 text-[#a85d22] hover:text-dk-ink">
              Next book <ArrowRight size={14} />
            </button>
          </div>
          <PageNo n={index * 2 + 2} />
        </div>
      </div>
    </article>
  );
};

export default OpenBook;
