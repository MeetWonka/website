"use client";

import Link from "next/link";
import { useState } from "react";
import type { FaqItem } from "@/lib/types";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FaqAccordionItem({ question, answer, link }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="type-body text-text">{question}</span>
        {open ? (
          <MinusIcon className="h-4 w-4 shrink-0 text-text/50" />
        ) : (
          <PlusIcon className="h-4 w-4 shrink-0 text-text/50" />
        )}
      </button>
      {open ? (
        <p className="mt-3 type-paragraph-m text-text/65">
          {answer}
          {link ? (
            <>
              {" "}
              <Link
                href={link.href}
                className="text-text underline underline-offset-4 hover:text-text/70"
              >
                {link.label}
              </Link>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-dashed divide-border border-y border-dashed border-border">
      {items.map((item) => (
        <FaqAccordionItem
          key={item._key ?? item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
