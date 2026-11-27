import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ReviewVideoCarousel } from "@/components/sections/start-ai-subsidized-flanders/review-video-carousel";

export function StartAiSubsidizedFlandersReviewVideo() {
  return (
    <Section className="bg-light-gray py-16 md:py-24">
      <SectionHeader
        align="center"
        className="mx-auto max-w-2xl"
        eyebrow={<Eyebrow>Klantverhaal</Eyebrow>}
        heading="Wat onze klanten zeggen over Start AI"
      />
      <ReviewVideoCarousel />
    </Section>
  );
}
