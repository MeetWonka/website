import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import type {
  AiChatCapabilityClustersData,
  CapabilityGridImage,
} from "@/lib/page-defaults/ai-chat-capability-grid";
import { WORKSPACE_COPY, type WorkspaceCopy } from "@/views/copy/workspace";

const CAPABILITY_IMAGE = {
  width: 3200,
  height: 1800,
  fit: "cover" as const,
};

type CardId = keyof WorkspaceCopy["capabilities"]["cards"];

const WORKSPACE_FEATURE_IMAGES: Array<{
  id: CardId;
  image: Omit<CapabilityGridImage, "alt">;
}> = [
  {
    id: "connected-tools",
    image: {
      src: "/images/workspace/capabilities/connected-to-your-tools.png",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "set-up-per-team",
    image: {
      src: "/images/workspace/capabilities/set-up-per-team.png",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "human-approves",
    image: {
      src: "/images/workspace/capabilities/a-human-approves.png",
      ...CAPABILITY_IMAGE,
    },
  },
  {
    id: "your-model-choice",
    image: {
      src: "/images/workspace/capabilities/your-model-your-choice.png",
      width: 4000,
      height: 1800,
      fit: "cover",
    },
  },
  {
    id: "workflow-templates",
    image: {
      src: "/images/workspace/capabilities/workflow-templates-included.png",
      ...CAPABILITY_IMAGE,
    },
  },
];

export function getWorkspaceCapabilityClusters(
  locale: Locale,
): AiChatCapabilityClustersData {
  const copy = WORKSPACE_COPY[locale].capabilities;

  return {
    clusters: [
      {
        heading: copy.heading,
        layout: "workspace-features",
        cards: WORKSPACE_FEATURE_IMAGES.map(({ id, image }) => {
          const cardCopy = copy.cards[id];
          const footerLabel = cardCopy.footerLink;

          return {
            id,
            title: cardCopy.title,
            body: cardCopy.body,
            image: { ...image, alt: cardCopy.alt },
            ...(footerLabel
              ? {
                  footerLink: {
                    label: footerLabel,
                    href: localizeHref("/workspace/governance", locale),
                  },
                }
              : {}),
          };
        }),
      },
    ],
  };
}
