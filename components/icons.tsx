// Thin-stroke glyphs used throughout the design.
type IconProps = { size?: number; strokeWidth?: number };

const Svg = ({
  size = 18,
  strokeWidth = 1.5,
  d,
}: IconProps & { d: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden
  >
    <path d={d} />
  </svg>
);

export const ArrowRight = (p: IconProps) => <Svg {...p} d="M5 12h14M13 6l6 6-6 6" />;
export const ArrowDown = (p: IconProps) => <Svg {...p} d="M12 5v14M6 13l6 6 6-6" />;
export const ChevronUp = (p: IconProps) => <Svg {...p} d="M6 15l6-6 6 6" />;
export const ArrowUpRight = (p: IconProps) => <Svg {...p} d="M7 17L17 7M9 7h8v8" />;
export const Close = (p: IconProps) => <Svg {...p} d="M6 6l12 12M18 6L6 18" />;

// Filled white disc with a dark arrow — the design's primary call-to-action mark.
export const ArrowDisc = ({ size = 40 }: { size?: number }) => (
  <span
    className="flex items-center justify-center rounded-full bg-white text-gray-800 transition-transform duration-300 group-hover:scale-110"
    style={{ width: size, height: size }}
  >
    <ArrowRight size={16} strokeWidth={1.75} />
  </span>
);
