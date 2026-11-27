import { createClient } from "next-sanity";

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return null;
  }

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2026-03-01",
    useCdn: false,
    token,
  });
}
