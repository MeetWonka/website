import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BadgeGdpr } from "@/components/ui/icons/badge-gdpr";
import { BadgeIso } from "@/components/ui/icons/badge-iso";
import { BadgeNis2 } from "@/components/ui/icons/badge-nis2";
import { DEFAULT_SECURITY, resolveSecuritySection } from "@/lib/cms-sections";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";
import type { SecurityData } from "@/lib/types";

interface SecurityProps {
  id?: string;
  data?: SecurityData | null;
  defaults?: SecurityData;
}

export function Security({ id, data, defaults = DEFAULT_SECURITY }: SecurityProps) {
  const { eyebrow, heading, body } = resolveSecuritySection(data, defaults);

  return (
    <Section id={id} wide className="bg-background">
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
            {eyebrow ? <Eyebrow className="text-white/65">{eyebrow}</Eyebrow> : null}
            <h2 className={headingClass.section}>{heading}</h2>
            {body ? (
              <p className={cn("type-body text-white/70")}>{body}</p>
            ) : null}
          </div>
          <ul className="grid grid-cols-3">
            <li className="flex min-h-40 items-center justify-center border border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeGdpr className="size-16 md:size-31" />
            </li>
            <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeIso className="size-16 md:size-31" />
            </li>
            <li className="flex min-h-40 items-center justify-center border border-l-0 border-dashed border-white/40 px-3 py-2.5 md:min-h-[14.4375rem] md:px-7">
              <BadgeNis2 className="size-16 md:size-31" />
            </li>
          </ul>
        </div>
      </Surface>
    </Section>
  );
}
