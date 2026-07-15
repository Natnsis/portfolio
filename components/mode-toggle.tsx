"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      aria-label="Toggle theme"
    >
      {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "system" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
    </button>
  );
}
