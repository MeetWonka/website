import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkVariant = "dark" | "light";

const MARK_SRC: Record<LogoMarkVariant, string> = {
  dark: "/images/brand/wonka-logo-mark-transparent.png",
  light: "/images/brand/wonka-logo-mark-white-transparent.png",
};

export function LogoMark({
  className,
  style,
  variant = "dark",
}: {
  className?: string;
  style?: React.CSSProperties;
  variant?: LogoMarkVariant;
}) {
  return (
    <Image
      src={MARK_SRC[variant]}
      alt=""
      width={137}
      height={150}
      className={cn("block aspect-[137/150] h-[3.9375rem] w-auto shrink-0", className)}
      style={style}
      aria-hidden
    />
  );
}
