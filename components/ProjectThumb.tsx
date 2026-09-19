const ProjectThumb = ({
  image,
  title,
  variant = "card",
}: {
  image?: string;
  title: string;
  variant?: "card" | "full";
}) => {
  const isFull = variant === "full";

  if (image) {
    return (
      <div
        className={isFull ? "h-full w-full" : "h-32 rounded-[9px] mb-4.5 overflow-hidden"}
        style={{ background: "var(--card-2)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={
        isFull
          ? "h-full w-full grid place-items-center"
          : "h-32 rounded-[9px] grid place-items-center mb-4.5 overflow-hidden"
      }
      style={{ background: "var(--card-2)" }}
    >
      <div className="w-[76%] flex gap-[7px] items-stretch h-[66%]">
        <div
          className="w-[26%] rounded-[4px] p-[7px] flex flex-col gap-[5px]"
          style={{ background: "var(--wire)" }}
        >
          <span className="h-1 rounded-full" style={{ background: "var(--card)" }} />
          <span
            className="h-1 w-[78%] rounded-full"
            style={{ background: "var(--card)" }}
          />
          <span
            className="h-1 w-[62%] rounded-full"
            style={{ background: "var(--card)" }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
          <div className="flex-1 flex gap-1.5">
            <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
            <div className="flex-1 rounded-[4px]" style={{ background: "var(--wire)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectThumb;
