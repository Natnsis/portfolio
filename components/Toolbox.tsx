import { STACK } from "@/lib/site";
import { TAPE_STRIP_CLIP } from "./artsy/Bits";
import Reveal from "./artsy/Reveal";

const TONES = ["var(--ca-yellow-soft)", "var(--ca-mint)", "var(--ca-cyan)", "var(--ca-pink-soft)"];
const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

// The stack, as strips of washi tape stuck to the page.
const Toolbox = () => (
  <section id="toolbox" className="ca-grid scroll-mt-24 px-4 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl">
      <Reveal from="translateY(28px)">
        <p className="ca-hand text-center text-3xl text-ca-ink sm:text-4xl">tools I reach for</p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
        {STACK.map((s, i) => (
          <Reveal key={s} from="scale(0.8)" delay={(i % 5) * 60}>
            <div className={`relative flex h-16 items-center justify-center px-6 ${TILTS[i % TILTS.length]}`}>
              <span
                aria-hidden
                className="ca-tape-strip absolute inset-0"
                style={{ backgroundColor: TONES[i % TONES.length], clipPath: TAPE_STRIP_CLIP }}
              />
              <span className="ca-mono relative z-10 text-center text-sm font-bold uppercase tracking-widest text-ca-ink sm:text-base">
                {s}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Toolbox;
