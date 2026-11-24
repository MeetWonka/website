import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { meetingTrackProps } from "@/lib/meeting-track";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";

const DEFAULT_HREF = "https://wonka.chat/register";

interface WorkspaceTrialCtaProps {
  id?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  href?: string;
  className?: string;
  locale?: Locale;
}

export function WorkspaceTrialCta({
  id = "try-workspace",
  title: titleProp,
  body: bodyProp,
  ctaLabel: ctaLabelProp,
  href = DEFAULT_HREF,
  className,
  locale = "en",
}: WorkspaceTrialCtaProps) {
  const t = getT(locale);
  const title = titleProp ?? t("sections.workspaceTrialCta.title");
  const body = bodyProp ?? t("sections.workspaceTrialCta.body");
  const ctaLabel = ctaLabelProp ?? t("common.startFreeTrial");
  return (
    <Section
      id={id}
      className={cn("bg-background py-18 text-center md:py-24", className)}
      containerClassName="max-w-2xl"
    >
      <ScrollReveal>
        <SectionHeader
          align="center"
          heading={title}
          body={body}
          bodyClassName="mx-auto max-w-xl type-body text-text/65 opacity-100"
        />
        <div className="mt-8">
          <ButtonLink
            href={href}
            variant="primary"
            {...meetingTrackProps("wonka-chat")}
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      </ScrollReveal>
    </Section>
  );
}
