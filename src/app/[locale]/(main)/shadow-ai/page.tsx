import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { landingMetadata, SeoLandingView } from "@/views/seo-landing";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return landingMetadata("shadowAi", locale as Locale);
}

export default async function LocalizedLandingPage({ params }: PageProps) {
  const { locale } = await params;
  return <SeoLandingView page="shadowAi" locale={locale as Locale} />;
}
