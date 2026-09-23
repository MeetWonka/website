import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/cn";

export type SectionTag =
  | "section"
  | "header"
  | "footer"
  | "main"
  | "div"
  | "nav"
  | "aside";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: SectionTag;
  children: ReactNode;
  containerClassName?: string;
  fluid?: boolean;
  wide?: boolean;
}

export function Section({
  as: Tag = "section",
  children,
  className,
  containerClassName,
  fluid = false,
  wide = false,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(wide ? "px-2" : "px-6 md:px-8 lg:px-12", className)}
      {...rest}
    >
      <div
        className={cn(
          "mx-auto w-full",
          !fluid && (wide ? "max-w-[89rem]" : "max-w-[84rem]"),
          containerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
