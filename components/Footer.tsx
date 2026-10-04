import { SOCIALS } from "@/lib/site";

const Footer = ({ topHref = "#top" }: { topHref?: string }) => (
  <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-xs uppercase tracking-[.2em] text-white/60">
    <span>© {new Date().getFullYear()} Natnael Sisay</span>
    <div className="flex flex-wrap gap-8">
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
          {s.label}
        </a>
      ))}
    </div>
    <a href={topHref}>Back to top</a>
  </footer>
);

export default Footer;
