import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    metaTitle: "Diagnostic IA entreprise | 5 questions, 3 agents | Wonka",
    metaDescription:
      "5 questions, 2 minutes. Vous voyez 3 agents pour vos outils. Puis 45 min avec Gabriel.",
    ogImage: null,
  },
  {
    path: "/france/diagnostic",
    fallbackTitle: "Diagnostic IA entreprise | 5 questions, 3 agents | Wonka",
  },
);

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
