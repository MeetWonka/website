import type { Metadata } from "next";
import { HomeV2Page, homeMetadata } from "@/components/pages/home-v2/home-v2-page";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata("en");
}

export default function HomePage() {
  return <HomeV2Page locale="en" />;
}
