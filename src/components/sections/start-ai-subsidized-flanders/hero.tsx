import { FLANDERS_SUBSIDY_URL } from "@/components/sections/start-ai-subsidized-flanders/constants";
import { ButtonLink } from "@/components/ui/button";

import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";

import { Section } from "@/components/ui/section";

import { Surface } from "@/components/ui/surface";

import { headingClass } from "@/lib/design-tokens";

import { cn } from "@/lib/utils";



const BENEFITS = [

  {

    _key: "tasks",

    prefix: "Voltooien ",

    highlight: "12% meer taken",

  },

  {

    _key: "speed",

    prefix: "Behalen ",

    highlight: "25% sneller resultaten",

  },

  {

    _key: "quality",

    prefix: "Leveren werk van ",

    highlight: "40% hogere kwaliteit",

  },

] as const;



export function StartAiSubsidizedFlandersHero() {

  return (

    <Section

      className="pb-14 pt-24 md:pb-20 md:pt-28"

      aria-labelledby="start-ai-subsidized-flanders-hero-heading"

    >

      <div className="grid gap-10 md:grid-cols-[1.35fr_1fr] md:items-center md:gap-12 lg:gap-16">

        <div className="flex flex-col gap-6">

          <h1

            id="start-ai-subsidized-flanders-hero-heading"

            className={cn(

              headingClass.section,

              "max-w-[22ch] text-balance text-text",

            )}

          >

            Zet uw bedrijf in een hogere versnelling met AI.

          </h1>

          <p className="max-w-xl type-body text-text/70">
            <strong className="font-medium text-text">
              Start AI is ons vlaggenschipprogramma waarmee we al meer dan 150
              KMO&apos;s succesvol hebben begeleid om met AI aan de slag te gaan.
            </strong>{" "}
            Na het programma bent u geïnspireerd en getraind, kent u de juiste
            tools en hebt u de basis gelegd voor veilige en ethische
            AI-gedreven procesoptimalisatie in uw bedrijf.
          </p>

          <div className="pt-1">

            <ButtonLink
              href={FLANDERS_SUBSIDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              70% subsidie aanvragen voor KMO&apos;s
            </ButtonLink>

          </div>

        </div>



        <Surface

          variant="card"

          className="flex flex-col justify-center border border-border bg-light-gray px-6 py-8 md:px-8 md:py-10"

        >

          <p className="type-h6 text-blue-900">Organisaties die AI gebruiken:</p>

          <ul className="mt-5 flex flex-col gap-4">

            {BENEFITS.map((benefit) => (

              <li key={benefit._key} className="flex items-start gap-3.5">

                <span

                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-900"

                  aria-hidden

                >

                  <CheckmarkIcon className="size-2.5" />

                </span>

                <p className="type-paragraph-m text-text/70">

                  {benefit.prefix}

                  <strong className="font-medium text-text">

                    {benefit.highlight}

                  </strong>

                </p>

              </li>

            ))}

          </ul>

        </Surface>

      </div>

    </Section>

  );

}


