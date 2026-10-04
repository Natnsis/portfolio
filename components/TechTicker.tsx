import { STACK } from "@/lib/site";

const TechTicker = () => (
  <div className="overflow-hidden border-b border-white/12 bg-navy py-7 text-white/60">
    <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
      {[...STACK, ...STACK].map((s, i) => (
        <span
          key={i}
          aria-hidden={i >= STACK.length}
          className="whitespace-nowrap px-7 text-xs uppercase tracking-[.3em]"
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

export default TechTicker;
