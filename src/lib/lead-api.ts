import type { LeadSource } from "@/lib/lead-capture";
import type { SanityClient } from "next-sanity";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Ignore repeat submissions with the same email + source within this window. */
export const LEAD_DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

/** Max submissions per IP address within the rate-limit window. */
export const LEAD_RATE_LIMIT_MAX = 5;
export const LEAD_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export function normalizeLeadEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || null;
}

export function isTurnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstileToken(token: unknown): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (typeof token !== "string" || !token.trim()) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  if (!response.ok) return false;

  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

export async function hasRecentDuplicateLead(
  client: SanityClient,
  email: string,
  source: LeadSource,
): Promise<{
  _id: string;
  lifecycleStage?: "lead" | "mql" | "sql";
  qualificationScore?: number;
} | null> {
  const since = new Date(Date.now() - LEAD_DEDUP_WINDOW_MS).toISOString();
  return client.fetch(
    `*[
      _type in ["siteLead", "startAiLead"]
      && email == $email
      && source == $source
      && submittedAt > $since
    ][0]{_id, lifecycleStage, qualificationScore}`,
    { email, source, since },
  );

}

export async function isRateLimited(client: SanityClient, clientIp: string): Promise<boolean> {
  const since = new Date(Date.now() - LEAD_RATE_LIMIT_WINDOW_MS).toISOString();
  const count = await client.fetch<number>(
    `count(*[
      _type == "siteLead"
      && clientIp == $clientIp
      && submittedAt > $since
    ])`,
    { clientIp, since },
  );

  return count >= LEAD_RATE_LIMIT_MAX;
}
