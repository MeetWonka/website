import { redirect } from "next/navigation";
import { TRANSLATED_LOCALES } from "@/i18n/routes";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocalizedWonkaChatPage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/workspace`);
}
