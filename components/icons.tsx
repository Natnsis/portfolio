// Hand-drawn doodles and chunky glyphs for the "creative artsy" look.
type P = { className?: string };

const STICKER = "overflow-visible [filter:drop-shadow(1px_1.5px_0_rgba(25,21,16,0.28))]";

// Filled nav glyph with a white sticker outline.
const NavGlyph = ({ d, className = "" }: P & { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="#ffffff"
    strokeWidth={3}
    strokeLinejoin="round"
    paintOrder="stroke"
    className={`${STICKER} h-5 w-5 shrink-0 ${className}`}
    aria-hidden
  >
    <path d={d} />
  </svg>
);

export const NavIcons = {
  home: (p: P) => (
    <NavGlyph {...p} d="M12 2l2.9 6.26 6.85.72-5.1 4.62 1.44 6.7L12 17.6l-6.09 3.7 1.44-6.7-5.1-4.62 6.85-.72z" />
  ),
  about: (p: P) => (
    <NavGlyph {...p} d="M12 3a3.6 3.6 0 100 7.2A3.6 3.6 0 0012 3zM4.8 20a7.2 7.2 0 0114.4 0z" />
  ),
  work: (p: P) => <NavGlyph {...p} d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
  projects: (p: P) => <NavGlyph {...p} d="M12 2l10 10-10 10L2 12z" />,
};

export const Smiley = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 24 24" className={`${STICKER} ${className}`} aria-hidden>
    <circle cx="12" cy="12" r="10" fill="var(--ca-magenta)" stroke="#fff" strokeWidth="2.5" paintOrder="stroke" />
    <circle cx="8.5" cy="10.5" r="1.35" fill="#fff" />
    <circle cx="15.5" cy="10.5" r="1.35" fill="#fff" />
    <path d="M8 14Q12 18 16 14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BrandIcons: Record<string, (p: P) => React.ReactElement> = {
  GitHub: ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  LinkedIn: ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Telegram: ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  X: ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
};

export const Heart = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 22" fill="currentColor" className={className} aria-hidden>
    <path d="M12 21C5 16 1 12 1 7.5 1 4 3.6 1.5 6.8 1.5c2 0 3.9 1 5.2 2.6 1.3-1.6 3.2-2.6 5.2-2.6C20.4 1.5 23 4 23 7.5 23 12 19 16 12 21Z" />
  </svg>
);

export const Menu = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className={className} aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const Close = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowUpRight = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={className} aria-hidden>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={className} aria-hidden>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const Sparkle = ({ className = "h-3 w-3 sm:h-4 sm:w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z" />
  </svg>
);

export const Bolt = ({ className = "h-3.5 w-3.5" }: P) => (
  <svg viewBox="0 0 24 24" fill="var(--ca-yellow)" stroke="var(--ca-ink)" strokeWidth={1.5} className={className} aria-hidden>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

// Double pencil underline beneath hand-written labels.
export const Underline = ({ className = "mt-1 h-3 w-20" }: P) => (
  <svg viewBox="0 0 64 12" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className={className} aria-hidden>
    <path d="M3 4c18-3 40-3 58 0" />
    <path d="M9 9c14-2.5 32-2.5 46 0" />
  </svg>
);

export const CurlyArrow = ({ className = "" }: P) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="var(--ca-ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={`h-8 w-8 ${className}`} aria-hidden>
    <path d="M34 33 C 25 24, 15 21, 9 9" />
    <path d="M8 21 L 7 7 L 21 11" />
  </svg>
);

const INLINE = "inline-block align-[-0.08em] ca-spin-slow h-[0.85em] w-[0.85em]";

export const Target = () => (
  <svg viewBox="0 0 40 40" className={INLINE} aria-hidden>
    <circle cx="20" cy="20" r="18" fill="var(--ca-green)" stroke="var(--ca-ink)" strokeWidth="2" />
    <circle cx="20" cy="20" r="11" fill="var(--ca-surface)" />
    <circle cx="20" cy="20" r="5" fill="var(--ca-green)" />
    <circle cx="14" cy="9" r="2.4" fill="var(--ca-ink)" />
  </svg>
);

export const Flower = () => (
  <svg viewBox="0 0 40 40" className={INLINE} aria-hidden>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
      <ellipse key={r} cx="20" cy="8" rx="4.6" ry="8" fill="var(--ca-magenta)" transform={`rotate(${r} 20 20)`} />
    ))}
    <circle cx="20" cy="20" r="4" fill="var(--ca-ink)" />
  </svg>
);

export const BigFace = ({ className = "h-52 w-52 sm:h-64 sm:w-64" }: P) => (
  <svg viewBox="0 0 200 200" className={`overflow-visible ${className}`} aria-hidden>
    <circle cx="100" cy="100" r="88" fill="var(--ca-yellow)" stroke="var(--ca-ink)" strokeWidth="3" />
    <circle cx="56" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
    <circle cx="144" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
    <g className="ca-blink">
      <rect x="65" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
      <rect x="119" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
    </g>
    <path d="M62 130 Q100 172 138 130" fill="none" stroke="var(--ca-ink)" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// Thin sweeping pencil line between sections.
export const CurveDivider = ({ className = "" }: P) => (
  <svg viewBox="0 0 1440 130" fill="none" preserveAspectRatio="none" className={`h-16 w-full sm:h-24 ${className}`} aria-hidden>
    <path d="M-10 120C420 10 1030 4 1450 80" stroke="var(--ca-tick)" strokeWidth="1.5" />
  </svg>
);
