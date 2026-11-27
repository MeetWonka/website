import type { Metadata } from "next";
import { TeamPage, teamMetadata } from "@/components/pages/team/team-page";

export const dynamic = "force-static";

export const metadata: Metadata = teamMetadata("en");

export default function Team() {
  return <TeamPage locale="en" />;
}
