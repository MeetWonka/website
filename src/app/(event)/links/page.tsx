import type { Metadata } from "next";
import { LinksPage, linksMetadata } from "@/components/pages/links/links-page";

export const dynamic = "force-static";

export const metadata: Metadata = linksMetadata("en");

export default function Links() {
  return <LinksPage locale="en" />;
}
