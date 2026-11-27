"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { headingClass } from "@/lib/design-tokens";
import type { WorkspaceProductsData } from "@/lib/page-defaults/workspace-products";

interface WorkspaceProductCarouselProps {
  data: WorkspaceProductsData;
  id?: string;
  className?: string;
}

function ProductCard({
  title,
  body,
  href,
  ctaLabel,
  image,
}: WorkspaceProductsData["products"][number]) {
  return (
    <Surface
      variant="card"
      className="flex h-full flex-col overflow-hidden bg-mid-gray"
    >
      <div className="relative h-[16rem] shrink-0 overflow-hidden border-b border-dashed border-border bg-light-gray md:h-[18rem] lg:h-[19rem] xl:h-[20rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className={headingClass.card}>{title}</h3>
        <p className="mt-3 type-paragraph-m text-text/65">{body}</p>
        {href && ctaLabel ? (
          <div className="mt-auto pt-6">
            <ButtonLink href={href} variant="secondary" className="w-full">
              {ctaLabel}
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </Surface>
  );
}

export function WorkspaceProductCarousel({
  data,
  id,
  className,
}: WorkspaceProductCarouselProps) {
  return (
    <Section id={id} className={className ?? "py-18 md:py-24"}>
      <ScrollReveal>
        <SectionHeader
          align="left"
          className="max-w-2xl"
          heading={data.heading}
          headingRole="subsection"
        />
      </ScrollReveal>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {data.products.map((product, index) => (
          <li key={product.title} className="min-w-0">
            <ScrollReveal delay={0.06 + index * 0.06}>
              <ProductCard {...product} />
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
