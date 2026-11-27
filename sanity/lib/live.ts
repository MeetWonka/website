import { defineLive } from "next-sanity/live";
import { client } from "./client";

const serverToken =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN ||
  false;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken,
  browserToken: false,
});
