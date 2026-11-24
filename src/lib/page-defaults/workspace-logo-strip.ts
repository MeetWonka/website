import type { Locale } from "@/i18n/config";
import type { LogoStripResolved } from "@/lib/types/page-sections";
import { WORKSPACE_COPY } from "@/views/copy/workspace";

const WORKSPACE_LOGOS: LogoStripResolved["fallbackLogos"] = [
  {
    src: "/images/workspace/logos/senitas.png",
    alt: "Senitas",
    width: 120,
    height: 68,
  },
  {
    src: "/images/workspace/logos/haelvoet.png",
    alt: "Haelvoet",
    width: 120,
    height: 68,
  },
  {
    src: "/images/workspace/logos/gerantis.png",
    alt: "Gerantis",
    width: 120,
    height: 68,
  },
  {
    src: "/images/workspace/logos/itzu.png",
    alt: "itzu",
    width: 120,
    height: 68,
  },
  {
    src: "/images/workspace/logos/ingenium-group.png",
    alt: "Ingenium Group",
    width: 120,
    height: 68,
  },
  {
    src: "/images/workspace/logos/respace.png",
    alt: "Respace",
    width: 120,
    height: 68,
  },
];

export function getWorkspaceLogoStrip(locale: Locale): LogoStripResolved {
  return {
    logos: null,
    proofLines: WORKSPACE_COPY[locale].proofLines,
    fallbackLogos: WORKSPACE_LOGOS,
  };
}
