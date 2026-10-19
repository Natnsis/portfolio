import { ArrowUpRight, DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { CREDENTIALS } from "@/lib/credentials";
import { EMAIL, PORTRAIT_URL, PROJECTS_PATH, RESUME_URL, SOCIALS, STACK } from "@/lib/site";
import TerminalLink from "./TerminalLink";

const DISCIPLINES = ["Full-stack web", "Go backends", "Mobile apps", "Bots & tools"];

export const TopBar = ({ home = true }: { home?: boolean }) => (
  <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6 text-[14px]">
    <Link href="/ui" className="font-serif text-xl">
      Natnael Sisay
    </Link>
    <nav className="flex items-center gap-5 text-dk-mute">
      {home ? (
        <Link href={PROJECTS_PATH} className="hover:text-dk-cream">
          Projects
        </Link>
      ) : (
        <Link href="/ui" className="hover:text-dk-cream">
          Home
        </Link>
      )}
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hover:text-dk-cream">
        Resume
      </a>
      <TerminalLink className="hidden font-mono text-[13px] hover:text-dk-cream sm:inline">&gt;_ terminal</TerminalLink>
    </nav>
  </header>
);

export const Intro = () => (
  <section id="about" className="mx-auto max-w-3xl px-5 pb-14 pt-8 sm:pt-14">
    <div className="flex items-center gap-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PORTRAIT_URL}
        alt="Natnael Sisay"
        className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10"
      />
      <div>
        <h1 className="font-serif text-4xl leading-none sm:text-5xl">Natnael Sisay</h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-dk-mute">
          Full-stack developer in Ethiopia
          <span className="inline-flex items-center gap-1.5 text-dk-live">
            <span className="h-1.5 w-1.5 rounded-full bg-dk-live" />
            Open to new work
          </span>
        </p>
      </div>
    </div>

    <p className="mt-8 font-serif text-[1.65rem] leading-snug text-dk-cream sm:text-3xl">
      I read the docs and ship things that work.
    </p>
    <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-dk-mute">
      I&apos;m a full-stack developer who researches before building, communicates openly, and adapts fast to whatever
      the project throws at me. Solo or with a team, I bring ideas, honest feedback, and a real drive to ship quality
      software.
    </p>

    <ul className="mt-5 flex flex-wrap gap-2">
      {DISCIPLINES.map((d) => (
        <li key={d} className="rounded-full border border-dk-line bg-dk-wood px-3 py-1 text-[13px] text-dk-cream/85">
          {d}
        </li>
      ))}
    </ul>

    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[14px] rounded-full bg-dk-amber/15 px-4 py-2 font-medium text-[#f2c38c] ring-1 ring-dk-amber/45 transition-colors hover:bg-dk-amber/25"
      >
        <DownloadSimple size={16} /> Download resume
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center gap-2 text-[14px] rounded-full bg-dk-sky/10 px-4 py-2 font-medium text-dk-sky ring-1 ring-dk-sky/30 transition-colors hover:bg-dk-sky/20"
      >
        <EnvelopeSimple size={16} /> Email me
      </a>
    </div>
  </section>
);

const Heading = ({ children, note }: { children: React.ReactNode; note?: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-dk-line pb-3">
    <h2 className="font-serif text-3xl">{children}</h2>
    {note && <span className="font-mono text-[12px] text-dk-faint">{note}</span>}
  </div>
);

export const Toolkit = () => (
  <section className="mx-auto max-w-3xl px-5 pt-20">
    <Heading note={`${STACK.length} tools`}>What I reach for</Heading>
    <ul className="mt-5 flex flex-wrap gap-2">
      {STACK.map((s) => (
        <li key={s} className="px-2.5 py-1.5 text-[13px] rounded-md bg-black/30 font-mono text-dk-cream/85 ring-1 ring-white/10">
          {s}
        </li>
      ))}
    </ul>
  </section>
);

export const Credentials = () => (
  <section id="credentials" className="mx-auto max-w-3xl px-5 pt-20">
    <Heading note={`${CREDENTIALS.length} documents`}>Credentials</Heading>
    <ul className="divide-y divide-dk-line">
      {CREDENTIALS.map((c) => (
        <li key={c.title}>
          <a
            href={c.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 py-4"
          >
            <span>
              <span className="block text-[16px] text-dk-cream group-hover:text-dk-sky">{c.title}</span>
              <span className="mt-0.5 block text-[14px] text-dk-mute">{c.description}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[12px] text-dk-faint group-hover:text-dk-sky">
              PDF <ArrowUpRight size={12} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export const Contact = () => (
  <footer id="contact" className="mx-auto max-w-3xl px-5 pb-16 pt-24">
    <div className="rounded-2xl border border-dk-line bg-dk-wood p-7 sm:p-10">
      <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
        Let&apos;s build something <span className="text-dk-sky">together.</span>
      </h2>
      <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-dk-mute">
        Got a project in mind, a hard problem, or just want to say hi? Send it over. I read every message. Open to
        freelance work, full-time roles, and good conversations about hard problems.
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-6 inline-block text-lg text-dk-sky underline decoration-dk-sky/50 underline-offset-4 transition-colors hover:decoration-dk-sky sm:text-xl"
      >
        {EMAIL}
      </a>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-dk-mute">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-dk-cream">
            {s.label} <ArrowUpRight size={12} />
          </a>
        ))}
      </div>
    </div>
    <p className="mt-8 text-center text-[13px] text-dk-faint">© {new Date().getFullYear()} Natnael Sisay</p>
  </footer>
);
