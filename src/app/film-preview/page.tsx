import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmPreview } from "./film-preview";

export const metadata: Metadata = {
  title: "Agent film preview",
  robots: { index: false, follow: false },
};

/** Fixture showcase of the blueprint agent film. Never served in production. */
export default function Page() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <FilmPreview />;
}
