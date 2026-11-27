import { getSiteUrl } from "@/lib/site-url";

const INDEXNOW_API = "https://api.indexnow.org/indexnow";

function getKey(): string | null {
  return process.env.INDEXNOW_KEY ?? null;
}

function getSiteUrls(): string[] {
  const base = getSiteUrl();
  return [base, `${base}/terms`, `${base}/privacy`, `${base}/cookies`];
}

// Serves the key file for IndexNow verification
export async function GET() {
  const key = getKey();
  if (!key) {
    return new Response("INDEXNOW_KEY not set", { status: 500 });
  }
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// Sanity webhook: submits all URLs to IndexNow on content change
export async function POST(request: Request) {
  const key = getKey();
  if (!key) {
    return Response.json({ error: "INDEXNOW_KEY not set" }, { status: 500 });
  }

  // Validate webhook secret if configured
  const secret = process.env.INDEXNOW_WEBHOOK_SECRET;
  if (secret) {
    const signature = request.headers.get("sanity-webhook-signature") ?? "";
    if (!signature.includes(secret)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const siteUrl = getSiteUrl();
  const host = new URL(siteUrl).hostname;
  const keyLocation = `${siteUrl}/api/indexnow`;

  const res = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: getSiteUrls(),
    }),
  });

  return Response.json({ submitted: res.status === 200 || res.status === 202 }, {
    status: res.ok ? 200 : 502,
  });
}
