import { PORTRAIT_URL, SIDEKICK_URL } from "@/lib/site";
import { HandLabel, HandNote, Pill, PhotoDot } from "./artsy/Bits";
import LensGroup from "./artsy/Lens";
import Letters from "./artsy/Letters";
import Reveal from "./artsy/Reveal";
import { ArrowUpRight, CurlyArrow, Flower, Target } from "./icons";

// Hero entrances start as the splash bubble clears.
const T = 1500;

const DROP = (rot: number, y = -28) => `translateY(${y}px) rotate(${rot}deg)`;
// Notes settle at a gentler tilt than they fall in at.
const SETTLE = (rot: number) => `rotate(${(rot / 1.8).toFixed(1)}deg)`;

const NOTES = [
  { text: "Reads the docs", color: "var(--ca-mint)" },
  { text: "Ships the thing", color: "var(--ca-yellow-soft)" },
];
const ROLE = "Full-Stack Developer";
const PLACE = "Based in Ethiopia";

const Hero = () => (
  <section
    id="top"
    className="ca-grid relative flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden px-4 pb-12 pt-4 sm:pb-16"
  >
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <PhotoDot src={PORTRAIT_URL} className="absolute left-[12%] top-[52%] -rotate-6" />
      <PhotoDot src={SIDEKICK_URL} className="absolute right-[12%] top-[56%] rotate-6" />
    </div>

    <div className="relative mx-auto flex max-w-5xl flex-col items-center pt-1 text-center sm:pt-2">
      <LensGroup group="name" className="relative flex w-full flex-col items-center">
        <HandLabel>my name is</HandLabel>

        {/* Mobile: notes sit in a row above the name */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
          {NOTES.map((n, i) => (
            <Reveal key={n.text} from={DROP(i ? 7.2 : -7.2)} to={SETTLE(i ? 7.2 : -7.2)} delay={T + 600 + i * 120}>
              <Pill color={n.color}>{n.text}</Pill>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-5">
          <Reveal from="scale(0.55)" delay={T} duration={800}>
            <div className="ca-doodle-box relative inline-block border-[3px] border-ca-orange px-5 py-1 sm:px-10 sm:py-2">
              <Letters
                text="NATNAEL"
                rise={0.7}
                delay={T + 150}
                className="text-[22vw] leading-[0.95] tracking-tight text-ca-ink sm:text-9xl lg:text-[12rem]"
              />
            </div>
          </Reveal>

          {/* Desktop: notes pinned to the corners of the name */}
          <div className="pointer-events-none absolute -inset-x-24 -inset-y-6 hidden lg:block">
            <div className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
              <Reveal from={DROP(-14.4)} to={SETTLE(-14.4)} delay={T + 700}>
                <Pill color={NOTES[0].color}>{NOTES[0].text}</Pill>
              </Reveal>
            </div>
            <div className="pointer-events-auto absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
              <Reveal from={DROP(12.6)} to={SETTLE(12.6)} delay={T + 820}>
                <Pill color={NOTES[1].color}>{NOTES[1].text}</Pill>
              </Reveal>
            </div>
            <div className="pointer-events-auto absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
              <Reveal from={DROP(-7.2, -140)} to={SETTLE(-7.2)} delay={T + 950} duration={900}>
                <span className="relative inline-block">
                  <HandNote color="var(--ca-yellow)">{ROLE}</HandNote>
                  <CurlyArrow className="absolute -right-7 -top-4 -scale-x-100" />
                </span>
              </Reveal>
            </div>
            <div className="pointer-events-auto absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
              <Reveal from={DROP(3.6, -140)} to={SETTLE(3.6)} delay={T + 1080} duration={900}>
                <span className="relative inline-block">
                  <CurlyArrow className="absolute -left-6 -top-6" />
                  <HandNote color="var(--ca-mint)">{PLACE}</HandNote>
                </span>
              </Reveal>
            </div>
          </div>
        </div>

        <p className="ca-mono mt-6 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ca-ink sm:text-sm">
          <span className="h-3 w-3 rounded-full bg-ca-blue" />
          Open to new work and good problems
        </p>
      </LensGroup>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:hidden">
        <Reveal from={DROP(-5.4, -90)} to={SETTLE(-5.4)} delay={T + 700}>
          <HandNote color="var(--ca-yellow)" className="text-xl sm:text-2xl">
            {ROLE}
          </HandNote>
        </Reveal>
        <Reveal from={DROP(3.6, -90)} to={SETTLE(3.6)} delay={T + 820}>
          <HandNote color="var(--ca-mint)" className="text-xl sm:text-2xl">
            {PLACE}
          </HandNote>
        </Reveal>
      </div>

      <h1 className="mt-10 max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight text-ca-ink sm:mt-14 sm:text-6xl">
        I read the docs <Target /> and ship things that work. <Flower />
      </h1>

      <a
        href="#contact"
        className="group/cta ca-mono relative mt-9 inline-flex items-center gap-3 border-2 border-ca-ink bg-ca-ink py-2.5 pl-2.5 pr-6 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-transparent hover:text-ca-ink"
      >
        <span className="flex h-9 w-9 items-center justify-center bg-ca-blue text-ca-ink transition-colors duration-200 group-hover/cta:bg-ca-magenta group-hover/cta:text-ca-blue">
          <ArrowUpRight />
        </span>
        Contact me
      </a>
    </div>
  </section>
);

export default Hero;
