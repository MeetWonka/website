import type { Metadata } from "next";
import { PricingView, pricingMetadata } from "@/views/pricing";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return pricingMetadata("en");
}

export default function PricingRoutePage() {
  return <PricingView locale="en" />;
}
