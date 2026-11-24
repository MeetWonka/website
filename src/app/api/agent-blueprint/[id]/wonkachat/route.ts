import { getSanityWriteClient } from "@sanity/lib/write-client";
import { isWonkaChatExportExpired } from "@/lib/agent-blueprint-wonkachat";

export const dynamic = "force-dynamic";

/** Matches the contract shared with WonkaChat's blueprint import. */
const BLUEPRINT_ID_PATTERN =
  /^agent-blueprint\.[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const NO_STORE = { "Cache-Control": "no-store" };

function notFound() {
  return Response.json(
    { error: "not_found" },
    { status: 404, headers: NO_STORE },
  );
}

interface AssessmentExportDoc {
  status?: string;
  completedAt?: string;
  wonkachatExport?: string;
}

/**
 * Structured agent setup for WonkaChat's one-click import. The assessment id
 * is an unguessable uuid, so it doubles as the capability to read the export.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!BLUEPRINT_ID_PATTERN.test(id)) return notFound();

  // Assessments are written (and only readable) with the server-side token:
  // ids with a dot are private in Sanity, never exposed to the public client.
  const client = getSanityWriteClient();
  if (!client) {
    return Response.json(
      { error: "unavailable" },
      { status: 503, headers: NO_STORE },
    );
  }

  let doc: AssessmentExportDoc | undefined;
  try {
    doc = await client.getDocument<AssessmentExportDoc>(id);
  } catch {
    return Response.json(
      { error: "unavailable" },
      { status: 503, headers: NO_STORE },
    );
  }

  if (doc?.status !== "completed" || !doc.wonkachatExport) return notFound();
  // The id is a capability URL that can leak: exports stop being importable after a while.
  if (isWonkaChatExportExpired(doc.completedAt)) return notFound();

  let payload: unknown;
  try {
    payload = JSON.parse(doc.wonkachatExport);
  } catch {
    return notFound();
  }

  return Response.json(payload, { headers: NO_STORE });
}
