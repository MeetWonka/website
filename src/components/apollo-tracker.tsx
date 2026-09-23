"use client";

import { useEffect, useRef } from "react";
import { allowsTracking, useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider";

const APOLLO_APP_ID = "691d86987b3dc0000db97e49";
const APOLLO_SCRIPT_SRC_PREFIX =
  "https://assets.apollo.io/micro/website-tracker/tracker.iife.js";

let apolloLoadStarted = false;

function loadApolloTracker() {
  if (typeof window === "undefined" || apolloLoadStarted) return;
  apolloLoadStarted = true;

  const existing = document.querySelector(
    `script[src^="${APOLLO_SCRIPT_SRC_PREFIX}"]`,
  );
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = `${APOLLO_SCRIPT_SRC_PREFIX}?nocache=${Math.random().toString(36).slice(2)}`;
  script.onload = () => {
    window.trackingFunctions?.onLoad({ appId: APOLLO_APP_ID });
  };
  document.head.appendChild(script);
}

function deferLoadApolloTracker() {
  const win = window as Window & {
    requestIdleCallback?: typeof requestIdleCallback;
  };

  if (win.requestIdleCallback) {
    win.requestIdleCallback(() => loadApolloTracker(), { timeout: 3000 });
  } else {
    window.addEventListener("load", loadApolloTracker, { once: true });
  }
}

export function ApolloTracker() {
  const { consent } = useCookieConsent();
  const loaded = useRef(false);

  useEffect(() => {
    if (!allowsTracking(consent)) return;
    if (loaded.current) return;
    loaded.current = true;
    deferLoadApolloTracker();
  }, [consent]);

  return null;
}
