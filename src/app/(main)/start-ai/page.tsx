import type { Metadata } from "next";
import { StartAiView, startAiMetadata } from "@/views/start-ai";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return startAiMetadata("en");
}

export default function StartAiPage() {
  return <StartAiView locale="en" />;
}
