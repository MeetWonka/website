import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ListeningIcon, SendIcon } from '../primitives/icons';
import ConnectAppsMenu from './ConnectAppsMenu';
import ModelSelectorPill from './ModelSelectorPill';
import EmptyStateLanding from './EmptyStateLanding';

/**
 * Ported from WonkaChat/client/src/components/Chat/Input/ChatForm.tsx (the
 * rounded composer bar) + ChatInputActions.tsx (the "+" attach/skills/prompts
 * menu) + AudioRecorder.tsx (mic button) + SendButton.tsx. This lab had no
 * composer at all before this pass — the chat input is the single biggest
 * missing piece for motion work, since it's the one surface a user interacts
 * with continuously.
 *
 * Structure kept verbatim from `ChatForm.tsx`: the outer rounded container
 * (`rounded-t-3xl ... sm:rounded-3xl`, `border-brand-400/30 bg-surface-chat
 * shadow-brand`), the button row's layout (`ChatInputActions` far left,
 * connectors pill, `mx-auto flex` spacer, model pill, mic, send button far
 * right).
 *
 * Stripped/mocked, since this lab has no form state/recoil/backend:
 * - `react-hook-form` (`useChatFormContext`, `methods.register`), `useTextarea`
 *   (paste/keydown/composition handling), `useAutoSave`, `useHandleKeyUp`,
 *   `useQueryParams`, the mobile-keyboard `visualViewport` listener → a plain
 *   local `useState` for the textarea value; Enter-to-send only.
 * - `Mention`, `PromptsCommand`, `SkillsCommand`, `AzureSearchOAuthGate`,
 *   `PlanOptions`, `TextareaHeader`, `EditBadges`, `FileFormChat`,
 *   `StreamAudio`, `CollapseChat` (the row-count-driven "collapse to one
 *   line" affordance) → out of scope; this is the composer's core
 *   interactive surface, not every popover it can spawn.
 * - `BadgeRow`'s real ephemeral badges (`WebSearch`, `FileSearch`,
 *   `Artifacts`) → dropped; only `FavoriteConnectors`
 *   (→ `ConnectAppsMenu.tsx`) is kept, since that's the one the screenshot
 *   this port is based on actually shows.
 * - `AudioRecorder`'s real `useSpeechToText` (start/stop recording, live
 *   transcription) → a local `isListening` toggle with no actual audio.
 * - `ModelSelector`'s real endpoint/model catalog → `ModelSelectorPill.tsx`
 *   (see its own doc comment).
 */
interface ComposerProps {
  /** Storybook control: show the empty-state headline + suggestions below the bar. */
  showEmptyState?: boolean;
  placeholder?: string;
}

export default function Composer({ showEmptyState = false, placeholder = 'Ask Wonka' }: ComposerProps) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const plusContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isPlusOpen) return undefined;
    const handlePointerDown = (event: PointerEvent) => {
      if (!plusContainerRef.current?.contains(event.target as Node)) {
        setIsPlusOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isPlusOpen]);

  const canSubmit = text.trim().length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setText('');
    textAreaRef.current?.focus();
  };

  return (
    <div className="mx-auto w-full max-w-3xl transition-[max-width] duration-300 sm:px-2 xl:max-w-4xl">
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-3">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="flex w-full items-center">
            <div
              className={cn(
                'relative flex w-full flex-grow flex-col overflow-hidden rounded-t-3xl border pb-4 text-text-primary transition-all duration-200 sm:rounded-3xl sm:pb-0',
                'border-brand-400/30 bg-surface-chat shadow-brand dark:shadow-md',
              )}
            >
              <div className="flex min-w-0 flex-col">
                <div className="flex flex-row">
                  <textarea
                    ref={textAreaRef}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSubmit(event);
                      }
                    }}
                    placeholder={placeholder}
                    rows={1}
                    data-testid="text-input"
                    style={{ height: 44, overflowY: 'auto' }}
                    className={cn(
                      'md:py-3.5 m-0 w-full resize-none py-[13px] px-5 placeholder-black/50 bg-transparent dark:placeholder-white/50 transition-[max-height] duration-200',
                      'max-h-[45vh] md:max-h-[55vh]',
                      'focus-visible:outline-none',
                    )}
                  />
                </div>

                <div className="items-between flex min-w-0 flex-row gap-1 pb-2 sm:gap-2">
                  <div className="ml-2">
                    <div ref={plusContainerRef} className="relative">
                      <button
                        type="button"
                        aria-expanded={isPlusOpen}
                        aria-haspopup="menu"
                        aria-label="Add"
                        className="flex size-9 items-center justify-center rounded-full p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        onClick={() => setIsPlusOpen((open) => !open)}
                      >
                        <Plus className="size-5" aria-hidden="true" />
                      </button>
                      {isPlusOpen && (
                        <div
                          role="menu"
                          className="absolute bottom-full left-0 z-50 mb-2 min-w-48 rounded-[var(--radius-md)] border border-border-light bg-surface-primary p-1 shadow-lg"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center rounded-[var(--radius-sm)] px-2 py-2 text-left text-sm text-text-primary hover:bg-surface-hover"
                          >
                            Add photos & files
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center rounded-[var(--radius-sm)] px-2 py-2 text-left text-sm text-text-primary hover:bg-surface-hover"
                          >
                            Add skills
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center rounded-[var(--radius-sm)] px-2 py-2 text-left text-sm text-text-primary hover:bg-surface-hover"
                          >
                            Prompts
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="relative flex flex-wrap items-center gap-2">
                      <ConnectAppsMenu />
                    </div>
                  </div>

                  <div className="mx-auto flex" />

                  <div className="min-w-0 max-w-[7rem] shrink sm:max-w-[10rem]">
                    <ModelSelectorPill />
                  </div>

                  <button
                    type="button"
                    aria-label="Use microphone"
                    aria-pressed={isListening}
                    onClick={() => setIsListening((v) => !v)}
                    className="flex size-9 items-center justify-center rounded-full p-1 transition-colors hover:bg-surface-hover"
                  >
                    <ListeningIcon
                      className={cn(
                        'h-full w-full',
                        isListening ? 'stroke-red-500' : 'stroke-gray-700 dark:stroke-gray-300',
                      )}
                    />
                  </button>

                  <div className="mr-0 sm:mr-2">
                    <button
                      aria-label="Send message"
                      disabled={!canSubmit}
                      className="rounded-full bg-text-primary p-1.5 text-text-primary outline-offset-4 transition-all duration-200 disabled:cursor-not-allowed disabled:text-text-secondary disabled:opacity-10"
                      data-testid="send-button"
                      type="submit"
                    >
                      <SendIcon size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {showEmptyState && (
        <div className="mb-12 mt-8 w-full">
          <EmptyStateLanding />
        </div>
      )}
    </div>
  );
}
