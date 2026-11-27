import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WORKSPACE_AI_AGENTS_IMAGES } from "@/lib/workspace-ai-agents-images";
import { headingClass, radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { WorkspaceAiAgentsCopy } from "@/views/copy/workspace-ai-agents";

const TEAM_PHOTOS = [
  "cedric-gilissen",
  "antoine-percy",
  "florian-de-boeck",
  "bilal-errahil",
  "nathan-de-witte",
].map((slug) => `/images/team/${slug}.jpg`);

const LANDSCAPE_BG = "/brand/backgrounds/16x9/wonka-bg-snowy-mountain-1920x1080.webp";

const SECTION_PY = "py-14 md:py-20";

export function WorkspaceAiAgentsWorkflow({
  copy,
}: {
  copy: WorkspaceAiAgentsCopy["atWork"];
}) {
  return (
    <Section className={SECTION_PY}>
      <ScrollReveal>
        <SectionHeader
          align="left"
          className="max-w-2xl"
          eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
          heading={copy.title}
          body={copy.body}
          headingRole="section"
        />
      </ScrollReveal>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-8">
        <ScrollReveal delay={0.06} className="min-w-0">
          <ol className="flex flex-col gap-5">
            {copy.steps.map((step, index) => (
              <li key={step.label} className="flex gap-4">
              <span className="type-eyebrow text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={headingClass.card}>{step.label}</p>
                <p
                  className={cn(
                    "mt-1 type-paragraph-m text-text/65",
                    step.quoted && "text-text/80",
                  )}
                >
                  {step.quoted ? `\u201C${step.text}\u201D` : step.text}
                </p>
              </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="min-w-0">
          <div
            className={cn(
              "relative aspect-[1024/768] w-full overflow-hidden border border-dashed border-border bg-light-gray",
              radius.sm,
            )}
          >
            <Image
              src={WORKSPACE_AI_AGENTS_IMAGES.workflowSalesFollowUp}
              alt={copy.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 52vw, 100vw"
              unoptimized
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}

export function WorkspaceAiAgentsGovernance({
  copy,
  locale,
}: {
  copy: WorkspaceAiAgentsCopy["governance"];
  locale: Locale;
}) {
  const governanceHref = localizeHref("/workspace/governance", locale);

  return (
    <Section className={cn(SECTION_PY, "border-t border-dashed border-border")}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
        <ScrollReveal className="max-w-xl">
          <SectionHeader
            align="left"
            eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
            heading={copy.title}
            body={copy.body}
            headingRole="section"
          />
          <Link
            href={governanceHref}
            className="mt-5 inline-block type-paragraph-m-bold text-accent underline underline-offset-4"
          >
            {copy.exploreLink}
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="min-w-0">
          <div
            className={cn(
              "relative aspect-[1024/576] w-full overflow-hidden border border-dashed border-border bg-light-gray",
              radius.sm,
            )}
          >
            <Image
              src={WORKSPACE_AI_AGENTS_IMAGES.agentControl}
              alt={copy.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 42vw, 100vw"
              unoptimized
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}

export function WorkspaceAiAgentsImplementation({
  copy,
  meetingUrl,
}: {
  copy: WorkspaceAiAgentsCopy["implementation"];
  meetingUrl: string;
}) {
  return (
    <Section className={cn(SECTION_PY, "border-t border-dashed border-border")}>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <ScrollReveal className="flex max-w-xl flex-col gap-4">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className={cn(headingClass.section, "text-text")}>{copy.title}</h2>
          <p className="type-body text-text/70">{copy.body}</p>
          <ButtonLink href={meetingUrl} variant="primary" className="mt-1 w-fit">
            {copy.cta}
          </ButtonLink>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="flex justify-start lg:justify-end">
          <span className="flex -space-x-3">
            {TEAM_PHOTOS.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={96}
                height={120}
                className="border-background size-14 rounded-full border-2 object-cover object-top md:size-16"
              />
            ))}
          </span>
        </ScrollReveal>
      </div>
    </Section>
  );
}

export function WorkspaceAiAgentsFinalCta({
  copy,
  trialUrl,
  meetingUrl,
}: {
  copy: WorkspaceAiAgentsCopy["finalCta"];
  trialUrl: string;
  meetingUrl: string;
}) {
  return (
    <section
      data-theme="dark"
      className="bg-background text-text relative isolate overflow-hidden"
    >
      <Image
        src={LANDSCAPE_BG}
        alt=""
        fill
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="from-background/20 via-background/20 to-background/60 absolute inset-0 -z-10 bg-gradient-to-b" />
      <ScrollReveal className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-7 px-6 py-28 text-center">
        <h2 className="text-text font-serif text-[2.6rem] leading-[1.03] text-balance md:text-[4.2rem]">
          {copy.title}
        </h2>
        <p className="type-body text-text/85 max-w-2xl">{copy.subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={trialUrl} variant="primary">
            {copy.primaryCta}
          </ButtonLink>
          <ButtonLink href={meetingUrl} variant="primaryOutline">
            {copy.secondaryCta}
          </ButtonLink>
        </div>
      </ScrollReveal>
    </section>
  );
}
