import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";

import { Eyebrow } from "@/components/ui/eyebrow";

import { Section } from "@/components/ui/section";

import { Surface } from "@/components/ui/surface";

import { FLANDERS_SUBSIDY_ELIGIBILITY_URL, FLANDERS_SUBSIDY_URL } from "@/components/sections/start-ai-subsidized-flanders/constants";

import {

  StepList,

  type ProgramStep,

} from "@/components/sections/start-ai-subsidized-flanders/program-overview-block";

import {

  DocumentPlusIcon,

  LightningIcon,

  LockIcon,

} from "@/components/sections/start-ai-subsidized-flanders/program-step-icons";

import { headingClass } from "@/lib/design-tokens";

import { cn } from "@/lib/utils";



const JOURNEY_STEPS: ProgramStep[] = [

  {

    _key: "culture",

    title: "Verander uw cultuur",

    body: "Creëer een bottom-upcultuur waarin iedereen zich gesteund voelt om te experimenteren met AI-tools. Door AI te demystificeren, empoweren we uw team om zonder angst te innoveren.",

    Icon: LockIcon,

  },

  {

    _key: "roadmap",

    title: "Krijg een concrete roadmap",

    body: "Bouw een solide basis voor een op maat gemaakt AI-ontwikkelingsplan. Start AI zorgt ervoor dat u begrijpt hoe AI ingezet moet worden om uw doelstellingen te bereiken.",

    Icon: LightningIcon,

  },

  {

    _key: "actions",

    title: "Acties spreken luider dan woorden",

    body: "We hebben meer dan 100 AI-oplossingen op maat gerealiseerd. We tonen u concrete voorbeelden van hoe AI direct impact kan hebben op uw bedrijf, verminderen onzekerheid en vergroten het draagvlak bij stakeholders.",

    Icon: DocumentPlusIcon,

  },

];



const BENEFITS = [

  "Uw AI-kansen geïdentificeerd en geanalyseerd",

  "Berekening van de ROI van AI-toepassingen",

  "Uw AI-beleid op maat voor uw team",

  "Advies over training, tooling en investeringen",

] as const;



function SubsidyCard() {

  return (

    <Surface

      variant="card"

      className="flex h-full flex-col border border-border bg-background p-6 shadow-[var(--shadow-subtle)] md:p-8"

    >

      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-b border-dashed border-border pb-6">
        <div className="col-start-1 row-start-1 flex min-w-0 flex-wrap items-center gap-3">
          <h3 className={cn(headingClass.card, "text-blue-900")}>
            Vraag de subsidie aan
          </h3>
          <span className="type-eyebrow rounded-full bg-blue-100 px-2.5 py-1 text-blue-900">
            Nieuw
          </span>
        </div>
        <p className="col-start-1 row-start-2 type-paragraph-m text-text/65">
          De meeste Vlaamse KMO&apos;s komen in aanmerking voor 70% subsidie.
        </p>
        <p
          className="col-start-2 row-start-1 row-span-2 self-center type-h3 font-sans leading-none tracking-tight text-blue-900"
          aria-hidden
        >
          70
          <span className="type-h6 font-sans align-top">%</span>
        </p>
      </div>



      <div className="py-6">

        <h4 className="type-paragraph-m-bold text-text">Voordelen</h4>

        <p className="mt-1 type-paragraph-m text-text/65">

          Wat u van ons mag verwachten

        </p>

        <ul className="mt-5 grid gap-4">

          {BENEFITS.map((benefit) => (

            <li key={benefit} className="flex items-start gap-3">

              <span

                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-900"

                aria-hidden

              >

                <CheckmarkIcon className="size-2.5" />

              </span>

              <span className="type-paragraph-m text-text/70">{benefit}</span>

            </li>

          ))}

        </ul>

      </div>



      <div className="mt-auto flex flex-col gap-4 pt-2">

        <div className="flex justify-center">

          <ButtonLink
            href={FLANDERS_SUBSIDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >

            Subsidie aanvragen

          </ButtonLink>

        </div>

        <p className="text-center type-paragraph-s text-text/65">

          De subsidie aanvragen duurt minder dan 5 minuten.{" "}

          <Link
            href={FLANDERS_SUBSIDY_ELIGIBILITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-900 underline underline-offset-4"
          >

            Controleer of u in aanmerking komt

          </Link>

          .

        </p>

      </div>

    </Surface>

  );

}



export function StartAiSubsidizedFlandersJourney() {

  return (

    <Section

      className="pt-10 pb-18 md:pt-14 md:pb-24"

      aria-labelledby="start-ai-journey-heading"

    >

      <div className="mb-12 max-w-2xl md:mb-16">

        <Eyebrow className="text-blue-900">Ons vlaggenschipprogramma.</Eyebrow>

        <h2

          id="start-ai-journey-heading"

          className={cn(headingClass.section, "mt-4 text-text")}

        >

          Begin vandaag aan uw AI-traject

        </h2>

      </div>



      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">

        <StepList steps={JOURNEY_STEPS} />

        <SubsidyCard />

      </div>

    </Section>

  );

}


