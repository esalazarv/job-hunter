import { ElementType } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface IconProps {
  name: keyof typeof PhosphorIcons;
  className?: string;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export function Icon({ name, className, size = 20, weight = "regular" }: IconProps) {
  const IconComponent = PhosphorIcons[name] as ElementType;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Phosphor Icons`);
    return null;
  }

  return (
    <IconComponent
      className={cn("inline-block", className)}
      size={size}
      weight={weight}
    />
  );
}
