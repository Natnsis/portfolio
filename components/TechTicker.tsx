const TICKER = [
  "TS/JS",
  "Golang",
  "Node/Express",
  "React/Next",
  "shadcn/ui",
  "Zod",
  "Zustand",
  "TanStack Query",
  "Svelte",
  "Prisma",
  "GORM",
  "Gin",
  "React Native",
  "Flutter",
  "Neovim",
];

const Row = () => (
  <div
    className="flex gap-[34px] pr-[34px] shrink-0"
    style={{ animation: "marquee 26s linear infinite" }}
  >
    {TICKER.map((t, i) => (
      <span
        key={i}
        className="text-[13px] font-semibold whitespace-nowrap"
        style={{ color: "var(--ink-3)" }}
      >
        {t}
      </span>
    ))}
  </div>
);

const TechTicker = () => {
  return (
    <div
      className="flex overflow-hidden border-y py-[13px] mb-11"
      style={{
        borderColor: "var(--line)",
        WebkitMaskImage:
          "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
        maskImage:
          "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
      }}
    >
      <Row />
      <Row />
    </div>
  );
};

export default TechTicker;
