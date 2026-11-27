import type { Metadata } from "next";
import { landingMetadata, SeoLandingView } from "@/views/seo-landing";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return landingMetadata("aiForBusiness", "en");
}

export default function LandingPage() {
  return <SeoLandingView page="aiForBusiness" locale="en" />;
}
