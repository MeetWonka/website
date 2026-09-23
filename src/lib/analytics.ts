"use client";

import posthog from "posthog-js";

export const WEBSITE_EVENTS = {
  CTA_CLICKED: "website_cta_clicked",
  LEAD_STARTED: "website_lead_started",
  LEAD_SUBMITTED: "website_lead_submitted",
  DIAGNOSTIC_STARTED: "website_diagnostic_started",
  DIAGNOSTIC_STEP_COMPLETED: "website_diagnostic_step_completed",
  DIAGNOSTIC_COMPLETED: "website_diagnostic_completed",
  TRIAL_CLICKED: "website_trial_clicked",
  FRANCE_DIAGNOSTIC_START: "france_diagnostic_start",
  FRANCE_DIAGNOSTIC_COMPLETE: "france_diagnostic_complete",
  FRANCE_BOOKING_CLICK: "france_booking_click",
  OFFICE_OPENING_REGISTER_CLICK: "office_opening_register_click",
} as const;

export type WebsiteEvent = (typeof WEBSITE_EVENTS)[keyof typeof WEBSITE_EVENTS];

const ALLOWED_EVENTS = new Set<string>([
  "$pageview",
  "$identify",
  "$set",
  "$feature_flag_called",
  ...Object.values(WEBSITE_EVENTS),
]);
const ATTRIBUTION_STORAGE_KEY = "wonka:attribution";
const JOURNEY_STORAGE_KEY = "wonka:journey-id";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

type Attribution = Partial<
  Record<(typeof ATTRIBUTION_KEYS)[number], string>
> & {
  landing_page?: string;
  referrer?: string;
};

type ConsentCategories = { analytics: boolean; marketing: boolean };
type ConsentChoice = "essential" | "all" | "rejected";

let initialized = false;
let currentConsent: ConsentCategories = { analytics: false, marketing: false };
let currentChoice: ConsentChoice = "rejected";
const featureFlagListeners = new Set<() => void>();
let stopFeatureFlagListener: (() => void) | null = null;

function trackingAllowed(): boolean {
  return currentChoice !== "rejected";
}

function notifyFeatureFlagListeners(): void {
  featureFlagListeners.forEach((listener) => listener());
}

function listenForFeatureFlags(): void {
  stopFeatureFlagListener ??= posthog.onFeatureFlags(
    notifyFeatureFlagListeners,
  );
}

function readAttribution(): Attribution {
  try {
    return JSON.parse(
      localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}",
    ) as Attribution;
  } catch {
    return {};
  }
}

function readJourneyId(): string | undefined {
  try {
    const value = localStorage.getItem(JOURNEY_STORAGE_KEY) || "";
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
      ? value
      : undefined;
  } catch {
    return undefined;
  }
}

function getOrCreateJourneyId(): string | undefined {
  const existing = readJourneyId();
  if (existing) return existing;
  try {
    const value = crypto.randomUUID();
    localStorage.setItem(JOURNEY_STORAGE_KEY, value);
    return value;
  } catch {
    return undefined;
  }
}

function captureAttribution(): Attribution {
  const stored = readAttribution();
  const params = new URLSearchParams(window.location.search);
  const next: Attribution = { ...stored };

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value) next[key] = value.slice(0, 500);
  }
  next.landing_page ||= window.location.href.slice(0, 2_000);
  next.referrer ||= document.referrer.slice(0, 2_000);

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Analytics remains usable when storage is unavailable.
  }
  return next;
}

export function initializeWebsiteAnalytics(
  consent: ConsentCategories,
  choice: ConsentChoice = "rejected",
): void {
  currentConsent = consent;
  currentChoice = choice;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  if (!key || !trackingAllowed()) {
    if (initialized) posthog.opt_out_capturing();
    notifyFeatureFlagListeners();
    return;
  }

  if (!initialized) {
    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() ||
        "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",
      defaults: "2026-01-30",
      autocapture: false,
      capture_pageview: "history_change",
      capture_pageleave: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
      before_send: (event) =>
        event && ALLOWED_EVENTS.has(event.event) ? event : null,
      loaded: (client) => {
        client.register({
          source_app: "website",
          environment:
            process.env.NEXT_PUBLIC_VERCEL_ENV ||
            process.env.NODE_ENV ||
            "unknown",
          event_version: 1,
          journey_id: getOrCreateJourneyId(),
          ...captureAttribution(),
        });
        listenForFeatureFlags();
      },
    });
    initialized = true;
  } else {
    posthog.opt_in_capturing();
    posthog.register({
      ...captureAttribution(),
      source_app: "website",
      event_version: 1,
      journey_id: getOrCreateJourneyId(),
    });
    listenForFeatureFlags();
    posthog.reloadFeatureFlags();
  }
}

export function getWebsiteFeatureFlag(
  key: string,
): string | boolean | undefined {
  if (
    !initialized ||
    !trackingAllowed() ||
    posthog.has_opted_out_capturing()
  ) {
    return undefined;
  }
  return posthog.getFeatureFlag(key);
}

export function subscribeToWebsiteFeatureFlags(
  listener: () => void,
): () => void {
  featureFlagListeners.add(listener);
  listener();
  return () => featureFlagListeners.delete(listener);
}

export type OfficeOpeningRegisterPlacement = "hero" | "footer" | "sticky";

export function trackOfficeOpeningRegisterClick(
  placement: OfficeOpeningRegisterPlacement,
): void {
  const event = WEBSITE_EVENTS.OFFICE_OPENING_REGISTER_CLICK;
  const properties = { button: placement };

  if (!trackingAllowed()) return;

  if (initialized && !posthog.has_opted_out_capturing()) {
    posthog.capture(event, properties);
  }

  window.dataLayer?.push({ event, ...properties });
}

export function trackWebsiteEvent(
  event: WebsiteEvent,
  properties: Record<string, unknown> = {},
): void {
  if (
    initialized &&
    trackingAllowed() &&
    !posthog.has_opted_out_capturing()
  ) {
    posthog.capture(event, properties);
    window.dataLayer?.push({ event, ...properties });
  }

  if (!trackingAllowed()) return;
  const conversion =
    event === WEBSITE_EVENTS.DIAGNOSTIC_COMPLETED ||
    event === WEBSITE_EVENTS.FRANCE_DIAGNOSTIC_COMPLETE
      ? "Lead"
      : event === WEBSITE_EVENTS.TRIAL_CLICKED
        ? "StartTrial"
        : null;
  if (!conversion) return;
  window.fbq?.("track", conversion, properties);
  window.dataLayer?.push({
    event: `ads_${conversion.toLowerCase()}`,
    ...properties,
  });
}

export function getLeadAnalyticsContext(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  const attribution = captureAttribution();
  return {
    ...attribution,
    journey_id: getOrCreateJourneyId(),
    posthog_distinct_id: initialized ? posthog.get_distinct_id() : undefined,
    posthog_session_id: initialized ? posthog.get_session_id() : undefined,
    landing_path: window.location.pathname,
    analytics_consent: initialized && !posthog.has_opted_out_capturing(),
  };
}

export function markLeadQualified(properties: {
  lead_id: string;
  lifecycle_stage: "lead" | "mql";
  lead_score: number;
  lead_source: string;
}): void {
  if (!initialized || posthog.has_opted_out_capturing()) return;
  posthog.createPersonProfile();
  posthog.setPersonProperties(properties);
  trackWebsiteEvent(WEBSITE_EVENTS.LEAD_SUBMITTED, properties);
}

export function decorateWonkaChatUrl(href: string): string {
  const url = new URL(href, window.location.href);
  if (url.hostname !== "wonka.chat" && !url.hostname.endsWith(".wonka.chat"))
    return href;

  const attribution = captureAttribution();
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }

  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
  if (initialized && !posthog.has_opted_out_capturing()) {
    hash.set("ph_distinct_id", posthog.get_distinct_id());
    hash.set("ph_session_id", posthog.get_session_id());
  }
  const journeyId = readJourneyId();
  if (journeyId) hash.set("journey_id", journeyId);
  url.hash = hash.toString();
  return url.toString();
}
