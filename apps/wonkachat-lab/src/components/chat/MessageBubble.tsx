import { useEffect, useRef, useState } from 'react';

/**
 * Ported from WonkaChat/client/src/components/Chat/Messages/ui/MessageRender.tsx
 * + Content/Container.tsx + Content/MessageContent.tsx. A prior pass in this
 * lab had reimplemented this as a left/right chat "bubble" (colored
 * background, rounded pill, framer-motion blinking-caret `motion.span`) —
 * that's not how WonkaChat actually renders messages at all: production is a
 * LibreChat-style full-width row per turn (avatar + name label + content),
 * with NO bubble background, and the streaming cursor is a plain CSS
 * `content: '⬤'` pseudo-element (`.result-streaming` / `.submitting`,
 * defined in `client/src/style.css`, ported into `src/index.css`) — not a
 * framer-motion element at all. Both have been corrected here.
 *
 * Empty/loading-state alignment — FIXED. Diffing against the real source
 * turned up three drops, all restored below:
 * 1. The outer row was missing `MessageRender.tsx`'s
 *    `md:max-w-[47rem] xl:max-w-[55rem]` chat-width clamp entirely (it only
 *    had `mx-auto flex flex-1 gap-3`), so the row stretched to whatever
 *    container it sat in instead of the source's fixed max width — visibly
 *    misaligned next to the composer's own (different, also real)
 *    `md:max-w-3xl xl:max-w-4xl` clamp when both are on screen together.
 * 2. `Container.tsx`'s `[.text-message+&]:mt-5` (the gap between stacked
 *    message parts) was dropped from the text-message wrapper.
 * 3. Before any text has streamed in, the real `MessageContent.tsx` renders
 *    a dedicated `LoadingFallback`, not `DisplayMessage`'s own markup: it
 *    uses `mb-[0.625rem]` instead of `Container`'s `gap-3`, and — the actual
 *    misalignment culprit — wraps the pulsing-dot `<p>` in a plain
 *    `<div className="absolute">`. Taking the dot out of flow like the
 *    source does keeps the row's height pinned to `min-h-[20px]` while
 *    loading; this lab's port left the dot in-flow, so the row grew taller
 *    than the real empty state and threw off avatar/text alignment the
 *    moment a message mounted with no text yet. All three now match
 *    `MessageRender.tsx` / `Container.tsx` / `MessageContent.tsx`'s
 *    `LoadingFallback` exactly.
 *
 * Stripped/mocked:
 * - `useMessageActions`, `useMessageContext`, `MessageIcon` (endpoint/agent
 *   avatar resolution via data-provider), `recoil` (`fontSize`,
 *   `maximizeChatSpace`) → replaced with a plain `role` prop and a static
 *   avatar-letter box.
 * - The real SSE token stream (`data-provider`) → a local `setInterval`
 *   revealing `fullText` a few characters at a time.
 * - `HoverButtons`/`SubRow`/`SiblingSwitch` (copy/regenerate/edit, sibling
 *   navigation) and `Markdown` (full remark/rehype pipeline) → out of scope;
 *   assistant text is rendered as plain text, same as the user-message path.
 */
interface MessageBubbleProps {
  role: 'user' | 'assistant';
  fullText: string;
  /** When true, reveals `fullText` incrementally like a live SSE stream. */
  streaming?: boolean;
}

export default function MessageBubble({ role, fullText, streaming = false }: MessageBubbleProps) {
  const [shown, setShown] = useState(streaming ? '' : fullText);
  const [isSubmitting, setIsSubmitting] = useState(streaming);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!streaming) return;
    indexRef.current = 0;
    setShown('');
    setIsSubmitting(true);
    const id = setInterval(() => {
      indexRef.current += 2;
      setShown(fullText.slice(0, indexRef.current));
      if (indexRef.current >= fullText.length) {
        clearInterval(id);
        setIsSubmitting(false);
      }
    }, 24);
    return () => clearInterval(id);
  }, [streaming, fullText]);

  const isUser = role === 'user';
  const messageLabel = isUser ? 'You' : 'WonkaChat';
  const showCursor = !isUser && isSubmitting && shown.length > 0;

  return (
    <div
      aria-label={`message-${role}`}
      className="message-render group mx-auto flex flex-1 gap-3 transition-all duration-300 transform-gpu focus:outline-none focus:ring-2 focus:ring-border-xheavy md:max-w-[47rem] xl:max-w-[55rem]"
    >
      <div className="relative flex flex-shrink-0 select-none flex-col items-center">
        <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg border border-border-light bg-surface-secondary text-xs font-semibold text-text-secondary">
          {isUser ? 'U' : 'W'}
        </div>
      </div>

      <div className={`relative flex w-11/12 flex-col ${isUser ? 'user-turn' : 'agent-turn'}`}>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{messageLabel}</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex max-w-full flex-grow flex-col gap-0">
            {shown.length === 0 && isSubmitting ? (
              // Matches `MessageContent.tsx`'s `LoadingFallback` exactly, not
              // `Container`'s own markup — different wrapper margin, and the
              // dot is taken out of flow so it can't grow the row's height.
              <div
                className="text-message mb-[0.625rem] flex min-h-[20px] flex-col items-start gap-3 overflow-visible"
                dir="auto"
              >
                <div className="markdown prose dark:prose-invert light w-full break-words dark:text-gray-100">
                  <div className="absolute">
                    <p className="submitting relative">
                      <span className="result-thinking" />
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="text-message flex min-h-[20px] flex-col items-start gap-3 overflow-visible [.text-message+&]:mt-5"
                dir="auto"
              >
                <div
                  className={`markdown prose message-content dark:prose-invert light w-full break-words ${
                    isSubmitting ? 'submitting' : ''
                  } ${showCursor ? 'result-streaming' : ''} ${isUser ? 'whitespace-pre-wrap' : ''}`}
                >
                  <p>{shown}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="message-render group mx-auto flex flex-1 gap-3 md:max-w-[47rem] xl:max-w-[55rem]">
      <div className="relative flex flex-shrink-0 select-none flex-col items-center">
        <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg border border-border-light bg-surface-secondary text-xs font-semibold text-text-secondary">
          W
        </div>
      </div>
      <div className="text-message mb-[0.625rem] flex min-h-[20px] flex-col items-start gap-3 overflow-visible">
        <div className="markdown prose dark:prose-invert light w-full break-words dark:text-gray-100">
          <div className="absolute">
            <p className="submitting relative">
              <span className="result-thinking" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
