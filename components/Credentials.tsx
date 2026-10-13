import { CREDENTIALS } from "@/lib/credentials";
import { HandLabel, TapeCorners } from "./artsy/Bits";
import Reveal from "./artsy/Reveal";
import { ArrowUpRight } from "./icons";

const NOTES = ["bg-ca-cyan", "bg-ca-yellow-soft", "bg-ca-mint", "bg-ca-pink-soft"];
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

// Each certificate is a sticky note pinned to the page, linking to its PDF.
const Credentials = () => (
  <section id="credentials" className="ca-grid scroll-mt-24 px-4 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl">
      <HandLabel underline="w-24">the paperwork</HandLabel>
      <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-12">
        {CREDENTIALS.map((c, i) => (
          <Reveal
            key={c.title}
            from="translateY(28px)"
            delay={(i % 3) * 90}
            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
          >
            <a
              href={c.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block h-full p-5 pt-6 shadow-[2px_6px_18px_rgba(17,18,18,0.22)] transition-transform duration-200 hover:-translate-y-1 ${NOTES[i % NOTES.length]}`}
              style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
            >
              <TapeCorners
                left={i % 2 ? "bg-ca-pink-soft/70" : "bg-ca-yellow-soft/70"}
                right={i % 2 ? "bg-ca-cyan/70" : "bg-ca-mint/70"}
              />
              <p className="text-lg font-semibold leading-snug text-ca-ink">{c.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ca-ink/75">{c.description}</p>
              <span className="ca-mono mt-4 inline-flex items-center gap-1.5 border-b-2 border-ca-ink pb-0.5 text-xs font-bold uppercase tracking-[0.2em] text-ca-ink">
                Open PDF
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Credentials;
