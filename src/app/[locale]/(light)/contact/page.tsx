import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import { ContactView, contactMetadata } from "@/views/contact";

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
  return contactMetadata(locale as Locale);
}

export default async function LocalizedContactPage({ params }: PageProps) {
  const { locale } = await params;
  return <ContactView locale={locale as Locale} />;
}
