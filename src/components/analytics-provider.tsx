"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider";
import {
  decorateWonkaChatUrl,
  initializeWebsiteAnalytics,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";

/**
 * Blueprint import links carry a capability id (`/blueprint/agent-blueprint.<uuid>`): anyone holding
 * it can read that blueprint's export, so it must not be sent to analytics.
 */
function redactCapabilityPath(pathname: string): string {
  return pathname.replace(/^\/blueprint\/[^/]+/, "/blueprint/:id");
}

export function AnalyticsProvider() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent) return;
    initializeWebsiteAnalytics(consent.categories);

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const destination = new URL(anchor.href, window.location.href);
      const isWonkaChat =
        destination.hostname === "wonka.chat" || destination.hostname.endsWith(".wonka.chat");
      const isWonkaSignup = isWonkaChat && destination.pathname.startsWith("/register");
      // Blueprint imports land on a signup wall, so they carry attribution too.
      const isBlueprintImport = isWonkaChat && destination.pathname.startsWith("/blueprint/");

      // Paid landings (`/fr/lp/*`) tag their <main> so every CTA click says
      // which ad landing it came from.
      const landing =
        anchor.closest<HTMLElement>("[data-landing]")?.dataset.landing;

      if (isWonkaSignup || isBlueprintImport) {
        anchor.href = decorateWonkaChatUrl(anchor.href);
      }

      if (isWonkaSignup) {
        trackWebsiteEvent(WEBSITE_EVENTS.TRIAL_CLICKED, {
          destination_path: redactCapabilityPath(destination.pathname),
          placement: anchor.closest<HTMLElement>("[id]")?.id || "unknown",
          landing,
        });
      }

      const tracked = anchor.closest<HTMLElement>("[data-track]");
      if (!tracked && !isWonkaSignup) return;
      trackWebsiteEvent(WEBSITE_EVENTS.CTA_CLICKED, {
        cta_type: isWonkaSignup ? "trial" : tracked?.dataset.track || "cta",
        cta_context: tracked?.dataset.meetingType || "general",
        cta_id: anchor.id || undefined,
        destination_host: destination.hostname,
        destination_path: redactCapabilityPath(destination.pathname),
        placement: anchor.closest<HTMLElement>("[id]")?.id || "unknown",
        landing,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [consent]);

  return null;
}
