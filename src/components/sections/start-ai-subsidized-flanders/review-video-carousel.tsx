"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/arrow-right";
import { cn } from "@/lib/utils";

const REVIEW_VIDEOS = [
  {
    id: "R55vQwjZMKw",
    title: "Start AI klantreview",
  },
  {
    id: "O5sSY4PqtKI",
    title: "Start AI klantverhaal",
  },
  {
    id: "jPNi3iCNS6s",
    title: "Start AI klantreview",
  },
] as const;

function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-black shadow-subtle">
      <div className="relative aspect-video">
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function ReviewVideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(updateButtons);
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  return (
    <div className="mt-10 flex items-center gap-3 md:gap-5">
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        aria-label="Vorige video"
        className={cn(
          "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text transition-opacity md:size-14",
          !canPrev && "opacity-30",
        )}
      >
        <ArrowRightIcon className="h-4 w-5 -scale-x-100" />
      </button>

      <div ref={emblaRef} className="min-w-0 flex-1 overflow-hidden">
        <ul className="flex touch-pan-y">
          {REVIEW_VIDEOS.map((video) => (
            <li
              key={video.id}
              className="min-w-0 shrink-0 grow-0 basis-full pr-4 last:pr-0 md:pr-6"
            >
              <YouTubeEmbed videoId={video.id} title={video.title} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        aria-label="Volgende video"
        className={cn(
          "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text transition-opacity md:size-14",
          !canNext && "opacity-30",
        )}
      >
        <ArrowRightIcon className="h-4 w-5" />
      </button>
    </div>
  );
}
