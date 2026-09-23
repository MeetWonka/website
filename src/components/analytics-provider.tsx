"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider";
import {
  decorateWonkaChatUrl,
  initializeWebsiteAnalytics,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";

export function AnalyticsProvider() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent) return;
    initializeWebsiteAnalytics(consent.categories, consent.choice);

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const destination = new URL(anchor.href, window.location.href);
      const isWonkaSignup =
        (destination.hostname === "wonka.chat" || destination.hostname.endsWith(".wonka.chat")) &&
        destination.pathname.startsWith("/register");

      if (isWonkaSignup) {
        anchor.href = decorateWonkaChatUrl(anchor.href);
        trackWebsiteEvent(WEBSITE_EVENTS.TRIAL_CLICKED, {
          destination_path: destination.pathname,
          placement: anchor.closest<HTMLElement>("[id]")?.id || "unknown",
        });
      }

      const tracked = anchor.closest<HTMLElement>("[data-track]");
      if (!tracked && !isWonkaSignup) return;
      trackWebsiteEvent(WEBSITE_EVENTS.CTA_CLICKED, {
        cta_type: isWonkaSignup ? "trial" : tracked?.dataset.track || "cta",
        cta_context: tracked?.dataset.meetingType || "general",
        cta_id: anchor.id || undefined,
        destination_host: destination.hostname,
        destination_path: destination.pathname,
        placement: anchor.closest<HTMLElement>("[id]")?.id || "unknown",
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [consent]);

  return null;
}
