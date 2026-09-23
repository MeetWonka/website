export {
  ArchivedSolutionSection,
  ARCHIVED_SOLUTION_COPY,
} from "./solution-section";

import { ArchivedSolutionSection } from "./solution-section";

/** Frozen homepage solution section (Mar 2026) — components + assets in `public/images/archived/solution/`. */
export const ARCHIVED_SECTIONS = {
  solution: ArchivedSolutionSection,
} as const;
