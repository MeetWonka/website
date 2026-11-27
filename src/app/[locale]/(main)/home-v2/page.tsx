import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedHomeV2Redirect({ params }: PageProps) {
  const { locale } = await params;
  redirect(commercialPath("home", locale as Locale));
}
