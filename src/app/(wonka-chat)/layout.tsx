import { PageLayout } from "@/components/layout/page-layout";

export default function WonkaChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout headerVariant="inline-light">{children}</PageLayout>;
}
