# Analytics and CRM contract

PostHog EU is the product-analysis source of truth. `source_app` separates `website` from
`wonkachat`; `environment` separates production from previews. Autocapture, replay and page-leave
events stay disabled. Events and properties are allowlisted in each app.

The France diagnostic emits one start, one event per completed question and one completion. The
five answers use fixed enums; contact details stay in Sanity and are never sent to PostHog.

## Lifecycle

- `lead`: a valid website form was submitted.
- `mql`: deterministic score >= 50. Current signals are business email, form intent and campaign
  attribution. The score is stored in Sanity so the rule remains auditable and can be recalibrated.
- `sql`: must come from the CRM after a sales-owned action (accepted lead, qualified meeting or
  opportunity). It is never inferred from product clicks.
- `customer`: must come from the CRM/billing source.

Every website lead is stored with email, lifecycle stage, score/signals, UTM/click IDs, a random
`journey_id` and the pseudonymous PostHog IDs. PostHog receives the lead ID and score, but not the
email. Signup merges the anonymous journey with the WonkaChat user ID through PostHog `identify`.
The `journey_id` is also attached server-side to the newly created WonkaChat user, providing the
durable join key `Sanity lead ↔ WonkaChat user ↔ CRM contact`. Session IDs are never used as durable
identity.

PostHog dashboards cover consented analytics traffic. Sanity, then the CRM after export, remain the
exhaustive source for commercial lead counts; dashboard guide tiles state this explicitly.

## CRM handoff

New records are marked `crmExportStatus: ready`. An outbound adapter is intentionally not active
until the CRM is named and its destination, authentication and payload are approved. The adapter
must be idempotent on Sanity lead ID and write back the CRM record ID/status. CRM lifecycle changes
should return `sql`/`customer` plus the effective timestamp and emit one server-side PostHog event.

## Paid media

Only three conversion signals are reserved: `Lead` (diagnostic complete), `StartTrial` (signup
click) and `CompleteRegistration` (successful signup). Meta/Google receive them only after marketing
consent. GTM receives no product-detail events before analytics consent.
