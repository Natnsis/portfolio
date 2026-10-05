import { NAV, navHref, RESUME_URL } from "@/lib/site";
import { SocialDots } from "./artsy/Bits";
import { CurveDivider } from "./icons";

const LINK =
  "ca-mono px-3.5 py-2 text-sm font-bold uppercase tracking-widest text-ca-ink transition-colors hover:bg-ca-blue";

const Footer = ({ onHome = true }: { onHome?: boolean }) => (
  <footer className="ca-grid relative">
    <CurveDivider />
    <div className="px-4 pb-10 pt-6 sm:px-8 lg:px-20">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="ca-display text-6xl uppercase leading-none tracking-tight text-ca-ink sm:text-8xl">
            Natnael Sisay
          </p>
          <p className="ca-mono mt-4 inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-ca-ink">
            <span className="h-3 w-3 rounded-full bg-ca-blue" />
            Full-Stack Developer
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <nav className="flex flex-wrap gap-1">
            {NAV.filter((l) => l.key !== "home").map((l) => (
              <a key={l.key} href={navHref(l, onHome)} className={LINK}>
                {l.label}
              </a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              Resume
            </a>
          </nav>
          <SocialDots size="h-11 w-11" icon="h-[18px] w-[18px]" className="gap-3" />
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-3 text-sm text-ca-ink/70 sm:flex-row">
        <span>© {new Date().getFullYear()} Natnael Sisay</span>
        <a
          href="#top"
          className="ca-mono inline-flex items-center gap-1.5 rounded-full bg-ca-chrome px-3.5 py-2 font-bold uppercase tracking-wide text-ca-ink transition-opacity hover:opacity-80"
        >
          ✦ Back to top
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
