import { PageLayout } from "@/components/layout/page-layout";
import type { Locale } from "@/i18n/config";

export default async function CaseStudiesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PageLayout headerVariant="inline-light" locale={locale as Locale}>
      {children}
    </PageLayout>
  );
}
