/**
 * Inline executable scripts (GTM, trackers) must not stay in the React tree
 * after hydration — React 19 warns when <script> re-renders on the client.
 * Render only for SSR + hydration, then drop from the tree (MUI/InitColorScheme pattern).
 */
"use client";

import { useSyncExternalStore } from "react";

function useServerOrHydrating() {
  return useSyncExternalStore(
    () => () => {},
    () => false,
    () => true,
  );
}

interface InlineScriptProps {
  id: string;
  html: string;
  type?: string;
}

export function InlineScript({
  id,
  html,
  type = "text/javascript",
}: InlineScriptProps) {
  const shouldRender = useServerOrHydrating();

  if (!shouldRender) {
    return null;
  }

  return (
    <script
      id={id}
      type={type}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
