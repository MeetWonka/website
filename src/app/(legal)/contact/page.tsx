import type { Metadata } from "next";
import { ContactView, contactMetadata } from "@/views/contact";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return contactMetadata("en");
}

export default function ContactPage() {
  return <ContactView locale="en" />;
}
