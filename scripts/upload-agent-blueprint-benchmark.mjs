import { readFile } from "node:fs/promises";

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error(
    "Usage: node scripts/upload-agent-blueprint-benchmark.mjs /absolute/path/to/anonymised-benchmark.json",
  );
}

const endpoint = process.env.AZURE_AI_SEARCH_ENDPOINT?.replace(/\/$/, "");
const apiKey = process.env.AZURE_AI_SEARCH_API_KEY;
const indexName = process.env.AZURE_AI_SEARCH_INDEX || "wonka-use-cases";
const apiVersion = process.env.AZURE_AI_SEARCH_API_VERSION || "2025-09-01";
const semanticConfiguration =
  process.env.AZURE_AI_SEARCH_SEMANTIC_CONFIGURATION || "agent-blueprint";

if (!endpoint || !apiKey) {
  throw new Error(
    "AZURE_AI_SEARCH_ENDPOINT and AZURE_AI_SEARCH_API_KEY are required.",
  );
}

const rawDocuments = JSON.parse(await readFile(inputPath, "utf8"));
if (!Array.isArray(rawDocuments) || rawDocuments.length === 0) {
  throw new Error("The input must be a non-empty JSON array.");
}

const documents = rawDocuments.map((document, index) => {
  if (
    typeof document?.useCase !== "string" ||
    typeof document?.description !== "string" ||
    typeof document?.sector !== "string"
  ) {
    throw new Error(`Invalid document at index ${index}.`);
  }

  return {
    id: typeof document.id === "string" ? document.id : `use-case-${index + 1}`,
    useCase: document.useCase,
    description: document.description,
    sector: document.sector,
    recommended: document.recommended !== false,
  };
});

async function azureRequest(path, init) {
  const response = await fetch(
    `${endpoint}${path}${path.includes("?") ? "&" : "?"}api-version=${encodeURIComponent(apiVersion)}`,
    {
      ...init,
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Azure AI Search returned ${response.status}: ${await response.text()}`,
    );
  }

  return response;
}

await azureRequest(`/indexes/${encodeURIComponent(indexName)}`, {
  method: "PUT",
  body: JSON.stringify({
    name: indexName,
    fields: [
      {
        name: "id",
        type: "Edm.String",
        key: true,
        filterable: true,
      },
      {
        name: "useCase",
        type: "Edm.String",
        searchable: true,
        retrievable: true,
      },
      {
        name: "description",
        type: "Edm.String",
        searchable: true,
        retrievable: true,
      },
      {
        name: "sector",
        type: "Edm.String",
        searchable: true,
        filterable: true,
        facetable: true,
        retrievable: false,
      },
      {
        name: "recommended",
        type: "Edm.Boolean",
        filterable: true,
        retrievable: false,
      },
    ],
    semantic: {
      configurations: [
        {
          name: semanticConfiguration,
          prioritizedFields: {
            titleField: { fieldName: "useCase" },
            prioritizedContentFields: [{ fieldName: "description" }],
            prioritizedKeywordsFields: [{ fieldName: "sector" }],
          },
        },
      ],
    },
  }),
});

for (let index = 0; index < documents.length; index += 500) {
  const batch = documents.slice(index, index + 500).map((document) => ({
    "@search.action": "mergeOrUpload",
    ...document,
  }));

  await azureRequest(
    `/indexes/${encodeURIComponent(indexName)}/docs/index`,
    {
      method: "POST",
      body: JSON.stringify({ value: batch }),
    },
  );

  console.log(`Uploaded ${Math.min(index + batch.length, documents.length)}/${documents.length}`);
}

console.log(`Benchmark ready in Azure AI Search index "${indexName}".`);

