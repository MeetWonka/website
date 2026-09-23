import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type {
  AiChatCapabilityClustersData,
  CapabilityGridCard,
  CapabilityGridConnector,
  CapabilityGridImage,
  CapabilityGridTextLink,
} from "@/lib/page-defaults/ai-chat-capability-grid";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface CapabilityGridProps {
  data: AiChatCapabilityClustersData;
  id?: string;
  className?: string;
}

type ClusterLayout = "two-top" | "two-bottom";

function visualClass(tall: boolean) {
  return cn(
    "relative w-full shrink-0 overflow-hidden border-b border-dashed border-border bg-light-gray",
    tall ? "h-[20rem] md:h-[30rem]" : "h-[18rem] md:h-[26rem]",
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
  const cover = image.fit === "cover";

  return (
    <div className={visualClass(tall)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={
          tall
            ? "(min-width: 768px) 84rem, 100vw"
            : "(min-width: 768px) 42vw, 100vw"
        }
        className={cn(
          "object-center",
          cover ? "object-cover" : "object-contain p-4 md:p-6",
        )}
        unoptimized
      />
    </div>
  );
}

function ConnectorsVisual({
  items,
  tall,
}: {
  items: CapabilityGridConnector[];
  tall: boolean;
}) {
  return (
    <div
      className={cn(visualClass(tall), "grid grid-cols-3 gap-px bg-border p-0")}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className="flex h-full min-h-0 items-center justify-center bg-light-gray p-2"
        >
          <Image
            src={item.logo}
            alt={item.name}
            width={72}
            height={28}
            className="max-h-7 w-auto max-w-[4.5rem] object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function CardVisual({ card, tall }: { card: CapabilityGridCard; tall: boolean }) {
  if (card.image) {
    return <CardImage image={card.image} tall={tall} />;
  }

  if (card.connectors?.length) {
    return <ConnectorsVisual items={card.connectors} tall={tall} />;
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

function CapabilityCluster({
  heading,
  cards,
  layout,
}: {
  heading: string;
  cards: CapabilityGridCard[];
  layout: ClusterLayout;
}) {
  const [first, second, third] = cards;

  return (
    <Section className="py-18 md:py-24">
      <SectionHeader
        align="left"
        className="max-w-2xl"
        heading={heading}
        headingRole="subsection"
      />

      {layout === "two-top" ? (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <CapabilityCard card={first} />
          <CapabilityCard card={second} />
          <div className="md:col-span-2">
            <CapabilityCard card={third} tall />
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <CapabilityCard card={first} tall />
          </div>
          <CapabilityCard card={second} />
          <CapabilityCard card={third} />
        </div>
      )}
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
          layout={index % 2 === 0 ? "two-top" : "two-bottom"}
        />
      ))}
    </div>
  );
}
