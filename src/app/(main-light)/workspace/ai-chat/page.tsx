import type { Metadata } from "next";
import { AiChatView, aiChatMetadata } from "@/views/ai-chat";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return aiChatMetadata("en");
}

export default function WorkspaceAiChatPage() {
  return <AiChatView locale="en" />;
}
