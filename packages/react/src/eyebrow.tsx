import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function Eyebrow({
  children,
  className,
  ...rest
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "type-eyebrow border-x border-dashed border-border px-3 text-text",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
