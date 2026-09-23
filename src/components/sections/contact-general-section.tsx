import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { ContactDetail, SectionHeaderData } from "@/lib/types/page-sections";

interface ContactGeneralSectionProps {
  header: SectionHeaderData;
  details: ContactDetail[];
}

function ContactDetailValue({ detail }: { detail: ContactDetail }) {
  const href =
    detail.href ??
    (detail.label.toLowerCase().includes("email")
      ? `mailto:${detail.value}`
      : null);

  if (href) {
    return (
      <Link
        href={href}
        className="type-body text-text transition-opacity hover:opacity-70"
      >
        {detail.value}
      </Link>
    );
  }

  return <p className="type-body text-text">{detail.value}</p>;
}

export function ContactGeneralSection({
  header,
  details,
}: ContactGeneralSectionProps) {
  return (
    <Section
      className="bg-background py-16 md:py-24"
      containerClassName="max-w-[48rem]"
    >
      <SectionHeader
        align="left"
        bordered
        headingRole="hero"
        headingAs="h1"
        eyebrow={header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined}
        heading={header.heading ?? "Contact"}
        body={header.body ?? undefined}
        headingClassName="text-text"
        bodyClassName="max-w-xl text-text/70 opacity-100"
        className="mb-12"
      />

      {details.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <li
              key={detail._key}
              className={cn(
                "flex flex-col gap-2 border border-dashed border-border bg-light-gray p-5",
                radius.sm,
              )}
            >
              <span className="type-eyebrow text-light-brown">{detail.label}</span>
              <ContactDetailValue detail={detail} />
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
