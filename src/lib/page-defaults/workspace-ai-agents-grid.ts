import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";
import type { AiChatCapabilityClustersData } from "@/lib/page-defaults/ai-chat-capability-grid";
import { WORKSPACE_AI_AGENTS_IMAGES } from "@/lib/workspace-ai-agents-images";
import { WORKSPACE_AI_AGENTS_COPY } from "@/views/copy/workspace-ai-agents";

function publicAssetExists(urlPath: string): boolean {
  const relative = urlPath.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}

/** Native export sizes — frame uses matching aspect-ratio on all breakpoints. */
const HALF_CARD = {
  width: 1024,
  height: 576,
  fit: "cover" as const,
  objectPosition: "50% 50%",
};

const WIDE_BANNER_BASE = {
  width: 3072,
  height: 1200,
  fit: "cover" as const,
  objectPosition: "50% 50%",
};

export function getWorkspaceAiAgentsWorkGrid(
  locale: Locale,
): AiChatCapabilityClustersData {
  const copy = WORKSPACE_AI_AGENTS_COPY[locale].builtForWork;
  const sharedHiRes = publicAssetExists(WORKSPACE_AI_AGENTS_IMAGES.sharedAgentHiRes)
    ? WORKSPACE_AI_AGENTS_IMAGES.sharedAgentHiRes
    : undefined;

  return {
    clusters: [
      {
        heading: "",
        layout: "two-top",
        cards: [
          {
            id: "instructions",
            title: copy.cards.instructions.title,
            body: copy.cards.instructions.body,
            image: {
              src: WORKSPACE_AI_AGENTS_IMAGES.agentInstructions,
              alt: copy.cards.instructions.imageAlt,
              ...HALF_CARD,
            },
          },
          {
            id: "knowledge-tools",
            title: copy.cards.knowledgeTools.title,
            body: copy.cards.knowledgeTools.body,
            image: {
              src: WORKSPACE_AI_AGENTS_IMAGES.knowledgeAndTools,
              alt: copy.cards.knowledgeTools.imageAlt,
              ...HALF_CARD,
            },
          },
          {
            id: "share",
            title: copy.cards.share.title,
            body: copy.cards.share.body,
            image: {
              src: WORKSPACE_AI_AGENTS_IMAGES.sharedAgent,
              alt: copy.cards.share.imageAlt,
              ...WIDE_BANNER_BASE,
              hiResSrc: sharedHiRes,
            },
          },
        ],
      },
    ],
  };
}
