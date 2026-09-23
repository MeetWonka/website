"use client";

import { useEffect, useState } from "react";
import {
  getWebsiteFeatureFlag,
  subscribeToWebsiteFeatureFlags,
} from "@/lib/analytics";
import type { HeroData } from "@/lib/types";
import {
  isHomepageHeroVariant,
  type HomepageHeroVariant,
} from "@/lib/homepage-hero-variants";
import { Hero } from "./hero";

export const HOMEPAGE_HERO_EXPERIMENT_FLAG = "homepage-hero-product-preview-v1";

interface HomepageHeroExperimentProps {
  data?: HeroData | null;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
}

export function HomepageHeroExperiment(props: HomepageHeroExperimentProps) {
  const [variant, setVariant] = useState<HomepageHeroVariant>("control");

  useEffect(() => {
    const previewVariant = new URLSearchParams(window.location.search).get(
      "hero-variant",
    );
    const previewEnabled =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

    if (previewEnabled && isHomepageHeroVariant(previewVariant)) {
      const frame = window.requestAnimationFrame(() =>
        setVariant(previewVariant),
      );
      return () => window.cancelAnimationFrame(frame);
    }

    return subscribeToWebsiteFeatureFlags(() => {
      const assignedVariant = getWebsiteFeatureFlag(
        HOMEPAGE_HERO_EXPERIMENT_FLAG,
      );
      setVariant(
        isHomepageHeroVariant(assignedVariant) ? assignedVariant : "control",
      );
    });
  }, []);

  return <Hero {...props} variant={variant} />;
}
