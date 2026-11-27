import type { Metadata } from "next";
import { AiAgentsView, aiAgentsMetadata } from "@/views/ai-agents";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return aiAgentsMetadata("en");
}

export default function AiAgentsPage() {
  return <AiAgentsView locale="en" />;
}
