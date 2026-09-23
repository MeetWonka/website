"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const TRIGGER_RATIO = 0.4;

const LOGOS: { src: string; alt: string }[] = [
  { src: "/images/problem/openai.svg", alt: "OpenAI" },
  { src: "/images/problem/claude.svg", alt: "Claude" },
  { src: "/images/problem/gemini.svg", alt: "Gemini" },
  { src: "/images/problem/perplexity.svg", alt: "Perplexity" },
];

function LogoCluster() {
  return (
    <span className="inline-flex shrink-0 items-center align-middle">
      {LOGOS.map((logo, i) => (
        <span
          key={logo.alt}
          className="relative inline-block aspect-square w-[clamp(2.25rem,4.5vw,3.75rem)] shrink-0"
          style={{
            marginLeft: i === 0 ? 0 : "-0.75rem",
            zIndex: LOGOS.length - i,
          }}
        >
          <Image src={logo.src} alt={logo.alt} fill sizes="60px" />
        </span>
      ))}
    </span>
  );
}

interface Item {
  tag: "h2" | "p";
  content: ReactNode;
}

export type { Item as ProblemItem };

const ITEMS: Item[] = [
  {
    tag: "h2",
    content: (
      <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span>Your AI</span>
        <LogoCluster />
        <span>works great.</span>
      </span>
    ),
  },
  { tag: "p", content: "For the 12 people who know how to use it." },
  {
    tag: "p",
    content:
      "For everyone else, work still moves the way it did ten years ago.",
  },
  { tag: "p", content: "By hand. By memory. When someone remembers." },
  {
    tag: "p",
    content: "One person finds a better way. But it stays with them.",
  },
];

export function Problem({ id, items: itemsProp }: { id?: string; items?: Item[] }) {
  const items = itemsProp ?? ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const target = window.innerHeight * TRIGGER_RATIO;
      let bestIdx = 0;
      let bestDistance = Infinity;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = i;
        }
      }
      setActiveIndex((prev) => (prev !== bestIdx ? bestIdx : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <Section
      id={id}
      className="bg-background pt-[15vh] pb-[14vh] md:pt-[30vh] md:pb-[18vh]"
      containerClassName="flex max-w-[42.3125rem] flex-col gap-6 md:gap-8"
      aria-label="Problem"
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        const className = cn(
          "type-h2 w-full text-text transition-opacity duration-300 ease-out",
          isActive ? "opacity-100" : "opacity-[0.08]",
        );

        if (item.tag === "h2") {
          return (
            <h2
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={className}
            >
              {item.content}
            </h2>
          );
        }

        return (
          <p
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={className}
          >
            {item.content}
          </p>
        );
      })}
    </Section>
  );
}
