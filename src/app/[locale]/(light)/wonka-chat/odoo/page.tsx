import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { WonkaChatOdooView, wonkaChatOdooMetadata } from "@/views/wonka-chat-odoo";

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
  return wonkaChatOdooMetadata(locale as Locale);
}

export default async function LocalizedWonkaChatOdooPage({ params }: PageProps) {
  const { locale } = await params;
  return <WonkaChatOdooView locale={locale as Locale} />;
}
