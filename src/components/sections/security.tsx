import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SecurityPoints } from "@/components/sections/home-security-banner";
import { DEFAULT_SECURITY, resolveSecuritySection } from "@/lib/cms-sections";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";
import type { SecurityData } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { HOME_V2_COPY } from "@/views/copy/home-v2";

interface SecurityProps {
  id?: string;
  data?: SecurityData | null;
  defaults?: SecurityData;
  locale?: Locale;
}

export function Security({
  id,
  data,
  defaults = DEFAULT_SECURITY,
  locale = "en",
}: SecurityProps) {
  const { eyebrow, heading, body } = resolveSecuritySection(data, defaults);
  const security = HOME_V2_COPY[locale].security;

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
        <div className="relative">
          <div className="border-b border-dashed border-white/40 pb-10">
            <div className="flex max-w-[35.125rem] flex-col gap-5">
              {eyebrow ? <Eyebrow className="text-white/65">{eyebrow}</Eyebrow> : null}
              <h2 className={headingClass.section}>{heading}</h2>
              {body ? (
                <p className={cn("type-body text-white/70")}>{body}</p>
              ) : null}
            </div>
          </div>
          <SecurityPoints
            points={security.points}
            cta={security.cta}
            ctaHref={security.ctaHref}
          />
        </div>
      </Surface>
    </Section>
  );
}
