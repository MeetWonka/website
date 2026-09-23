import type { ReactNode } from "react";
import { cn } from "./lib/cn";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-text/10 bg-surface-muted px-3 py-1 text-xs font-medium text-text",
        className,
      )}
    >
      {children}
    </span>
  );
}
