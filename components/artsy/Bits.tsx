// Small paper-craft pieces shared across sections.
import { SOCIALS } from "@/lib/site";
import { BrandIcons, Underline } from "../icons";

// Torn-paper edges for skill chips.
export const ROUGH = [
  "polygon(2% 6%, 12% 0%, 25% 4%, 40% 1%, 55% 5%, 70% 0%, 85% 4%, 98% 1%, 96% 15%, 100% 30%, 97% 45%, 100% 60%, 96% 75%, 99% 90%, 97% 98%, 85% 96%, 70% 100%, 55% 96%, 40% 100%, 25% 95%, 12% 100%, 3% 97%, 1% 85%, 4% 70%, 0% 55%, 3% 40%, 0% 25%, 2% 12%)",
  "polygon(1% 8%, 10% 2%, 22% 6%, 35% 0%, 48% 5%, 62% 1%, 76% 6%, 90% 1%, 99% 6%, 97% 20%, 100% 35%, 98% 50%, 100% 66%, 97% 80%, 99% 94%, 88% 98%, 74% 94%, 60% 99%, 46% 95%, 32% 100%, 18% 96%, 6% 99%, 2% 88%, 5% 74%, 1% 60%, 4% 46%, 0% 32%, 3% 18%)",
  "polygon(3% 3%, 16% 1%, 28% 5%, 44% 0%, 58% 4%, 72% 1%, 84% 5%, 97% 2%, 100% 18%, 96% 32%, 100% 48%, 97% 64%, 100% 80%, 96% 94%, 98% 99%, 84% 95%, 68% 100%, 52% 96%, 38% 100%, 22% 95%, 8% 99%, 1% 92%, 4% 78%, 0% 62%, 3% 48%, 0% 34%, 4% 20%, 1% 8%)",
];

export const TAPE_STRIP_CLIP =
  "polygon(2% 10%, 40% 4%, 98% 8%, 96% 30%, 100% 50%, 96% 70%, 99% 92%, 60% 96%, 8% 93%, 4% 71%, 0% 50%, 4% 30%)";

// Clipped-corner label, like a luggage tag.
export const TAG = "ca-mono px-4 pb-2 pt-2.5 font-bold uppercase tracking-wide [clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)]";

const TAPE = "absolute z-10 shadow-[0_1px_3px_rgba(17,18,18,0.15)]";

// Two crossed bits of washi tape pinning the top corners.
export const TapeCorners = ({
  left = "bg-ca-cyan/70",
  right = "bg-ca-yellow-soft/70",
}: {
  left?: string;
  right?: string;
}) => (
  <>
    <span aria-hidden className={`${TAPE} -left-4 -top-2 h-5 w-16 -rotate-[38deg] ${left}`} />
    <span aria-hidden className={`${TAPE} -right-4 -top-2 h-5 w-16 rotate-[38deg] ${right}`} />
  </>
);

// Wider, flatter tape used on big image frames.
export const TapeFlat = ({ w = "w-24", tilt = 9, tone = "bg-white/55" }) => (
  <>
    <span
      aria-hidden
      className={`${TAPE} -left-5 -top-3 h-6 ${w} ${tone}`}
      style={{ transform: `rotate(-${tilt}deg)` }}
    />
    <span
      aria-hidden
      className={`${TAPE} -right-5 -top-3 h-6 ${w} ${tone}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    />
  </>
);

export const Polaroid = ({
  src,
  caption,
  className = "",
}: {
  src: string;
  caption: string;
  className?: string;
}) => (
  <figure
    className={`relative inline-block bg-white p-2 pb-1 shadow-[0_6px_18px_rgba(17,18,18,0.22)] ${className}`}
  >
    <TapeCorners />
    <div className="aspect-[4/5] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />
    </div>
    <figcaption className="ca-hand mt-1 text-center text-lg leading-tight text-ca-ink/70">
      {caption}
    </figcaption>
  </figure>
);

// Hand-written sticky label ("Full-Stack Developer").
export const HandNote = ({
  children,
  color,
  className = "text-2xl",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) => (
  <span
    className={`ca-hand inline-block px-4 py-2 leading-snug text-ca-ink shadow-[2px_3px_8px_rgba(17,18,18,0.18)] ${className}`}
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);

// White-rimmed rounded sticker ("Reads the docs").
export const Pill = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <span
    className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-ca-ink shadow-[0_4px_10px_rgba(25,21,16,0.25)]"
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);

export const HandLabel = ({
  children,
  underline = "w-20",
  className = "",
}: {
  children: React.ReactNode;
  underline?: string;
  className?: string;
}) => (
  <div className={`flex flex-col items-center text-ca-ink ${className}`}>
    <p className="ca-hand text-2xl sm:text-3xl">{children}</p>
    <Underline className={`mt-1 h-3 ${underline}`} />
  </div>
);

const DOT_COLORS = ["var(--ca-yellow)", "var(--ca-magenta)", "var(--ca-green)", "var(--ca-cyan)"];

export const SocialDots = ({ size = "h-10 w-10", icon = "h-4 w-4", className = "" }) => (
  <div className={`flex gap-2 ${className}`}>
    {SOCIALS.map((s, i) => {
      const Icon = BrandIcons[s.label];
      return (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`flex ${size} items-center justify-center rounded-full border-2 border-white text-ca-ink shadow-[1.5px_1.5px_0_rgba(25,21,16,0.25)] transition-transform duration-200 hover:-translate-y-0.5`}
          style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
        >
          <Icon className={icon} />
        </a>
      );
    })}
  </div>
);

// Orange-ringed round photo floating beside the hero.
export const PhotoDot = ({ src, className = "" }: { src: string; className?: string }) => (
  <span className={`flex h-20 w-20 items-center justify-center rounded-full bg-ca-orange p-1.5 ${className}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="" loading="lazy" className="h-full w-full rounded-full object-cover" />
  </span>
);
