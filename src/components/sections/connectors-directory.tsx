"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface ConnectorsDirectoryItem {
  id: string;
  href: string;
  toolName: string;
  description: string;
  tags: string[];
  logoSrc: string | null;
  logoAlt: string;
}

interface ConnectorsDirectoryProps {
  title: string;
  searchPlaceholder: string;
  emptyLabel: string;
  items: ConnectorsDirectoryItem[];
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function ConnectorsDirectory({ title, searchPlaceholder, emptyLabel, items }: ConnectorsDirectoryProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((item) =>
      normalize([item.toolName, item.description, ...item.tags].join(" ")).includes(q),
    );
  }, [items, query]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h2 className="type-h5">{title}</h2>
          <span className="type-paragraph-s text-text/45">{filtered.length}</span>
        </div>
        <label className={cn("flex h-11 w-full items-center gap-2 border border-border bg-background px-4 sm:w-80", radius.full)}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4 shrink-0 text-text/40">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="type-paragraph-m w-full bg-transparent text-text outline-none placeholder:text-text/40"
          />
        </label>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn("group flex min-h-40 flex-col border border-border p-5 transition-colors hover:border-accent", radius.sm)}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={cn("grid size-10 shrink-0 place-items-center border border-border bg-background", radius.sm)}>
                  {item.logoSrc ? (
                    <Image src={item.logoSrc} alt={item.logoAlt} width={24} height={24} unoptimized className="size-6 object-contain" />
                  ) : (
                    <span className="type-paragraph-m-bold text-text/40">{item.toolName.slice(0, 1)}</span>
                  )}
                </div>
                <h3 className="type-body font-medium group-hover:text-accent">{item.toolName}</h3>
              </div>
              <p className="line-clamp-3 type-paragraph-m text-text/60">{item.description}</p>
              {item.tags.length ? (
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-mid-gray px-2 py-1 type-eyebrow text-text/40">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      ) : (
        <p className="type-body py-10 text-text/45">{emptyLabel}</p>
      )}
    </div>
  );
}
