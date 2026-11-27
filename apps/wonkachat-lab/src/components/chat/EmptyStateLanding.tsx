import { ArrowRight } from 'lucide-react';
import ConnectorIconStack from './ConnectorIconStack';

/**
 * Ported from WonkaChat/client/src/components/Chat/Landing.tsx +
 * Landing/TabbedSuggestions.tsx — the empty-chat headline and the suggested-
 * action rows shown beneath the composer before the first message.
 *
 * Stripped/mocked:
 * - `Landing.tsx`'s time-of-day/day-of-week greeting logic (`getWelcomePeriod`,
 *   `com_ui_landing_heading_{morning,afternoon,evening,monday,friday}`) → a
 *   single static headline is passed in as a prop instead of recomputed from
 *   `Date.now()`, so Storybook renders the same thing regardless of when
 *   it's opened; the `wonka-editorial` heading className is kept verbatim.
 * - `TabbedSuggestions.tsx`'s real behavior (`useMCPServerManager`,
 *   `assignSuggestedApps`, `buildCapabilitySuggestions` — picking 3 suggested
 *   actions from whichever MCP connectors are actually available/connected,
 *   then wiring each row to auto-connect + submit a prompt) → a static list
 *   of `{ title, apps }` mock rows; clicking one is a no-op here.
 */
export interface MockSuggestion {
  id: string;
  title: string;
  apps: { id: string; icon?: string }[];
}

const defaultSuggestions: MockSuggestion[] = [
  {
    id: 'mail-cal',
    title: 'Coordinate Outlook Mail email and Cal.com calendars',
    apps: [{ id: 'outlook' }, { id: 'calcom' }],
  },
  {
    id: 'asana',
    title: 'Move projects forward with Asana',
    apps: [{ id: 'asana' }],
  },
  {
    id: 'box',
    title: 'Work with documents in Box',
    apps: [{ id: 'box' }],
  },
];

export default function EmptyStateLanding({
  headline = 'Fresh week Gabriel, where should we start?',
  suggestions = defaultSuggestions,
  onSelectSuggestion,
}: {
  headline?: string;
  suggestions?: MockSuggestion[];
  onSelectSuggestion?: (suggestion: MockSuggestion) => void;
}) {
  return (
    <div className="w-full">
      <h1 className="wonka-editorial mx-auto max-w-3xl text-balance text-center text-3xl leading-[1.05] text-text-primary sm:text-4xl md:text-5xl">
        {headline}
      </h1>

      <section
        aria-label="Suggested actions"
        className="mx-auto mt-6 w-full max-w-3xl rounded-[var(--radius-md)] border border-border-light bg-surface-secondary p-2 md:max-w-3xl md:border-0 md:bg-transparent md:p-0 xl:max-w-4xl"
      >
        <div className="flex flex-col gap-1.5 md:gap-1">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => onSelectSuggestion?.(suggestion)}
              aria-label={suggestion.title}
              className="group flex min-h-12 items-center gap-2.5 rounded-[var(--radius-sm)] border border-border-light bg-surface-primary px-3 py-2.5 text-left transition-colors duration-150 hover:bg-surface-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 md:min-h-11 md:gap-3 md:border-0 md:bg-transparent md:px-2.5 md:py-2"
            >
              <span className="flex shrink-0 items-center justify-center">
                <ConnectorIconStack size="sm" items={suggestion.apps} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block text-xs font-medium leading-4 text-text-secondary group-hover:text-text-primary sm:text-sm sm:leading-5 md:truncate">
                  {suggestion.title}
                </span>
              </span>
              <ArrowRight
                className="size-3.5 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-text-primary"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
