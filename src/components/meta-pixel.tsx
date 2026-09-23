"use client";

import { useEffect, useRef } from "react";
import { allowsTracking, useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider";
import { META_PIXEL_ID } from "@/lib/meta-pixel-id";

const META_PIXEL_SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

let metaPixelLoadStarted = false;

function loadMetaPixel() {
  if (typeof window === "undefined" || metaPixelLoadStarted || window.fbq) return;
  metaPixelLoadStarted = true;

  const existing = document.querySelector(
    `script[src="${META_PIXEL_SCRIPT_SRC}"]`,
  );
  if (existing) return;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const f = window;
  const n: any = (f.fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const script = document.createElement("script");
  script.async = true;
  script.src = META_PIXEL_SCRIPT_SRC;
  script.onerror = () => {
    metaPixelLoadStarted = false;
  };
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  n("init", META_PIXEL_ID);
  n("track", "PageView");
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

function deferLoadMetaPixel() {
  const win = window as Window & { requestIdleCallback?: typeof requestIdleCallback };
  
  if (win.requestIdleCallback) {
    win.requestIdleCallback(() => loadMetaPixel(), { timeout: 3000 });
  } else {
    win.addEventListener("load", loadMetaPixel);
  }
}

export function MetaPixel() {
  const { consent } = useCookieConsent();
  const loaded = useRef(false);

  useEffect(() => {
    if (!allowsTracking(consent)) return;
    if (loaded.current) return;
    loaded.current = true;
    deferLoadMetaPixel();
  }, [consent]);

  return null;
}
