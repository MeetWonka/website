"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { LogoMark } from "@/components/ui/logo-mark";
import { FadeIn } from "@/components/animations/fade-in";
import { CountUp } from "@/components/animations/count-up";

export function Stats({ id }: { id?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Section id={id} wide className="bg-background">
      <Surface variant="panel" className="p-5 text-white">
        <Image
          src="/images/banner-bg.avif"
          alt=""
          fill
          sizes="(min-width: 89rem) 89rem, 100vw"
          className="object-cover"
        />
        <ul
          ref={ref}
          className="relative grid grid-cols-1 rounded-sm border border-dashed border-white/40 md:grid-cols-3"
        >
          <li className="flex min-h-[14.4375rem] flex-col items-start justify-between gap-6 p-7.5">
            <CountUp
              from={20}
              to={50}
              suffix="%"
              duration={1.6}
              play={inView}
              className="type-h1 whitespace-nowrap tabular-nums"
            />
            <p className="type-paragraph-m max-w-[16.1875rem]">
              50% time reduction on support emails across +70 employees at
              N-allo (Engie)
            </p>
          </li>
          <li className="flex min-h-[14.4375rem] flex-col items-start justify-between gap-6 border-t border-dashed border-white/40 p-7.5 md:border-t-0 md:border-l">
            <FadeIn play={inView} duration={0.5} y={20}>
              <span className="type-h1 whitespace-nowrap">100%</span>
            </FadeIn>
            <p className="type-paragraph-m max-w-[16.875rem]">
              Every Itzu employee has access to their personal WonkaChat that saves them multiple hours each week.
            </p>
          </li>
          <li className="flex min-h-[14.4375rem] flex-col items-start justify-between gap-6 border-t border-dashed border-white/40 p-7.5 md:border-t-0 md:border-l">
            <LogoMark variant="light" />
            <p className="type-paragraph-m max-w-[14.5625rem]">
              With Wonka, your usual working day is finished at 3 pm.
            </p>
          </li>
        </ul>
      </Surface>
    </Section>
  );
}
