import { CREDENTIALS } from "@/lib/credentials";
import { PORTRAIT_URL, RESUME_URL } from "@/lib/site";
import { ArrowDown, ArrowUpRight } from "./icons";

const About = () => (
  <section
    id="about"
    className="bg-mist text-navy gutter-x"
    style={{ paddingBlock: "clamp(80px,12vw,160px)" }}
  >
    <p className="mb-6 eyebrow text-navy/55">About</p>
    <h2
      className="mt-0 max-w-[900px] font-extralight uppercase leading-[1.25] tracking-[.025em] text-pretty"
      style={{ fontSize: "clamp(1.75rem,4vw,4rem)", marginBottom: "clamp(48px,6vw,80px)" }}
    >
      Research before building, <span className="text-navy/80">honest feedback,</span>{" "}
      <span className="text-navy/50">quality software</span>
    </h2>

    <div
      className="grid items-start"
      style={{
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
        gap: "clamp(32px,4vw,64px)",
      }}
    >
      <div className="relative aspect-[4/5] w-full max-w-[420px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PORTRAIT_URL}
          alt="Natnael Sisay"
          className="block h-full w-full object-cover"
        />
        <span className="absolute left-0 -bottom-7 text-[11px] uppercase tracking-[.3em] text-navy/55">
          Natnael Sisay
        </span>
      </div>
      <p className="m-0 text-[17px] font-light leading-[1.7] text-pretty">
        I&apos;m a full-stack developer who researches before building, communicates
        openly, and adapts quickly to whatever the project throws my way. Whether working
        solo or with a team, I bring ideas, honest feedback, and a drive to ship quality
        software.
      </p>
      <div className="flex flex-col items-start gap-8">
        <p className="m-0 text-[17px] font-light leading-[1.7] text-pretty">
          My foundation in computer science, combined with hands-on experience across the
          stack, lets me move from concept to production with confidence.
        </p>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4"
        >
          <span className="text-sm uppercase tracking-[.3em]">Download resume</span>
          <span className="flex size-12 items-center justify-center rounded-full border border-navy/50">
            <ArrowDown />
          </span>
        </a>
      </div>
    </div>

    <div id="credentials" style={{ marginTop: "clamp(80px,10vw,140px)" }}>
      <p className="mb-8 eyebrow text-navy/55">Credentials</p>
      <div className="flex flex-col border-b border-navy/15">
        {CREDENTIALS.map((c) => (
          <a
            key={c.title}
            href={c.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-t border-navy/15 py-7"
          >
            <div
              className="grid items-baseline gap-x-12 gap-y-2"
              style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))" }}
            >
              <span
                className="font-light uppercase tracking-[.03em]"
                style={{ fontSize: "clamp(1.1rem,1.6vw,1.5rem)" }}
              >
                {c.title}
              </span>
              <span className="text-[15px] font-light leading-[1.6] text-navy/70">
                {c.description}
              </span>
            </div>
            <span className="flex size-10 items-center justify-center rounded-full border border-navy/30">
              <ArrowUpRight size={16} />
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default About;
