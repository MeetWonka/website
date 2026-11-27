import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { WORKSPACE_COPY } from "@/views/copy/workspace";

export interface WorkspaceProductCard {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface WorkspaceProductsData {
  heading: string;
  body: string | null;
  products: WorkspaceProductCard[];
}

export function getWorkspaceProducts(locale: Locale): WorkspaceProductsData {
  const copy = WORKSPACE_COPY[locale].products;

  return {
    heading: copy.heading,
    body: null,
    products: [
      {
        title: copy.aiChat.title,
        body: copy.aiChat.body,
        href: localizeHref("/workspace/ai-chat", locale),
        ctaLabel: copy.aiChat.ctaLabel,
        image: {
          src: "/images/workspace/features/ai-chat-feature.png",
          alt: copy.aiChat.alt,
        },
      },
      {
        title: copy.aiAgents.title,
        body: copy.aiAgents.body,
        href: localizeHref("/workspace/ai-agents", locale),
        ctaLabel: copy.aiAgents.ctaLabel,
        image: {
          src: "/images/workspace/features/ai-agents-feature.png",
          alt: copy.aiAgents.alt,
        },
      },
    ],
  };
}
