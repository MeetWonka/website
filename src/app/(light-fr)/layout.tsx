import { HtmlLang } from "@/components/html-lang";
import { PageLayout } from "@/components/layout/page-layout";

/** French-only pages on a white background (e.g. /france/diagnostic). */
export default function LightFrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout locale="fr" headerVariant="inline-light">
      <HtmlLang lang="fr" />
      {children}
    </PageLayout>
  );
}
