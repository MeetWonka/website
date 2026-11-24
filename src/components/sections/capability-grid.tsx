import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type {
  AiChatCapabilityClustersData,
  CapabilityGridCard,
  CapabilityGridImage,
  CapabilityGridTextLink,
} from "@/lib/page-defaults/ai-chat-capability-grid";
import { ConnectorsVisual } from "@/components/sections/connectors-visual";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const CARD_STAGGER = 0.06;

interface CapabilityGridProps {
  data: AiChatCapabilityClustersData;
  id?: string;
  className?: string;
}

type ClusterLayout =
  | "two-top"
  | "two-bottom"
  | "workspace-features"
  | "four-grid";

function visualClass(tall: boolean) {
  return cn(
    "relative w-full shrink-0 overflow-hidden border-b border-dashed border-border bg-light-gray",
    tall ? "h-[20rem] md:h-[30rem]" : "h-[18rem] md:h-[26rem]",
  );
}

function isValidImageDimensions(width: number, height: number) {
  return width > 0 && height > 0 && width <= 8192 && height <= 8192;
}

function connectorsVisualClass(tall: boolean, denseGrid?: boolean) {
  return cn(
    "relative isolate z-0 w-full shrink-0 overflow-hidden border-b border-dashed border-border bg-border",
    denseGrid
      ? tall
        ? "h-[17rem] md:h-[32rem]"
        : "h-[15rem] md:h-[28rem]"
      : tall
        ? "h-[22rem] md:h-[32rem]"
        : "h-[20rem] md:h-[28rem]",
  );
}

function linkifyBody(body: string, links: CapabilityGridTextLink[]) {
  if (!links.length) {
    return body;
  }

  const pattern = links
    .map((link) => link.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = body.split(new RegExp(`(${pattern})`));

  return parts.map((part, index) => {
    const match = links.find((link) => link.label === part);
    if (!match) {
      return part;
    }

    return (
      <Link
        key={`${match.href}-${index}`}
        href={match.href}
        className="underline underline-offset-4"
      >
        {match.label}
      </Link>
    );
  });
}

function CardCopy({
  title,
  body,
  bodyLinks,
  footerLink,
}: {
  title: string;
  body?: string;
  bodyLinks?: CapabilityGridTextLink[];
  footerLink?: CapabilityGridTextLink;
}) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <h3 className={headingClass.card}>{title}</h3>
      {body ? (
        <p className="mt-3 type-paragraph-m text-text/65">
          {bodyLinks?.length ? linkifyBody(body, bodyLinks) : body}
        </p>
      ) : null}
      {footerLink ? (
        <Link
          href={footerLink.href}
          className="mt-3 type-paragraph-m text-text underline underline-offset-4"
        >
          {footerLink.label}
        </Link>
      ) : null}
    </div>
  );
}

function CardImage({
  image,
  tall,
}: {
  image: CapabilityGridImage;
  tall: boolean;
}) {
  const cover = image.fit !== "contain";
  const useAspect = isValidImageDimensions(image.width, image.height);

  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden border-b border-dashed border-border bg-light-gray",
        !useAspect && visualClass(tall),
      )}
      style={
        useAspect
          ? { aspectRatio: `${image.width} / ${image.height}` }
          : undefined
      }
    >
      {/* Static `/images/*` assets: native img avoids Next/Image + broken 2x srcSet when @2x was missing. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- marketing PNGs from public/ */}
      <img
        alt={image.alt}
        src={image.src}
        srcSet={
          image.hiResSrc
            ? `${image.src} 1x, ${image.hiResSrc} 2x`
            : undefined
        }
        className={cn(
          "absolute inset-0 size-full object-center",
          cover ? "object-cover" : "object-contain",
        )}
        style={
          image.objectPosition ? { objectPosition: image.objectPosition } : undefined
        }
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function CardVisual({ card, tall }: { card: CapabilityGridCard; tall: boolean }) {
  if (card.image) {
    return <CardImage image={card.image} tall={tall} />;
  }

  if (card.connectors?.length) {
    const denseGrid = card.connectors.length >= 15;
    return (
      <ConnectorsVisual
        items={card.connectors}
        visualClassName={connectorsVisualClass(tall, denseGrid)}
      />
    );
  }

  return <div className={visualClass(tall)} aria-hidden />;
}

function CapabilityCard({
  card,
  tall = false,
}: {
  card: CapabilityGridCard;
  tall?: boolean;
}) {
  return (
    <Surface
      variant="card"
      className="flex h-full flex-col overflow-hidden bg-mid-gray"
    >
      <CardVisual card={card} tall={tall} />
      <CardCopy
        title={card.title}
        body={card.body}
        bodyLinks={card.bodyLinks}
        footerLink={card.footerLink}
      />
    </Surface>
  );
}

function RevealCard({
  card,
  tall = false,
  delay = 0,
}: {
  card: CapabilityGridCard | undefined;
  tall?: boolean;
  delay?: number;
}) {
  if (!card) {
    return null;
  }

  return (
    <ScrollReveal delay={delay}>
      <CapabilityCard card={card} tall={tall} />
    </ScrollReveal>
  );
}

function ClusterHeading({ heading }: { heading: string }) {
  return (
    <ScrollReveal>
      <SectionHeader
        align="left"
        className="max-w-2xl"
        heading={heading}
        headingRole="subsection"
      />
    </ScrollReveal>
  );
}

function renderWorkspaceFeaturesLayout(cards: CapabilityGridCard[]) {
  const [first, second, third, fourth, fifth, sixth] = cards;
  let index = 0;

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <RevealCard card={first} delay={CARD_STAGGER * index++} />
        <RevealCard card={second} delay={CARD_STAGGER * index++} />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <RevealCard card={third} tall delay={CARD_STAGGER * index++} />
        </div>
      </div>
      {fourth || fifth ? (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <RevealCard card={fourth} delay={CARD_STAGGER * index++} />
          <RevealCard card={fifth} delay={CARD_STAGGER * index++} />
        </div>
      ) : null}
      {sixth ? (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <RevealCard card={sixth} tall delay={CARD_STAGGER * index++} />
          </div>
        </div>
      ) : null}
    </>
  );
}

function CapabilityCluster({
  heading,
  cards,
  layout,
}: {
  heading: string;
  cards: CapabilityGridCard[];
  layout: ClusterLayout;
}) {
  if (layout === "workspace-features") {
    return (
      <Section className={heading ? "py-18 md:py-24" : "py-0"}>
        {heading ? <ClusterHeading heading={heading} /> : null}
        {renderWorkspaceFeaturesLayout(cards)}
      </Section>
    );
  }

  if (layout === "four-grid") {
    return (
      <Section className={heading ? "py-18 md:py-24" : "py-0"}>
        {heading ? <ClusterHeading heading={heading} /> : null}
        <div
          className={cn(
            "grid grid-cols-1 gap-5 md:grid-cols-2",
            heading ? "mt-10" : "mt-6",
          )}
        >
          {cards.map((card, cardIndex) => (
            <RevealCard
              key={card.id}
              card={card}
              delay={cardIndex * CARD_STAGGER}
            />
          ))}
        </div>
      </Section>
    );
  }

  const cardGroups = Array.from(
    { length: Math.ceil(cards.length / 3) },
    (_, index) => cards.slice(index * 3, index * 3 + 3),
  ).filter((group) => group.length === 3);

  function renderGroup(group: CapabilityGridCard[], groupIndex: number) {
    const [first, second, third] = group;
    const baseDelay = groupIndex * 3 * CARD_STAGGER;

    if (layout === "two-top") {
      return (
        <div
          key={groupIndex}
          className={cn(
            "grid grid-cols-1 gap-5 md:grid-cols-2",
            groupIndex === 0 ? (heading ? "mt-10" : "mt-6") : "mt-5",
          )}
        >
          <RevealCard card={first} delay={baseDelay} />
          <RevealCard card={second} delay={baseDelay + CARD_STAGGER} />
          <div className="md:col-span-2">
            <RevealCard card={third} tall delay={baseDelay + CARD_STAGGER * 2} />
          </div>
        </div>
      );
    }

    return (
      <div
        key={groupIndex}
        className={cn(
          "grid grid-cols-1 gap-5 md:grid-cols-2",
          groupIndex === 0 ? (heading ? "mt-10" : "mt-6") : "mt-5",
        )}
      >
        <div className="md:col-span-2">
          <RevealCard card={first} tall delay={baseDelay} />
        </div>
        <RevealCard card={second} delay={baseDelay + CARD_STAGGER} />
        <RevealCard card={third} delay={baseDelay + CARD_STAGGER * 2} />
      </div>
    );
  }

  return (
    <Section className={heading ? "py-18 md:py-24" : "py-0"}>
      {heading ? <ClusterHeading heading={heading} /> : null}

      {cardGroups.map((group, groupIndex) => renderGroup(group, groupIndex))}
    </Section>
  );
}

export function CapabilityGrid({ data, id, className }: CapabilityGridProps) {
  return (
    <div id={id} className={className}>
      {data.clusters.map((cluster, index) => (
        <CapabilityCluster
          key={cluster.heading}
          heading={cluster.heading}
          cards={cluster.cards}
          layout={
            cluster.layout ?? (index % 2 === 0 ? "two-top" : "two-bottom")
          }
        />
      ))}
    </div>
  );
}
