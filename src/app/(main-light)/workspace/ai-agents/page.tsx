import type { Metadata } from "next";
import {
  WorkspaceAiAgentsView,
  workspaceAiAgentsMetadata,
} from "@/views/workspace-ai-agents";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return workspaceAiAgentsMetadata("en");
}

export default function WorkspaceAiAgentsPage() {
  return <WorkspaceAiAgentsView locale="en" />;
}
