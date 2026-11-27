import type { BenchmarkPattern, CompanyContext } from "@/lib/agent-blueprint";

interface AzureSearchDocument {
  useCase?: unknown;
  description?: unknown;
}

interface AzureSearchResponse {
  value?: AzureSearchDocument[];
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function runSearch(search: string): Promise<BenchmarkPattern[]> {
  const endpoint = requiredEnv("AZURE_AI_SEARCH_ENDPOINT").replace(/\/$/, "");
  const index = requiredEnv("AZURE_AI_SEARCH_INDEX");
  const apiKey = requiredEnv("AZURE_AI_SEARCH_API_KEY");
  const apiVersion =
    process.env.AZURE_AI_SEARCH_API_VERSION?.trim() || "2025-09-01";
  const semanticConfiguration =
    process.env.AZURE_AI_SEARCH_SEMANTIC_CONFIGURATION?.trim();

  const body: Record<string, unknown> = {
    search,
    searchFields: "useCase,description,sector",
    select: "useCase,description",
    filter: "recommended eq true",
    top: 8,
  };

  if (semanticConfiguration) {
    body.queryType = "semantic";
    body.semanticConfiguration = semanticConfiguration;
    body.captions = "extractive";
    body.answers = "none";
  }

  const response = await fetch(
    `${endpoint}/indexes/${encodeURIComponent(index)}/docs/search?api-version=${encodeURIComponent(apiVersion)}`,
    {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Azure AI Search returned ${response.status}`);
  }

  const data = (await response.json()) as AzureSearchResponse;
  return (data.value ?? []).flatMap((document) => {
    if (
      typeof document.useCase !== "string" ||
      typeof document.description !== "string"
    ) {
      return [];
    }

    return [
      {
        useCase: document.useCase.slice(0, 180),
        description: document.description.slice(0, 1_200),
      },
    ];
  });
}

/**
 * Runs one search per high-potential process plus a sector-wide one, then
 * interleaves the results so every process keeps its best matches.
 */
export async function searchBenchmark(
  context: CompanyContext,
): Promise<BenchmarkPattern[]> {
  const sectorLine = [context.sector, context.subSector].join(" ");
  const queries = [
    ...context.benchmarkQueries.map((query) => `${query} ${sectorLine}`),
    ...context.keyProcesses
      .slice(0, 3)
      .map((process) => `${process.name} ${process.repetitiveWork}`),
    [sectorLine, context.operatingModel, ...context.priorities].join(" "),
  ].slice(0, 7);

  const settled = await Promise.allSettled(queries.map(runSearch));
  const lists = settled.flatMap((outcome) =>
    outcome.status === "fulfilled" ? [outcome.value] : [],
  );
  if (lists.length === 0) {
    const failure = settled.find((outcome) => outcome.status === "rejected");
    throw failure?.status === "rejected"
      ? failure.reason
      : new Error("Azure AI Search returned no results");
  }

  const seen = new Set<string>();
  const merged: BenchmarkPattern[] = [];
  const longest = Math.max(...lists.map((list) => list.length));
  for (let rank = 0; rank < longest; rank += 1) {
    for (const list of lists) {
      const pattern = list[rank];
      if (!pattern) continue;
      const key = pattern.useCase.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(pattern);
    }
  }

  return merged.slice(0, 24);
}
