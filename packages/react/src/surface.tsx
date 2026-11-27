import type { HTMLAttributes, ReactNode } from "react";
import { radius } from "./design-tokens";
import { cn } from "./lib/cn";
import { Section } from "./section";

export type SurfaceVariant = "card" | "panel" | "callout" | "pill";

const surfaceRadius: Record<SurfaceVariant, string> = {
  card: radius.sm,
  panel: radius.sm,
  callout: radius.xs,
  pill: radius.full,
};

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  children: ReactNode;
}

export function Surface({
  variant = "card",
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <div
      className={cn(
        surfaceRadius[variant],
        variant === "panel" && "relative overflow-hidden",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface WidePanelProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  sectionClassName?: string;
}

export function WidePanel({
  children,
  className,
  innerClassName,
  sectionClassName,
}: WidePanelProps) {
  return (
    <Section wide className={sectionClassName}>
      <Surface variant="panel" className={cn(className, innerClassName)}>
        {children}
      </Surface>
    </Section>
  );
}
