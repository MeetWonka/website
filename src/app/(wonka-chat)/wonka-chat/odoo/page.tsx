import type { Metadata } from "next";
import { WonkaChatOdooView, wonkaChatOdooMetadata } from "@/views/wonka-chat-odoo";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return wonkaChatOdooMetadata("en");
}

export default function WonkaChatOdooPage() {
  return <WonkaChatOdooView locale="en" />;
}
