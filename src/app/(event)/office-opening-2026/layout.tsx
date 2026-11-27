import { PageLayout } from "@/components/layout/page-layout";

export default function OfficeOpeningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout headerVariant="overlay-dark">{children}</PageLayout>;
}
