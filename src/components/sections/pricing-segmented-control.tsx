"use client";

import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(radius.full, "inline-flex bg-surface-muted p-1")}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              radius.full,
              "flex items-center gap-1.5 px-3.5 py-1.5 type-paragraph-m whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
              selected
                ? "bg-surface text-text shadow-subtle"
                : "text-text/60 hover:text-text",
            )}
          >
            {option.label}
            {option.badge ? (
              <span
                className={cn(
                  radius.full,
                  "type-paragraph-s bg-blue-100 px-1.5 py-0.5 text-blue-900",
                )}
              >
                {option.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
