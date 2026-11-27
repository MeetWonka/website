import type { Metadata } from "next";
import { WonkaBuildView, wonkaBuildMetadata } from "@/views/wonka-build";

export const dynamic = "force-static";

export function generateMetadata(): Promise<Metadata> {
  return wonkaBuildMetadata("en");
}

export default function WonkaBuildPage() {
  return <WonkaBuildView locale="en" />;
}
