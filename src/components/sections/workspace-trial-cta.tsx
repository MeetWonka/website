import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { meetingTrackProps } from "@/lib/meeting-track";
import { cn } from "@/lib/utils";

const DEFAULT_TITLE = "Try Wonka Workspace for free.";
const DEFAULT_BODY = "7-day trial. No credit card needed.";
const DEFAULT_CTA_LABEL = "Start free trial";
const DEFAULT_HREF = "https://wonka.chat/register";

interface WorkspaceTrialCtaProps {
  id?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  href?: string;
  className?: string;
}

export function WorkspaceTrialCta({
  id = "try-workspace",
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  ctaLabel = DEFAULT_CTA_LABEL,
  href = DEFAULT_HREF,
  className,
}: WorkspaceTrialCtaProps) {
  return (
    <Section
      id={id}
      className={cn("bg-background py-18 text-center md:py-24", className)}
      containerClassName="max-w-2xl"
    >
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
    </Section>
  );
}
