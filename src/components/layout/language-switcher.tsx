"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  commercialPageFromPathname,
  commercialPath,
  stripLocale,
  UNLISTED_TRANSLATED_PATHS,
  landingPageFromPathname,
  landingPath,
} from "@/i18n/routes";
import { useT, useUiLocale } from "@/i18n/use-t";
import { HREFLANG } from "@/lib/hreflang";
import { hubPath, itemPath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const LANGUAGES = ["en", "fr", "nl"] as const satisfies readonly Locale[];

type HubSection = Parameters<typeof hubPath>[0];

/** First path segment (any locale) → content hub section. */
const HUB_ROOT_SEGMENTS: Record<string, HubSection> = {
  blog: "blog",
  integrations: "connectors",
  learn: "glossary",
  apprendre: "glossary",
  leren: "glossary",
  vs: "comparisons",
  "case-studies": "case-studies",
  "cas-clients": "case-studies",
  klantcases: "case-studies",
};

/**
 * Where the switcher sends a visitor for `target`: the same commercial page,
 * the same content hub root, or otherwise the target locale's home (content
 * items have per-locale slugs; legal and other pages are EN-only).
 */
export function getLanguageSwitchHref(pathname: string, target: Locale): string {
  const page = commercialPageFromPathname(pathname);
  if (page) return commercialPath(page, target);

  const landing = landingPageFromPathname(pathname);
  if (landing) return landingPath(landing, target) ?? commercialPath("home", target);

  const stripped = stripLocale(pathname).replace(/\/+$/, "");
  if (UNLISTED_TRANSLATED_PATHS.has(stripped)) {
    return target === "en" ? stripped : `/${target}${stripped}`;
  }
  const segments = stripped.split("/").filter(Boolean);
  // Team page: translated in all locales but kept out of the commercial routes.
  if (segments.length === 1 && segments[0] === "team") {
    return target === "en" ? "/team" : `/${target}/team`;
  }
  if (segments.length === 1) {
    const section = HUB_ROOT_SEGMENTS[segments[0]];
    if (section) return hubPath(section, target);
  }
  if (segments.length === 2 && segments[0] === "integrations") {
    return itemPath("connectors", target, segments[1]);
  }

  return commercialPath("home", target);
}

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

export function LanguageSwitcher({
  align = "right",
}: {
  /** Which edge the dropdown aligns to. */
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const pathname = usePathname() ?? "/";
  const current = useUiLocale();
  const t = useT();

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
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("shell.language.label")}: ${t(`shell.language.${current}`)}`}
        onClick={() => setOpen((value) => !value)}
        className="type-paragraph-m-bold inline-flex h-[1.875rem] items-center gap-1 px-2 text-text transition-colors hover:text-text/70"
      >
        {current.toUpperCase()}
        <ChevronDown
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Always in the DOM (hidden when closed) so the links stay crawlable. */}
      <ul
        id={listId}
        aria-label={t("shell.language.label")}
        hidden={!open}
        className={cn(
          "absolute top-full z-50 mt-2 min-w-[5rem] overflow-hidden rounded-sm border border-dashed border-border bg-background p-1 shadow-subtle",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        {LANGUAGES.map((code) => {
          const isCurrent = code === current;
          return (
            <li key={code}>
              <a
                href={getLanguageSwitchHref(pathname, code)}
                hrefLang={HREFLANG[code]}
                lang={code}
                aria-label={t(`shell.language.${code}`)}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "type-paragraph-s flex w-full items-center rounded-xs px-3 py-2 text-left transition-colors hover:bg-text/10 focus-visible:bg-text/10 focus-visible:outline-none",
                  isCurrent ? "text-text" : "text-text/60",
                )}
              >
                {code.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
