"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LANGUAGES = ["EN", "NL", "FR"] as const;
type Language = (typeof LANGUAGES)[number];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-3 w-3", className)}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language>("EN");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
        className="type-paragraph-m-bold inline-flex h-[1.875rem] items-center gap-1 px-2 text-text transition-colors hover:text-text/70"
      >
        {selected}
        <ChevronDown
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full z-50 mt-2 min-w-[5rem] overflow-hidden rounded-sm border border-dashed border-border bg-background p-1 shadow-subtle"
        >
          {LANGUAGES.map((code) => (
            <li key={code} role="option" aria-selected={code === selected}>
              <button
                type="button"
                onClick={() => {
                  setSelected(code);
                  setOpen(false);
                }}
                className={cn(
                  "type-paragraph-s flex w-full items-center rounded-xs px-3 py-2 text-left transition-colors hover:bg-text/10 focus-visible:bg-text/10 focus-visible:outline-none",
                  code === selected ? "text-text" : "text-text/60",
                )}
              >
                {code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
