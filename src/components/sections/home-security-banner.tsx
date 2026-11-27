import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { SecurityPoint, SecurityTileId } from "@/views/copy/home-v2";

const round = (n: number) => Math.round(n * 100) / 100;

export function SecurityTileVisual({
  id,
  onPanel = false,
}: {
  id: SecurityTileId;
  onPanel?: boolean;
}) {
  const iconSize = onPanel ? "size-14 md:size-16" : "size-16";

  if (id === "iso" || id === "gdpr") {
    const Badge = id === "iso" ? BadgeIso : BadgeGdpr;
    if (onPanel) {
      return <Badge className={cn(iconSize, "shrink-0")} />;
    }
    return (
      <span className="flex size-16 items-center justify-center rounded-full bg-black">
        <Badge className="size-12" />
      </span>
    );
  }
  if (id === "eu") {
    const star =
      "M0 -2.35 L0.62 -0.72 L2.24 -0.72 L0.9 0.28 L1.45 2.05 L0 1.12 L-1.45 2.05 L-0.9 0.28 L-2.24 -0.72 L-0.62 -0.72 Z";
    return (
      <svg viewBox="0 0 64 64" className={iconSize} aria-hidden>
        <circle
          cx="32"
          cy="32"
          r="31"
          fill={onPanel ? "rgba(255,255,255,0.12)" : "var(--color-blue-800)"}
          stroke={onPanel ? "rgba(255,255,255,0.35)" : "none"}
          strokeWidth="1.5"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const cx = round(32 + Math.cos(a) * 18);
          const cy = round(32 + Math.sin(a) * 18);
          return (
            <path
              key={i}
              d={star}
              fill="white"
              transform={`translate(${cx} ${cy})`}
            />
          );
        })}
      </svg>
    );
  }
  if (id === "deploy") {
    return (
      <svg viewBox="0 0 64 64" className={iconSize} aria-hidden>
        <circle
          cx="32"
          cy="32"
          r="31"
          fill={onPanel ? "rgba(255,255,255,0.12)" : "var(--color-blue-800)"}
          stroke={onPanel ? "rgba(255,255,255,0.35)" : "none"}
          strokeWidth="1.5"
        />
        <path
          d="M23 41h18.5a6.5 6.5 0 0 0 .9-12.94A9 9 0 0 0 25 27.5a7 7 0 0 0-2 13.5z"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "encryption") {
    return (
      <svg viewBox="0 0 64 64" className={iconSize} aria-hidden>
        <circle
          cx="32"
          cy="32"
          r="31"
          fill={onPanel ? "rgba(255,255,255,0.12)" : "var(--color-black)"}
          stroke={onPanel ? "rgba(255,255,255,0.35)" : "none"}
          strokeWidth="1.5"
        />
        <rect
          x="21"
          y="29"
          width="22"
          height="17"
          rx="4"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          d="M25 29v-5a7 7 0 0 1 14 0v5"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        />
        <circle
          cx="32"
          cy="37.5"
          r="2.2"
          fill={onPanel ? "white" : "var(--color-blue-400)"}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={iconSize} aria-hidden>
      <circle
        cx="32"
        cy="32"
        r="31"
        fill={onPanel ? "rgba(255,255,255,0.15)" : "var(--color-blue-100)"}
        stroke={onPanel ? "rgba(255,255,255,0.35)" : "none"}
        strokeWidth="1.5"
      />
      <path
        d="M32 17l12 5v9c0 8-5.2 13.6-12 16-6.8-2.4-12-8-12-16v-9z"
        fill="none"
        stroke={onPanel ? "white" : "var(--color-blue-600)"}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 32.5l4 4 7.5-8"
        fill="none"
        stroke={onPanel ? "white" : "var(--color-blue-600)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SecurityPoints({
  points,
  cta,
  ctaHref,
}: {
  points: SecurityPoint[];
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <li
            key={point.id}
            className="flex flex-col items-start gap-5 border-b border-dashed border-white/40 py-8 last:border-b-0 md:px-6 md:py-10 lg:border-b-0 lg:first:pl-0 [&:not(:last-child)]:lg:border-r"
          >
            <SecurityTileVisual id={point.id} onPanel />
            <div className="flex flex-col gap-1">
              <p className="type-paragraph-m-bold text-white">{point.title}</p>
              <p className="type-paragraph-m text-white/75">{point.body}</p>
            </div>
          </li>
        ))}
      </ul>
      {cta && ctaHref ? (
        <Link
          href={ctaHref}
          className="type-paragraph-m-bold mt-8 inline-block text-white underline underline-offset-4 transition-colors hover:text-white/75"
        >
          {cta}
        </Link>
      ) : null}
    </>
  );
}

export interface HomeSecurityBannerData {
  eyebrow: string;
  title: string;
  points: SecurityPoint[];
  cta: string;
  ctaHref: string;
}

interface HomeSecurityBannerProps {
  id?: string;
  data: HomeSecurityBannerData;
  className?: string;
}

export function HomeSecurityBanner({
  id,
  data,
  className,
}: HomeSecurityBannerProps) {
  return (
    <Section id={id} wide className={cn("bg-background py-20 md:py-30", className)}>
      <ScrollReveal>
        <Surface
          variant="panel"
          className="relative overflow-hidden bg-blue-900 p-7 text-white md:p-10"
        >
        <Image
          src="/images/security/banner-bg.avif"
          alt=""
          fill
          sizes="(min-width: 84rem) 84rem, 100vw"
          className="object-cover mix-blend-luminosity"
        />
        <div className="relative">
          <div className="flex flex-col justify-between gap-6 border-b border-dashed border-white/40 pb-10 md:flex-row md:items-end">
            <div className="flex max-w-3xl flex-col gap-5">
              <Eyebrow className="text-white/65">{data.eyebrow}</Eyebrow>
              <h2 className={cn(headingClass.section, "text-white")}>
                {data.title}
              </h2>
            </div>
          </div>
          <SecurityPoints
            points={data.points}
            cta={data.cta}
            ctaHref={data.ctaHref}
          />
        </div>
        </Surface>
      </ScrollReveal>
    </Section>
  );
}
