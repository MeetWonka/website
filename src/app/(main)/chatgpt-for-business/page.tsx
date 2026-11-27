import type { Metadata } from "next";
import { landingMetadata, SeoLandingView } from "@/views/seo-landing";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return landingMetadata("chatgptForBusiness", "en");
}

export default function LandingPage() {
  return <SeoLandingView page="chatgptForBusiness" locale="en" />;
}
