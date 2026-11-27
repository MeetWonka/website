import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { radius } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import { cn } from "@/lib/utils";
import type {
  ContactPersonResolved,
  SectionHeaderData,
} from "@/lib/types/page-sections";

interface ContactTeamSectionProps {
  header: SectionHeaderData;
  people: ContactPersonResolved[];
}

function ContactPersonCard({ person }: { person: ContactPersonResolved }) {
  const fallback = person.fallbackPortrait ?? { src: "", alt: "" };
  const portraitSrc = resolveImageSrc(person.portrait, fallback);
  const portraitAlt = resolveImageAlt(person.portrait, fallback);

  return (
    <article
      className={cn(
        "flex flex-col items-center gap-4 border border-dashed border-border bg-background p-6 text-center",
        radius.sm,
      )}
    >
      {portraitSrc ? (
        <div
          className={cn(
            "relative h-24 w-24 overflow-hidden ring-4 ring-border",
            radius.full,
          )}
        >
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            fill
            sizes="96px"
            className="object-cover object-top"
            unoptimized={!hasSanityImage(person.portrait)}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-1">
        <h3 className="type-body font-medium text-text">{person.name}</h3>
        {person.role ? (
          <p className="type-paragraph-s text-light-brown">{person.role}</p>
        ) : null}
      </div>

      {person.email ? (
        <Link
          href={`mailto:${person.email}`}
          className="type-paragraph-m-bold text-text underline-offset-4 transition-opacity hover:underline hover:opacity-70"
        >
          {person.email}
        </Link>
      ) : null}
    </article>
  );
}

export function ContactTeamSection({ header, people }: ContactTeamSectionProps) {
  if (!people.length) return null;

  return (
    <Section
      className="border-t border-dashed border-border bg-background py-16 md:py-24"
      containerClassName="max-w-[48rem]"
    >
      <SectionHeader
        align="left"
        eyebrow={header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined}
        heading={header.heading ?? "Team"}
        body={header.body ?? undefined}
        headingClassName="text-text"
        bodyClassName="max-w-xl text-text/70 opacity-100"
        className="mb-10"
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((person) => (
          <li key={person._key}>
            <ContactPersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
