export {
  ArchivedSolutionSection,
  ARCHIVED_SOLUTION_COPY,
} from "./solution";

export {
  ArchivedHowItWorksSection,
  ARCHIVED_HOW_IT_WORKS_COPY,
} from "./how-it-works";

import { ArchivedSolutionSection } from "./solution";
import { ArchivedHowItWorksSection } from "./how-it-works";

export const ARCHIVED_SECTIONS = {
  solution: ArchivedSolutionSection,
  howItWorks: ArchivedHowItWorksSection,
} as const;
