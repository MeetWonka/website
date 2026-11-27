import type { Metadata } from "next";
import {
  WorkspacePage,
  workspaceMetadata,
} from "@/components/pages/workspace-page";

export const dynamic = "force-static";

// Product overview at `/workspace` (homepage is the marketing landing at `/`).
export function generateMetadata(): Promise<Metadata> {
  return workspaceMetadata("en");
}

export default function WorkspacePageRoute() {
  return <WorkspacePage locale="en" />;
}
