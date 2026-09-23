"use client";

import { Hero } from "@/components/sections/hero";
import { Cta } from "@/components/sections/cta";
import { trackWebsiteEvent, WEBSITE_EVENTS } from "@/lib/analytics";
import type { HeroData, HomepageCtaData } from "@/lib/types";

interface FranceHeroProps {
  data: HeroData;
}

export function FranceHero({ data }: FranceHeroProps) {
  const handleClick = () => {
    trackWebsiteEvent(WEBSITE_EVENTS.FRANCE_DIAGNOSTIC_START, {
      placement: "hero",
    });
  };

  return (
    <div onClick={handleClick}>
      <Hero
        data={data}
        ctaHref="/france/diagnostic?utm_campaign=france"
        ctaLabel="Faire le diagnostic"
      />
    </div>
  );
}

interface FranceCtaProps {
  data: HomepageCtaData;
}

export function FranceCta({ data }: FranceCtaProps) {
  const handleClick = () => {
    trackWebsiteEvent(WEBSITE_EVENTS.FRANCE_DIAGNOSTIC_START, {
      placement: "bottom-cta",
    });
  };

  return (
    <div onClick={handleClick}>
      <Cta
        id="get-started"
        data={data}
        meetingUrl="/france/diagnostic?utm_campaign=france"
        meetingLabel="Faire le diagnostic"
        showImage={false}
      />
    </div>
  );
}
