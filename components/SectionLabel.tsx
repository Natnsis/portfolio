import type { Icon } from "@phosphor-icons/react";

const SectionLabel = ({
  icon: IconComp,
  children,
}: {
  icon: Icon;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-6 h-6 rounded-lg bg-accent text-primary flex items-center justify-center shrink-0">
        <IconComp size={13} weight="bold" />
      </span>
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {children}
      </p>
    </div>
  );
};

export default SectionLabel;
