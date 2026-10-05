import { EMAIL, PORTRAIT_URL } from "@/lib/site";
import { TapeCorners, TapeFlat } from "./artsy/Bits";
import LensGroup from "./artsy/Lens";
import Letters from "./artsy/Letters";
import Reveal from "./artsy/Reveal";
import { ArrowUpRight, BigFace, Bolt } from "./icons";

const Contact = () => (
  <section id="contact" className="ca-grid relative scroll-mt-24">
    <LensGroup
      group="talk"
      className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 pb-4 pt-16 text-center sm:gap-6 sm:pt-20"
    >
      <Reveal from="scale(0.85)">
        <BigFace />
      </Reveal>
      <Letters
        text="Let's talk"
        className="text-7xl uppercase leading-[0.9] tracking-tight text-ca-ink sm:text-9xl"
      />
      <Reveal from="translateY(28px)">
        <p className="ca-hand mx-auto max-w-xl text-2xl leading-snug text-ca-ink/80 sm:text-3xl">
          Got a project in mind, a hard problem, or just want to say hi? Send it over. I read
          every message.
        </p>
      </Reveal>
    </LensGroup>

    <div className="px-4 pb-20 pt-10 sm:px-8 lg:px-20">
      <div className="relative mx-auto max-w-4xl">
        <Reveal
          from="translateY(28px)"
          className="relative z-20 mb-6 flex justify-center lg:absolute lg:-left-24 lg:-top-14 lg:mb-0 lg:block lg:w-80"
        >
          <div className="relative w-full max-w-sm -rotate-2 bg-ca-cyan p-5 pt-6 shadow-[2px_6px_18px_rgba(17,18,18,0.22)]">
            <TapeCorners left="bg-ca-yellow-soft/70" right="bg-ca-pink-soft/70" />
            <div className="flex items-start gap-3 text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT_URL}
                alt="Natnael Sisay"
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-ca-ink">Natnael Sisay</p>
                <p className="mt-1 text-sm leading-relaxed text-ca-ink/75">
                  Open to freelance work, full-time roles, and good conversations about hard
                  problems.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-ca-blue px-2.5 py-1 text-xs font-bold text-ca-ink">
                  <Bolt />1
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <a href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`} className="group block">
          <TapeFlat w="w-28" tilt={8} tone="bg-white/60" />
          <div className="ca-doodle-box relative flex flex-col items-center gap-2 border-[3px] border-ca-ink bg-ca-yellow px-6 py-16 text-center shadow-[8px_12px_0_var(--ca-ink)] sm:gap-3 sm:py-24">
            <p className="ca-hand text-3xl text-ca-ink sm:text-4xl">let&apos;s build something together</p>
            <span className="ca-display text-7xl uppercase leading-none tracking-tight text-ca-ink sm:text-[9rem]">
              CONTACT
            </span>
            <span className="ca-mono mt-3 inline-flex max-w-full items-center gap-2 break-all border-b-2 border-ca-ink pb-1 text-sm font-bold uppercase tracking-[0.2em] text-ca-ink transition-transform duration-200 group-hover:translate-x-1">
              {EMAIL}
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
