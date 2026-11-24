import type { MeetingContext } from "@/lib/shared-links-defaults";

/**
 * Copy contract for SEO landing pages (src/views/seo-landing.tsx).
 * One object per page × locale. Every claim must come from facts already
 * published elsewhere on the site (pricing, security, case studies, …).
 */
export interface LandingCta {
  label: string;
  /** "meeting" → the team booking link; "trial" → WonkaChat free trial; otherwise an internal path. */
  href: "meeting" | "trial" | string;
}

export interface LandingLink {
  label: string;
  /** Internal path, already in the page's locale (e.g. "/fr/start-ai"). */
  href: string;
  description?: string;
}

export interface LandingCopy {
  /** Which booking link "meeting" CTAs use (France pages use the French team's). */
  meetingContext?: MeetingContext;
  seo: {
    /** ≤ 60 chars, primary keyword first. */
    title: string;
    /** ≤ 155 chars, primary keyword + benefit + CTA. */
    description: string;
  };
  /** Breadcrumb label for this page. */
  breadcrumb: string;
  /** Service JSON-LD. */
  schema: {
    serviceName: string;
    serviceType: string;
  };
  hero: {
    eyebrow: string;
    /** The H1: contains the primary keyword. */
    title: string;
    subtitle: string;
    primaryCta: LandingCta;
    secondaryCta?: LandingCta;
    /** Short facts shown next to the hero: [label, value]. */
    facts: [string, string][];
  };
  /** Answer-first definition block (targets featured snippets / AI answers). */
  answer: {
    heading: string;
    paragraphs: string[];
  };
  benefits: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string }[];
  };
  useCases: {
    eyebrow: string;
    heading: string;
    items: { title: string; body: string; link?: LandingLink }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: { title: string; body: string }[];
  };
  /** Optional comparison table (e.g. vs ChatGPT Business). */
  comparison?: {
    eyebrow: string;
    heading: string;
    columns: [string, string, string];
    rows: [string, string, string][];
    footnote?: string;
  };
  faq: {
    heading: string;
    items: { question: string; answer: string }[];
  };
  related: {
    heading: string;
    links: LandingLink[];
  };
  cta: {
    heading: string;
    body: string;
  };
}
