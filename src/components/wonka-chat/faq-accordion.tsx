"use client";

import { useState } from "react";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export interface FaqEntry {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqEntry) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="block w-full py-5 text-left"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="type-body text-text">{question}</span>
        {open
          ? <MinusIcon className="h-4 w-4 shrink-0 text-text/50" />
          : <PlusIcon className="h-4 w-4 shrink-0 text-text/50" />}
      </div>
      {open && <p className="mt-3 type-paragraph-m text-text/65">{answer}</p>}
    </button>
  );
}

export function WonkaChatFaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <div className="divide-y divide-dashed divide-border border-y border-dashed border-border">
      {items.map((item) => (
        <FaqItem key={item.question} {...item} />
      ))}
    </div>
  );
}
