export {
  ArchivedSolutionSection,
  ARCHIVED_SOLUTION_COPY,
} from "./solution";

export {
  ArchivedHowItWorksSection,
  ARCHIVED_HOW_IT_WORKS_COPY,
} from "./how-it-works";

export {
  ArchivedHomeV2PlatformChaptersSection,
  ARCHIVED_HOME_V2_PLATFORM_CHAPTERS_COPY,
} from "./home-v2";

import { ArchivedSolutionSection } from "./solution";
import { ArchivedHowItWorksSection } from "./how-it-works";
import { ArchivedHomeV2PlatformChaptersSection } from "./home-v2";

export const ARCHIVED_SECTIONS = {
  solution: ArchivedSolutionSection,
  howItWorks: ArchivedHowItWorksSection,
  homeV2PlatformChapters: ArchivedHomeV2PlatformChaptersSection,
} as const;
