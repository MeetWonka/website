import type { Metadata } from "next";
import { AgentBlueprintExperience } from "@/components/agent-blueprint/agent-blueprint-experience";
import {
  BlueprintFaq,
  BlueprintSteps,
  BlueprintToWonkaChat,
  BlueprintTrust,
  BlueprintValueStack,
} from "@/components/agent-blueprint/blueprint-sections";
import { Problem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { BreadcrumbSchema } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { sanityFetch } from "@sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@sanity/lib/queries";

export const dynamic = "force-static";

const pagePath = "/ai-agent-blueprint";

/** Every meeting CTA on this page books directly with Gabriel. */
const BLUEPRINT_MEETING_URL =
  "https://bookings.cloud.microsoft/book/WonkaAIFrance@meetwonka.com/?ismsaljsauthenabled";
/** Where visitors go to build and run their agents. */
const WONKA_CHAT_URL = "https://wonka.chat";
const title = "Free AI Agent Blueprint for Your Company | Wonka AI";
const description =
  "Get three anonymous AI agent recommendations for your company, grounded in 570 real-world enterprise AI use cases.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${getSiteUrl()}${pagePath}` },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}${pagePath}`,
    type: "website",
    siteName: "Wonka AI",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function AgentBlueprintPage() {
  const siteUrl = getSiteUrl();
  // <Testimonials> renders an empty spacer when there are none; skip it here.
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });
  const hasTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0;

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          {
            name: "AI Agent Blueprint",
            url: `${siteUrl}${pagePath}`,
          },
        ]}
      />
      <AgentBlueprintExperience
        meetingUrl={BLUEPRINT_MEETING_URL}
        wonkaChatUrl={WONKA_CHAT_URL}
      >
        <Problem id="problem" />
        <BlueprintValueStack />
        <BlueprintSteps />
        <BlueprintToWonkaChat
          wonkaChatUrl={WONKA_CHAT_URL}
          meetingUrl={BLUEPRINT_MEETING_URL}
        />
        <div className="flex flex-col gap-10 py-10 md:gap-16 md:py-16">
          <Stats />
          <BlueprintTrust />
        </div>
        {hasTestimonials ? <Testimonials id="testimonials" /> : null}
        <BlueprintFaq />
      </AgentBlueprintExperience>
    </main>
  );
}
