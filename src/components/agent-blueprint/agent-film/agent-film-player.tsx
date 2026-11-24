"use client";

import { Player } from "@remotion/player";
import { useReducedMotion } from "motion/react";
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import {
  AGENT_FILM_FPS,
  AGENT_FILM_HEIGHT,
  AGENT_FILM_WIDTH,
  agentFilmTimeline,
  buildAgentFilmSpec,
} from "@/lib/agent-film";
import { AgentFilm } from "./agent-film";

/** Live, in-browser demo film of one blueprint agent. No server render. */
export default function AgentFilmPlayer({
  agent,
  locale,
}: {
  agent: AgentBlueprintAgent;
  locale: Locale;
}) {
  const reducedMotion = useReducedMotion();
  const spec = useMemo(() => buildAgentFilmSpec(agent, locale), [agent, locale]);
  const inputProps = useMemo(() => ({ spec }), [spec]);
  const { total } = agentFilmTimeline(spec);

  return (
    <Player
      key={agent.id}
      component={AgentFilm}
      inputProps={inputProps}
      durationInFrames={total}
      fps={AGENT_FILM_FPS}
      compositionWidth={AGENT_FILM_WIDTH}
      compositionHeight={AGENT_FILM_HEIGHT}
      autoPlay={!reducedMotion}
      initiallyMuted
      loop
      controls
      clickToPlay
      style={{ width: "100%", aspectRatio: `${AGENT_FILM_WIDTH} / ${AGENT_FILM_HEIGHT}` }}
    />
  );
}
