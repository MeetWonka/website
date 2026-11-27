import type { Metadata } from "next";
import { SecurityView, securityMetadata } from "@/views/security";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return securityMetadata("en");
}

export default function SecurityPage() {
  return <SecurityView locale="en" />;
}
