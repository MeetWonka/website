"use client";

import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";
import { HeroVideoPoster } from "@/components/sections/hero-video-poster";
import { Section } from "@/components/ui/section";
import { useT } from "@/i18n/use-t";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import {
  HOME_V2_WORKSPACE_TOUR,
  type HomeV2Copy,
} from "@/views/copy/home-v2";

export function HomeV2WorkspaceTour({
  copy,
}: {
  copy: HomeV2Copy["workspaceTour"];
}) {
  const t = useT();
  const { youtubeId, poster } = HOME_V2_WORKSPACE_TOUR;

  return (
    <section className="bg-white text-text pt-16 pb-4 md:pt-20 md:pb-6">
      <Section>
        <HomeV2Reveal className="flex flex-col items-center gap-8 md:gap-10">
          <h2
            className={cn(
              headingClass.section,
              "max-w-3xl text-center text-text text-balance",
            )}
          >
            {copy.title}
          </h2>
          <div className="w-full max-w-4xl">
            <HeroVideoPoster
              src={poster.src}
              alt={copy.posterAlt}
              width={poster.width}
              height={poster.height}
              youtubeId={youtubeId}
              playLabel={t("common.playVideo")}
              closeLabel={t("common.closeVideo")}
              sizes="(min-width: 64rem) 56rem, 100vw"
            />
          </div>
        </HomeV2Reveal>
      </Section>
    </section>
  );
}