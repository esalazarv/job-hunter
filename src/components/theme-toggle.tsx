"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-sm text-muted-foreground hover:text-foreground"
    >
      <Icon
        name={theme === "light" ? "Moon" : "Sun"}
        className="h-5 w-5"
      />
    </button>
  );
}
