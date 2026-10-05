import { PORTRAIT_URL, RESUME_URL, SIDEKICK_URL } from "@/lib/site";
import { Polaroid, ROUGH } from "./artsy/Bits";
import Reveal from "./artsy/Reveal";
import { ArrowDown, CurveDivider } from "./icons";

const PHOTOS = [
  { src: PORTRAIT_URL, caption: "that's me" },
  { src: SIDEKICK_URL, caption: "the coworker" },
];

// Chip color, label color, and the two emoji it flips between.
const SKILLS = [
  { label: "Full-Stack Web", bg: "var(--ca-yellow)", fg: "text-ca-ink", emoji: ["✨", "🌐"] },
  { label: "Go Backends", bg: "var(--ca-green)", fg: "text-white", emoji: ["⚙️", "🐹"] },
  { label: "Mobile Apps", bg: "var(--ca-magenta)", fg: "text-white", emoji: ["📱", "🧩"] },
  { label: "Bots & Tools", bg: "var(--ca-blue)", fg: "text-ca-ink", emoji: ["🤖", "🛠️"] },
];

const About = () => (
  <section id="about" className="ca-grid relative scroll-mt-24 px-4 pb-20 sm:pb-28">
    <CurveDivider className="-mx-4 w-[calc(100%+2rem)]" />
    <p className="ca-hand pl-[8%] text-2xl text-ca-ink sm:text-3xl">about me!</p>

    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      <Reveal
        from="translateY(-28px) rotate(-12.6deg)"
        to="rotate(-7deg)"
        className="absolute left-[3%] top-[36%] w-56 xl:left-[5%] xl:w-64"
      >
        <Polaroid {...PHOTOS[0]} className="pointer-events-auto w-full" />
      </Reveal>
      <Reveal
        from="translateY(-28px) rotate(14.4deg)"
        to="rotate(8deg)"
        delay={120}
        className="absolute right-[3%] top-[20%] w-56 xl:right-[5%] xl:w-64"
      >
        <Polaroid {...PHOTOS[1]} className="pointer-events-auto w-full" />
      </Reveal>
    </div>

    <div className="relative z-10 mx-auto mt-10 max-w-5xl sm:mt-16">
      <div className="flex flex-col items-center text-center">
        <div className="ca-doodle-box relative inline-block border-2 border-ca-ink px-5 py-2">
          <span className="text-3xl font-medium text-ca-ink sm:text-4xl">what&apos;s up</span>
        </div>

        <Reveal from="translateY(28px)" className="mt-10">
          <p className="ca-hand mx-auto max-w-3xl text-3xl font-medium leading-[1.2] text-ca-ink sm:text-4xl lg:text-5xl">
            I&apos;m a full-stack developer who researches before building, communicates
            openly, and adapts fast to whatever the project throws at me.{" "}
            <span aria-hidden>✨</span> Solo or with a team, I bring ideas, honest feedback,
            and a real drive to ship quality software. <span aria-hidden>🛠️</span>
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center gap-6 lg:hidden">
          <Polaroid {...PHOTOS[0]} className="w-40 -rotate-3" />
          <Polaroid {...PHOTOS[1]} className="w-40 rotate-3" />
        </div>

        <div className="mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:mt-14">
          {SKILLS.map((s, i) => (
            <Reveal key={s.label} from="scale(0.8)" delay={i * 90} className="flex items-center gap-3">
              <span
                className={`inline-flex h-14 items-center px-6 text-2xl font-semibold tracking-tight sm:h-[4.5rem] sm:px-8 sm:text-3xl ${s.fg}`}
                style={{ backgroundColor: s.bg, clipPath: ROUGH[i % 3] }}
              >
                {s.label}
              </span>
              <span
                aria-hidden
                className="relative inline-block h-14 w-14 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]"
                style={{ backgroundColor: s.bg, clipPath: ROUGH[(i + 1) % 3] }}
              >
                <span className="ca-emoji-a absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl">
                  {s.emoji[0]}
                </span>
                <span className="ca-emoji-b absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl">
                  {s.emoji[1]}
                </span>
              </span>
            </Reveal>
          ))}
        </div>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ca-mono mt-12 inline-flex items-center gap-2.5 border-b-2 border-ca-ink pb-1 text-sm font-bold uppercase tracking-[0.2em] text-ca-ink transition-transform duration-200 hover:translate-x-1"
        >
          Grab my resume
          <ArrowDown />
        </a>
      </div>
    </div>
  </section>
);

export default About;
