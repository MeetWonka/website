import { cn } from "@/lib/utils";

const PATH_TILT_RIGHT =
  "M870.884 0.25293L7.80273 22.2002C3.60092 22.3072 0.250239 25.7441 0.25 29.9473V589.794C0.25001 594.074 3.71983 597.544 8 597.544H871.081C875.361 597.544 878.831 594.074 878.831 589.794V8C878.831 3.64264 875.24 0.14216 870.884 0.25293Z";

const PATH_TILT_LEFT =
  "M8.19727 0.25293L871.278 22.2002C875.48 22.3072 878.831 25.7441 878.831 29.9473V589.794C878.831 594.074 875.361 597.544 871.081 597.544H8C3.7198 597.544 0.25 594.074 0.25 589.794V8C0.25 3.64264 3.84131 0.14216 8.19727 0.25293Z";

export type SolutionCardVariant = "card-1" | "card-2" | "card-3";

const VARIANT_CONFIG: Record<
  SolutionCardVariant,
  { path: string; fillClassName: string }
> = {
  "card-1": { path: PATH_TILT_RIGHT, fillClassName: "fill-mid-gray" },
  "card-2": { path: PATH_TILT_LEFT, fillClassName: "fill-light-gray" },
  "card-3": { path: PATH_TILT_RIGHT, fillClassName: "fill-gray" },
};

interface SolutionCardShapeProps {
  variant: SolutionCardVariant;
  className?: string;
}

export function SolutionCardShape({ variant, className }: SolutionCardShapeProps) {
  const { path, fillClassName } = VARIANT_CONFIG[variant];
  return (
    <svg
      viewBox="0 0 880 598"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("absolute inset-0 size-full", className)}
    >
      <path
        d={path}
        className={cn(fillClassName, "stroke-dark-gray")}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
