import Image from "next/image";

import {
  HomeSecurityBanner,
  type HomeSecurityBannerData,
} from "@/components/sections/home-security-banner";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { meetingTrackProps } from "@/lib/meeting-track";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

import type { GovernanceFeatureCard } from "@/lib/page-defaults/workspace-governance-grid";
import { WORKSPACE_GOVERNANCE_IMAGES } from "@/lib/workspace-governance-images";

import type { WorkspaceGovernanceCopy } from "@/views/copy/workspace-governance";

type DeploymentOption = WorkspaceGovernanceCopy["deployment"]["options"][number];



const PAGE_WIDTH = "mx-auto max-w-[1200px] px-6";



function GovernanceFeatureCardItem({ card }: { card: GovernanceFeatureCard }) {

  const fit = card.imageFit ?? "contain";



  return (

    <article className="flex min-h-full flex-col rounded-lg bg-mid-gray p-5">

      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md bg-background">

        <Image

          src={card.imageSrc}

          alt={card.imageAlt}

          fill

          className={cn(

            fit === "cover" ? "object-cover" : "object-contain p-3 md:p-4",

            "object-center",

          )}

          style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}

          sizes="(min-width: 768px) 42vw, 100vw"

          unoptimized

        />

      </div>

      <h3 className="type-body font-medium text-text">{card.title}</h3>

      <p className="mt-2 type-paragraph-m leading-relaxed text-text/60">{card.body}</p>

    </article>

  );

}

function ProviderLogo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={80}
      height={48}
      className={cn("h-5 w-auto max-w-[5rem] object-contain", className)}
      unoptimized
    />
  );
}

function DeploymentVisual({ visual }: { visual: DeploymentOption["visual"] }) {
  if (visual === "multi-cloud") {
    const providers = [
      WORKSPACE_GOVERNANCE_IMAGES.aws,
      WORKSPACE_GOVERNANCE_IMAGES.azure,
      WORKSPACE_GOVERNANCE_IMAGES.gcp,
    ] as const;

    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        {providers.map((src) => (
          <span
            key={src}
            className="flex items-center justify-center rounded-full border border-border bg-background/80 px-2.5 py-1.5"
          >
            <ProviderLogo src={src} />
          </span>
        ))}
      </div>
    );
  }

  if (visual === "on-prem") {
    return (
      <div
        className={cn(
          "flex min-h-[4.5rem] items-center justify-center border border-dashed border-border bg-background/40",
          radius.sm,
        )}
      >
        <span className="type-eyebrow rounded-full border border-border bg-background px-4 py-1.5 text-text/80">
          On-premise
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[4.5rem] items-center justify-center border border-border bg-background/50",
        radius.sm,
      )}
    >
      <ProviderLogo
        src={WORKSPACE_GOVERNANCE_IMAGES.azure}
        className="h-10 max-w-none"
      />
    </div>
  );
}

function DeploymentOptionCard({ option }: { option: DeploymentOption }) {
  const featured = option.featured === true;

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 p-5 md:p-6",
        radius.sm,
        featured ? "bg-blue-100" : "bg-mid-gray",
      )}
    >
      <DeploymentVisual visual={option.visual} />
      <p className="type-paragraph-m text-text/85">
        <span className="font-medium text-text">{option.headline}: </span>
        {option.body}
      </p>
      <span
        className={cn(
          "type-eyebrow mt-auto w-fit rounded-full px-3 py-1.5",
          featured
            ? "bg-blue-900 text-white"
            : "border border-border bg-background text-text/70",
        )}
      >
        {option.tier}
      </span>
    </article>
  );
}

function WorkspaceGovernanceDeployment({
  deployment,
}: {
  deployment: WorkspaceGovernanceCopy["deployment"];
}) {
  return (
    <section className="bg-background py-16 md:py-20">
      <Section>
        <SectionHeader
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow={<Eyebrow>{deployment.eyebrow}</Eyebrow>}
          heading={deployment.title}
          headingRole="section"
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deployment.options.map((option) => (
            <li key={option.id} className="min-h-0">
              <DeploymentOptionCard option={option} />
            </li>
          ))}
        </ul>
      </Section>
    </section>
  );
}

export function WorkspaceGovernancePageSections({

  hero,

  features,

  deployment,

  finalCta,

  meetingUrl,

  trialUrl,

  securityBanner,


}: {

  hero: WorkspaceGovernanceCopy["hero"];

  features: { heading: string; cards: GovernanceFeatureCard[] };

  deployment: WorkspaceGovernanceCopy["deployment"];

  finalCta: WorkspaceGovernanceCopy["finalCta"];

  meetingUrl: string;

  trialUrl: string;

  securityBanner: HomeSecurityBannerData;


}) {

  return (

    <>

      <section>

        <div className={cn(PAGE_WIDTH, "pb-14 pt-32 md:pt-36")}>

          <p className="type-eyebrow text-text/40">{hero.eyebrow}</p>

          <h1 className="mt-4 max-w-4xl type-h2">{hero.title}</h1>

          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">

            {hero.subtitle}

          </p>

          <div className="mt-8">

            <ButtonLink

              href={meetingUrl}

              variant="primary"

              {...meetingTrackProps("wonka-chat")}

            >

              {hero.cta}

            </ButtonLink>

          </div>

        </div>

      </section>



      <section className={cn(PAGE_WIDTH, "py-14 md:py-16")}>

        <h2 className="type-h5 mb-6 max-w-2xl">{features.heading}</h2>

        <div className="grid gap-4 md:grid-cols-2">

          {features.cards.map((card) => (

            <GovernanceFeatureCardItem key={card.id} card={card} />

          ))}

        </div>

      </section>

      <HomeSecurityBanner
        id="security"
        data={securityBanner}
      />

      <WorkspaceGovernanceDeployment deployment={deployment} />

      <section className={cn(PAGE_WIDTH, "pb-20 pt-2")}>

        <div className="rounded-lg border border-border bg-mid-gray p-8 md:p-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">

            <div className="max-w-xl">

              <h2 className="type-h5">{finalCta.title}</h2>

              <p className="mt-3 type-body leading-relaxed text-text/65">

                {finalCta.subtitle}

              </p>

            </div>

            <div className="flex shrink-0 flex-wrap gap-3">

              <ButtonLink href={trialUrl} variant="primary">

                {finalCta.primaryCta}

              </ButtonLink>

              <ButtonLink

                href={meetingUrl}

                variant="secondary"

                className="h-[2.6875rem] px-[1.125rem] type-paragraph-m-bold"

                {...meetingTrackProps("wonka-chat")}

              >

                {finalCta.secondaryCta}

              </ButtonLink>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}


