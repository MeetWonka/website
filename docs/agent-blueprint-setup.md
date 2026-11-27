# AI Agent Blueprint setup

The public site never contains the private benchmark. Runtime flow:

1. Requesty researches the submitted public company domain.
2. Azure AI Search retrieves relevant anonymised benchmark patterns.
3. Requesty designs exactly three agents from those patterns.
4. Sanity logs the assessment, optional email and demo intent.

The submitted email is only written to Sanity. It is never sent to Requesty or
Azure AI Search. The generated response never includes company or benchmark
client names.

## Environment

Copy the Agent Blueprint variables from `.env.example` into the deployment
environment. `REQUESTY_AGENT_BLUEPRINT_MODEL` is deliberately required so the
model can be changed in Requesty without a code release.

## Azure AI Search index

Prepare a private JSON array outside the repository:

```json
[
  {
    "id": "use-case-1",
    "sector": "Construction",
    "useCase": "Tender document copilot",
    "description": "An agent reviews tender documents and prepares a controlled response.",
    "recommended": true
  }
]
```

Do not include client names, source workbook sheet names or mission names. Set
`recommended` to `false` for voicebots, commodity chatbots, machine learning,
computer vision, or any pattern marked as not recommended in the workbook.

Create the semantic index and upload the records:

```bash
node scripts/upload-agent-blueprint-benchmark.mjs /absolute/path/to/anonymised-benchmark.json
```

The script uses the same Azure environment variables as the application. Keep
the generated JSON outside Git.

## Sanity

The `agentBlueprintAssessment` schema appears under **Leads → Agent
Blueprints** in Studio. A Sanity write token is required at runtime.

## Abuse protection

Cloudflare Turnstile is enabled automatically when its existing environment
variables are present. The API also limits generation attempts per IP address.

