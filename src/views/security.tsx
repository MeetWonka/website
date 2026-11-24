import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import type { Locale } from "@/i18n/config";
import { headingClass } from "@/lib/design-tokens";
import { buildCommercialMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { SECURITY_COPY } from "@/views/copy/security";

export async function securityMetadata(locale: Locale): Promise<Metadata> {
  const { seo } = SECURITY_COPY[locale];
  return buildCommercialMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    "security",
    locale,
    seo.title,
  );
}

export async function SecurityView({ locale }: { locale: Locale }) {
  const copy = SECURITY_COPY[locale];
  const certificationItems = [
    { icon: BadgeIso, ...copy.certificationItems.iso },
    { icon: BadgeGdpr, ...copy.certificationItems.gdpr },
  ];

  return (
    <main className="bg-background text-text">
      <Section className="py-12 pt-24 md:py-16 md:pt-28" containerClassName="max-w-[48rem]">
        <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
        <h1 className={cn(headingClass.hero, "mt-5")}>{copy.hero.title}</h1>
        <p className="type-body mt-6 text-text/70">{copy.hero.body}</p>
      </Section>

      <Section wide className="bg-background pb-12 md:pb-16">
        <Surface variant="panel" className="bg-blue-900 p-7.5 text-white md:p-12">
          <Image
            src="/images/security/banner-bg.avif"
            alt=""
            fill
            sizes="(min-width: 89rem) 89rem, 100vw"
            className="object-cover mix-blend-luminosity"
          />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-5">
            <div className="flex max-w-[35.125rem] flex-col gap-5">
              <h2 className={headingClass.section}>{copy.certifications.heading}</h2>
              <p className={cn("type-body text-white/70")}>{copy.certifications.body}</p>
            </div>
            <ul className="grid grid-cols-2">
              <li className="flex min-h-40 items-center justify-center border border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
                <BadgeGdpr className="size-16 md:size-31" />
              </li>
              <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
                <BadgeIso className="size-16 md:size-31" />
              </li>
            </ul>
          </div>
        </Surface>
      </Section>

      <Section className="py-12 md:py-16" containerClassName="max-w-[64rem]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          {certificationItems.map((cert) => {
            const Icon = cert.icon;
            return (
              <Surface key={cert.label} variant="card" className="p-6 md:p-7">
                <Icon className="size-12 text-accent" />
                <h3 className={cn(headingClass.card, "mt-5")}>{cert.label}</h3>
                <p className="type-paragraph-m mt-3 text-text/62">{cert.detail}</p>
              </Surface>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-dashed border-border bg-mid-gray py-12 md:py-16">
        <h2 className={cn(headingClass.section, "mb-10")}>{copy.practices.heading}</h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {copy.securityFeatures.map((feature) => (
            <div key={feature.title}>
              <h3 className={cn(headingClass.subsection)}>{feature.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {feature.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="type-paragraph-m text-text/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border py-12 md:py-16" containerClassName="max-w-[48rem]">
        <h2 className={cn(headingClass.section)}>{copy.clarifications.heading}</h2>
        <div className="mt-8 type-body text-text/70">
          <p>
            <strong className="text-text">{copy.clarifications.label}</strong>{" "}
            {copy.clarifications.body}
          </p>
        </div>
      </Section>

      <Section className="border-t border-dashed border-border py-12 md:py-16" containerClassName="max-w-[48rem]">
        <h2 className={cn(headingClass.section)}>{copy.legal.heading}</h2>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 type-body">
          <Link href="/privacy" className="text-accent underline hover:no-underline">
            {copy.legal.privacy}
          </Link>
          <Link href="/terms" className="text-accent underline hover:no-underline">
            {copy.legal.terms}
          </Link>
          <Link href="/cookies" className="text-accent underline hover:no-underline">
            {copy.legal.cookies}
          </Link>
        </div>
        <p className="mt-5 type-body text-text/70">{copy.legal.dpa}</p>
      </Section>
    </main>
  );
}
