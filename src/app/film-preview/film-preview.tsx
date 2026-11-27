"use client";
// Preview-only showcase of the agent film with fixture data (see page.tsx).
import { Player } from "@remotion/player";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AgentFilmPlayer from "@/components/agent-blueprint/agent-film/agent-film-player";
import { AgentFilm } from "@/components/agent-blueprint/agent-film/agent-film";
import { agentFilmTimeline, buildAgentFilmSpec } from "@/lib/agent-film";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";

const agent: AgentBlueprintAgent = {
  id: "agent-1",
  name: "Assistant appels d’offres BTP",
  tier: "Human in the loop",
  mission: "Prépare la réponse aux appels d’offres à partir du DCE et des chantiers passés.",
  whyNow: "",
  trigger: "Nouveau DCE reçu",
  inputs: ["DCE"],
  tools: ["Outlook", "SharePoint", "Odoo ERP", "Microsoft Teams"],
  workflow: ["Lire le DCE", "Retrouver les chantiers similaires", "Chiffrer les lots", "Rédiger le mémoire"],
  humanControl: "Le chargé d’affaires valide avant envoi",
  expectedImpact: "Mémoire technique prêt en 2 h",
  weeklyHoursSaved: { min: 8, max: 14 },
  effort: "Medium",
  benchmarkPattern: "",
  process: "Réponse aux appels d’offres",
  companySignal: "",
  demo: {
    request: "Nouveau DCE reçu : réhabilitation d’un groupe scolaire, 3 lots",
    steps: [
      { action: "Lire le DCE et le CCTP", tool: "Outlook", finding: "38 exigences, remise le 14 novembre" },
      { action: "Retrouver les chantiers similaires", tool: "SharePoint", finding: "4 références scolaires depuis 2022" },
      { action: "Chiffrer les lots avec les prix", tool: "Odoo ERP", finding: "Lots 1 à 3 chiffrés, 412 k€ HT" },
      { action: "Prévenir le chargé d’affaires", tool: "Microsoft Teams", finding: "Brouillon partagé dans le canal AO" },
    ],
    deliverable: {
      kind: "Mémoire technique",
      title: "Dossier complet, deux points à confirmer en visite",
      sections: [
        { heading: "Périmètre", body: "Trois lots : gros œuvre, menuiseries, CVC. Site occupé pendant les travaux." },
        { heading: "Points à vérifier", body: "Accès chantier en période scolaire et état des réseaux existants." },
        { heading: "Références", body: "Quatre groupes scolaires livrés depuis 2022, dont deux en site occupé." },
      ],
    },
  },
};

function Still() {
  const params = useSearchParams();
  const frame = params.get("frame");
  if (frame === null) return null;
  const spec = buildAgentFilmSpec(params.get("copilot") ? { ...agent, tier: "Copilot", demo: { ...agent.demo!, request: "Prépare la réponse au DCE du groupe scolaire" } } : agent, "fr");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#fff" }}>
      <Player component={AgentFilm} inputProps={{ spec }} durationInFrames={agentFilmTimeline(spec).total} fps={30} compositionWidth={1280} compositionHeight={720} initialFrame={Number(frame)} style={{ width: "100%" }} />
    </div>
  );
}

export function FilmPreview() {
  return (
    <main style={{ maxWidth: 1100, margin: "40px auto", padding: 16 }}>
      <Suspense><Still /></Suspense>
      <AgentFilmPlayer agent={agent} locale="fr" />
      <div style={{ height: 24 }} />
      <AgentFilmPlayer agent={{ ...agent, id: "agent-2", tier: "Copilot", demo: undefined, conversationStarters: ["Résume ce DCE en 5 points"] }} locale="fr" />
    </main>
  );
}
