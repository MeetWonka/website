import type { Metadata } from "next";

import {

  WorkspaceGovernanceView,

  workspaceGovernanceMetadata,

} from "@/views/workspace-governance";



export const dynamic = "force-static";



export async function generateMetadata(): Promise<Metadata> {

  return workspaceGovernanceMetadata("en");

}



export default function WorkspaceGovernancePage() {

  return <WorkspaceGovernanceView locale="en" />;

}


