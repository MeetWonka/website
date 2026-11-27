import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { SecurityView, securityMetadata } from "@/views/security";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return securityMetadata(locale as Locale);
}

export default async function LocalizedSecurityPage({ params }: PageProps) {
  const { locale } = await params;
  return <SecurityView locale={locale as Locale} />;
}
