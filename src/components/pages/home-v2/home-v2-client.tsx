"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ClientProofCard } from "@/components/sections/home-client-proof";
import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";
import { HomeV2PlatformStack } from "@/components/sections/home-v2-platform-stack";
import { HomeV2WorkspaceTour } from "@/components/sections/home-v2-workspace-tour";
import { HomeV2Subsidies } from "@/components/sections/home-v2-subsidies";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { headingClass } from "@/lib/design-tokens";
import { HomeSecurityBanner } from "@/components/sections/home-security-banner";
import { BulletIcon } from "@/components/ui/icons/bullet";
import type { Locale } from "@/i18n/config";
import { hubPath } from "@/lib/locale-path";
import { SHOW_LOGO_BANNERS } from "@/lib/feature-flags";
import { cn } from "@/lib/utils";
import type {
  HomeV2Copy,
  DepartmentId,
} from "@/views/copy/home-v2";
import {
  HOME_V2_HERO_LOGOS,
  HERO_LOGO_SIZE_CLASS,
  heroMarqueeImgClass,
} from "@/lib/home-v2-hero-logos";
import {
  DEPARTMENT_TOOLS,
  EVERYDAY_TOOL_ROWS,
  HOME_LOGO_BASE,
  type HomeTool,
} from "@/lib/home-integration-tools";

const BG = "/brand/backgrounds/16x9";
const EASE = [0.22, 1, 0.36, 1] as const;
const round = (n: number) => Math.round(n * 100) / 100;

type Tool = HomeTool;

const TEAM_PHOTOS = [
  "cedric-gilissen",
  "antoine-percy",
  "florian-de-boeck",
  "bilal-errahil",
  "nathan-de-witte",
].map((slug) => `/images/team/${slug}.jpg`);

export interface HomeV2Links {
  meetingUrl: string;
  teamUrl: string;
}

/* ───────────────────────── primitives ───────────────────────── */

function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-text font-serif text-[2.4rem] leading-[1.04] tracking-[-0.01em] md:text-[3.4rem]">
        {title}
      </h2>
      {body && (
        <p className="type-paragraph-l text-text/70 max-w-2xl">{body}</p>
      )}
    </Reveal>
  );
}

function ToolTile({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "border-border flex shrink-0 items-center justify-center rounded-sm border bg-white",
        size === "sm" ? "size-12" : "size-14 md:size-16",
      )}
      title={tool.name}
    >
      {tool.src ? (
        <Image
          src={tool.src}
          alt={tool.name}
          width={40}
          height={40}
          className={cn(
            "object-contain",
            tool.iconClassName ??
              (size === "sm" ? "size-6" : "size-7 md:size-8"),
          )}
          unoptimized
        />
      ) : (
        <span className="font-serif text-xl" aria-label={tool.name}>
          {tool.name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

/* ───────────────────────── award ───────────────────────── */

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="relative z-10 h-3.5 w-5"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 14 L3 3 L8 9 L12 2 L16 9 L21 3 L22 14 Z"
        stroke="#e8c477"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardTag({ copy }: { copy: HomeV2Copy["award"] }) {
  const [title, event] = copy.label.split(" · ");
  return (
    <div
      className="award-marble-badge relative flex w-fit items-center gap-2 overflow-hidden rounded-full border border-[#c9962c]/75 px-3 py-1.5 text-white backdrop-blur-md md:px-4"
      style={{ animation: "award-glow 3s ease-in-out infinite" }}
    >
      <CrownIcon />
      <span className="relative z-10 h-4 w-px shrink-0 bg-gradient-to-b from-transparent via-[#d7a23c]/80 to-transparent" />
      <span className="relative z-10 flex flex-col text-left text-[0.56rem] leading-3.5 font-medium tracking-[0.08em] whitespace-nowrap uppercase md:flex-row md:gap-[0.5em] md:text-xs md:leading-4 md:tracking-[0.14em]">
        <span>{title}</span>
        {event ? (
          <>
            <span className="hidden md:inline" aria-hidden>
              ·
            </span>
            <span>{event}</span>
          </>
        ) : null}
      </span>
    </div>
  );
}

/* ───────────────────────── hero ───────────────────────── */

/** Infinite client-logo marquee under a dark hero. Reused by the ads landings. */
export function TrustBand({ label }: { label: string }) {
  const reduce = useReducedMotion();
  if (!SHOW_LOGO_BANNERS) return null;
  const logos = [...HOME_V2_HERO_LOGOS, ...HOME_V2_HERO_LOGOS];
  return (
    <div className="border-border bg-text/[0.06] border-t border-dashed">
      <p className="type-eyebrow border-border text-text/80 border-b border-dashed py-3 text-center">
        {label}
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max items-center"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 55, ease: "linear", repeat: Infinity }}
        >
          {logos.map((logo, i) => {
            const size = HERO_LOGO_SIZE_CLASS[logo.size];
            const imgClass = heroMarqueeImgClass(logo);
            return (
              <span
                key={`${logo.alt}-${i}`}
                className={cn(
                  "border-border flex h-16 shrink-0 items-center justify-center border-r border-dashed px-5",
                  logo.slotClassName ?? size.slot,
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={280}
                  height={80}
                  className={imgClass}
                  unoptimized
                />
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function Hero({
  copy,
  award,
  links,
}: {
  copy: HomeV2Copy["hero"];
  award: HomeV2Copy["award"];
  links: HomeV2Links;
}) {
  return (
    <section
      data-theme="dark"
      className="bg-background text-text relative isolate flex min-h-svh w-full flex-col overflow-hidden"
    >
      <Image
        src={`${BG}/wonka-bg-hills-1920x1080.webp`}
        alt=""
        fill
        priority
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/40 via-background/10 to-background/50 absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="flex flex-1 items-center justify-center px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
          <Reveal>
            <AwardTag copy={award} />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-text font-serif text-[2.6rem] leading-[1.03] tracking-[-0.015em] text-balance md:text-[4.4rem]">
              {copy.title}
              {copy.titleAccent ? (
                <span className="text-text/65 block">{copy.titleAccent}</span>
              ) : null}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-body text-text/90 max-w-[36rem]">
              {copy.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-2 flex justify-center">
            <ButtonLink href={links.meetingUrl} variant="primary">
              {copy.secondaryCta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <TrustBand label={copy.trustedBy} />
    </section>
  );
}

/* ───────────────────────── clients ───────────────────────── */

export function Clients({ copy }: { copy: HomeV2Copy["clients"] }) {
  return (
    <section id="clients" className="bg-background py-20 md:py-30">
      <Section>
        <HomeV2Reveal className="mb-10 md:mb-14">
          <SectionHeader
            align="left"
            eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
            heading={copy.title}
            headingRole="section"
          />
        </HomeV2Reveal>
        <div className="flex flex-col gap-8 md:gap-10">
          {copy.cards.map((card, index) => (
            <ClientProofCard
              key={card.id}
              index={index}
              card={{
                id: card.id,
                quote: card.quote,
                authorName: card.authorName,
                authorRole: card.authorRole,
                portraitUrl: card.portraitUrl,
                portraitAlt: card.portraitAlt,
                companyLogoUrl: card.companyLogoUrl,
                companyLogoAlt: card.companyLogoAlt,
                companyLogoWidth: card.companyLogoWidth,
                companyLogoHeight: card.companyLogoHeight,
                portraitObjectPosition: card.portraitObjectPosition,
                statValue: card.statValue,
                statLabel: card.statLabel,
              }}
              video={{
                youtubeId: card.videoYoutubeId,
                title: card.videoTitle,
                playLabel: copy.play,
                closeLabel: copy.close,
              }}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}

/* ───────────────────────── integrations ───────────────────────── */

function WonkaAppIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-sm bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700",
        className,
      )}
    >
      <Image
        src={`${HOME_LOGO_BASE}/wonka-logo-mark-white-transparent.png`}
        alt="WonkaChat"
        width={64}
        height={64}
        className="size-1/2 object-contain"
      />
    </span>
  );
}

function Constellation({ department }: { department: DepartmentId }) {
  const reduce = useReducedMotion();
  const nodes: Tool[] = [...DEPARTMENT_TOOLS[department], { name: "+" }];
  const radius = 38;
  const position = (i: number) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    // Rounded so server and client render identical attribute strings.
    return {
      x: round(50 + Math.cos(angle) * radius),
      y: round(50 + Math.sin(angle) * radius),
    };
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div
        className="border-border absolute inset-[12%] rounded-full border border-dashed"
        aria-hidden
      />
      <div
        className="border-border absolute inset-[30%] rounded-full border border-dashed"
        aria-hidden
      />

      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        {nodes.map((tool, i) => {
          const { x, y } = position(i);
          return (
            <motion.line
              key={`${department}-${tool.name}-line`}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke="var(--color-blue-400)"
              strokeWidth={0.35}
              strokeDasharray="1.2 1.6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.85,
                strokeDashoffset: reduce ? 0 : [0, -11],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.05 * i },
                strokeDashoffset: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          );
        })}
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <WonkaAppIcon className="size-20 md:size-24" />
      </div>

      {nodes.map((tool, i) => {
        const { x, y } = position(i);
        const isCustom = tool.name === "+";
        return (
          <motion.div
            key={`${department}-${tool.name}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05 * i, ease: EASE }}
          >
            {isCustom ? (
              <span className="border-text/30 bg-background text-text/50 flex size-14 items-center justify-center rounded-sm border border-dashed font-serif text-2xl md:size-16">
                +
              </span>
            ) : (
              <ToolTile tool={tool} />
            )}
            {!isCustom && (
              <span className="type-paragraph-s text-text/70 hidden whitespace-nowrap sm:block">
                {tool.name}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function ToolRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const reduce = useReducedMotion();
  const row = [...tools, ...tools];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] py-2">
      <motion.div
        className="flex w-max gap-4"
        animate={
          reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row.map((tool, i) => (
          <ToolTile key={`${tool.name}-${i}`} tool={tool} size="sm" />
        ))}
      </motion.div>
    </div>
  );
}

export function Integrations({
  copy,
  locale,
}: {
  copy: HomeV2Copy["integrations"];
  locale: Locale;
}) {
  const integrationsHref = hubPath("connectors", locale);
  const [department, setDepartment] = useState<DepartmentId>(
    copy.departments[0].id,
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => {
      setDepartment((current) => {
        const i = copy.departments.findIndex((d) => d.id === current);
        return copy.departments[(i + 1) % copy.departments.length].id;
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, copy.departments]);

  return (
    <section className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          body={copy.body}
        />

        <div
          ref={ref}
          className="mt-14 grid items-center gap-10 lg:grid-cols-12"
        >
          <ul className="border-border grid grid-cols-1 border-t border-dashed sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {copy.departments.map((d) => {
              const isActive = d.id === department;
              return (
                <li key={d.id} className="border-border border-b border-dashed">
                  <button
                    type="button"
                    onClick={() => {
                      setDepartment(d.id);
                      setPaused(true);
                    }}
                    className="w-full py-3.5 text-left lg:py-4"
                  >
                    <span className="flex items-center gap-3">
                      <BulletIcon
                        className={cn(
                          "h-[0.625rem] w-[0.4375rem] shrink-0 transition-colors",
                          isActive ? "text-accent-dark" : "text-accent-dark/30",
                        )}
                      />
                      <span
                        className={cn(
                          "type-h6 transition-colors",
                          isActive ? "text-text" : "text-text/40",
                        )}
                      >
                        {d.label}
                      </span>
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="type-paragraph-s text-text/60 mt-1 hidden pl-[1.2rem] lg:block"
                      >
                        {d.pitch}
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="lg:col-span-7">
            <Constellation department={department} />
            <p className="type-paragraph-s text-text/60 mt-4 text-center">
              {copy.customBody ? (
                <>
                  <span className="text-text">{copy.customTitle}</span>{" "}
                  {copy.customBody}
                </>
              ) : (
                <span className="text-text">{copy.customTitle}</span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-mid-gray mt-16 rounded-sm p-6 md:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="type-h5 text-text">{copy.everydayTitle}</p>
            <ButtonLink
              href={integrationsHref}
              variant="outline"
              className="type-paragraph-s h-auto shrink-0 gap-1.5 rounded-full border border-dashed border-text/30 bg-transparent px-4 py-1.5 shadow-none hover:bg-background"
            >
              {copy.everydayCount}
              <ArrowIcon className="transition-transform duration-[var(--ds-motion-duration-normal)] group-hover/btn:translate-x-[0.125rem]" />
            </ButtonLink>
          </div>
          <ToolRow tools={EVERYDAY_TOOL_ROWS[0]} />
          <ToolRow tools={EVERYDAY_TOOL_ROWS[1]} reverse />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── team / workflow ───────────────────────── */

function Team({
  copy,
  links,
}: {
  copy: HomeV2Copy["team"];
  links: HomeV2Links;
}) {
  return (
    <section className="bg-background py-20 md:py-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="flex max-w-xl flex-col items-start gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 className="text-text font-serif text-[2.4rem] leading-[1.04] tracking-[-0.01em] md:text-[3.4rem]">
              {copy.title}
            </h2>
            <p className="type-paragraph-l text-text/70">{copy.body}</p>
            <ButtonLink href={links.meetingUrl} variant="primary" className="mt-2">
              {copy.cta}
            </ButtonLink>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col items-start gap-5 text-left lg:ml-auto lg:items-end lg:text-right"
          >
            <div className="flex flex-col items-start gap-2 lg:items-end">
              <span className="text-text font-serif text-7xl leading-none lining-nums">
                {copy.count}
              </span>
              <span className="type-paragraph-s text-text/65 max-w-[14rem]">
                {copy.countLabel}
              </span>
            </div>
            <span className="flex -space-x-3 justify-start lg:justify-end">
              {TEAM_PHOTOS.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={96}
                  height={120}
                  className="border-background size-11 rounded-full border-2 object-cover object-top md:size-12"
                />
              ))}
            </span>
            <ButtonLink href={links.teamUrl} variant="underline">
              {copy.pageCta}
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="border-border md:divide-border mt-14 grid border-y border-dashed md:grid-cols-3 md:divide-x md:divide-dashed">
          {copy.steps.map((step, i) => (
            <li
              key={step.phase}
              className={cn(
                "flex flex-col gap-4 py-8 md:px-8 md:py-10",
                i > 0 && "border-border border-t border-dashed md:border-t-0",
                i === 0 && "md:pl-0",
              )}
            >
              <Reveal delay={0.1 * i} className="flex flex-col gap-4">
                <span className="type-eyebrow text-accent tabular-nums">
                  0{i + 1}
                </span>
                <p className="type-h5 text-text">{step.tagline}</p>
                <p className="type-paragraph-m text-text/70">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── final CTA ───────────────────────── */

export function HomeV2FinalCta({
  copy,
  hero,
  links,
}: {
  copy: HomeV2Copy["finalCta"];
  hero: Pick<HomeV2Copy["hero"], "primaryCta" | "secondaryCta">;
  links: Pick<HomeV2Links, "meetingUrl">;
}) {
  return (
    <section
      data-theme="dark"
      className="bg-background text-text relative isolate overflow-hidden"
    >
      <Image
        src={`${BG}/wonka-bg-snowy-mountain-1920x1080.webp`}
        alt=""
        fill
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/20 via-background/20 to-background/60 absolute inset-0 -z-10 bg-gradient-to-b" />
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-7 px-6 py-28 text-center">
        <Reveal>
          <h2 className="text-text font-serif text-[2.6rem] leading-[1.03] text-balance md:text-[4.2rem]">
            {copy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="type-body text-text/85">{copy.subtitle}</p>
        </Reveal>
        <Reveal delay={0.16} className="flex justify-center">
          <ButtonLink href={links.meetingUrl} variant="primary">
            {hero.secondaryCta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── page ───────────────────────── */

export function HomeV2Client({
  copy,
  links,
  locale,
}: {
  copy: HomeV2Copy;
  links: HomeV2Links;
  locale: Locale;
}) {
  return (
    <main className="bg-background text-text">
      <Hero copy={copy.hero} award={copy.award} links={links} />
      <HomeV2WorkspaceTour copy={copy.workspaceTour} />
      <HomeV2PlatformStack copy={copy.platform} locale={locale} />
      <HomeSecurityBanner
        data={copy.security}
      />
      <Integrations copy={copy.integrations} locale={locale} />
      <Team copy={copy.team} links={links} />
      <HomeV2Subsidies copy={copy.subsidies} locale={locale} />
      <Clients copy={copy.clients} />
      <HomeV2FinalCta copy={copy.finalCta} hero={copy.hero} links={links} />
    </main>
  );
}
