"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Autoplays only while visible, so off-screen clips cost nothing. */
export function ClipVideo({
  src,
  poster,
  className,
  loop = true,
  onTime,
  onEnded,
}: {
  src: string;
  poster: string;
  className?: string;
  loop?: boolean;
  onTime?: (progress: number) => void;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduce) {
      video.muted = true;
      void video.play().catch(() => undefined);
    } else video.pause();
  }, [inView, reduce, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      onTimeUpdate={
        onTime
          ? () => {
              const v = ref.current;
              if (!v?.duration) return;
              onTime(v.currentTime / v.duration);
            }
          : undefined
      }
      onEnded={onEnded}
    />
  );
}
