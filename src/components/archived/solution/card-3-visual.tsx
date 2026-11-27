"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import logosManifest from "../../../../public/images/archived/solution/card-3/logos/logos.json";
import {
  CARD_THREE_TILE_SHAPES,
  type CardThreeTileShape,
} from "./card-3-tile-shapes";

type BgMode = "brand" | "white";

interface Logo {
  slug: string;
  name: string;
  hex: string;
  bgMode: BgMode;
  file: string;
}

const LOGOS: Logo[] = (logosManifest as Array<Logo & { file: string | null }>)
  .filter((l): l is Logo => l.file !== null)
  .map((l) => ({ ...l }));

const COLS = 4;
const ROWS = 3;
const TILE_COUNT = COLS * ROWS;

// Note: row 3 col 1 was specified as "left-bottom-down" but that variant
// doesn't exist among the 3 shape SVGs. Substituted with "left-top-down".
// Swap if a different intent was meant.
const GRID_SHAPES: CardThreeTileShape[][] = [
  ["left-bottom-up", "left-bottom-up", "left-top-down", "left-bottom-up"],
  ["right-bottom-up", "left-bottom-up", "left-bottom-up", "left-bottom-up"],
  ["left-top-down", "left-bottom-up", "left-bottom-up", "right-bottom-up"],
];

const INITIAL_FILLED = 5;
const MIN_FILLED = 4;
const MAX_FILLED = 8;
const RECENT_WINDOW = 3;
const CYCLE_MS = 1600;
const TILE_BG_DEFAULT = "#F6F6F4";
const BORDER_STROKE = "#0E1A16";

type TileState = { kind: "empty" } | { kind: "logo"; logo: Logo };

interface TileProps {
  shape: CardThreeTileShape;
  state: TileState;
}

function Tile({ shape, state }: TileProps) {
  const { viewBox, fillPath } = CARD_THREE_TILE_SHAPES[shape];
  const isLogo = state.kind === "logo";
  const isBrandTile = isLogo && state.logo.bgMode === "brand";

  return (
    <div className="relative size-full">
      {/* Base empty tile — always rendered. Brand-color tiles fade their
          colored overlay in on top of this, so the background never snaps. */}
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="absolute inset-0 size-full"
      >
        <path
          d={fillPath}
          fill={TILE_BG_DEFAULT}
          stroke={BORDER_STROKE}
          strokeOpacity={0.2}
          strokeWidth={0.9}
          strokeDasharray="1.83 1.83"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <AnimatePresence>
        {isLogo ? (
          <motion.div
            key={state.logo.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {isBrandTile ? (
              <svg
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
                className="absolute inset-0 size-full"
              >
                <path d={fillPath} fill={state.logo.hex} />
              </svg>
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/archived/solution/card-3/logos/${state.logo.file}`}
                alt={state.logo.name}
                className="size-[55%] object-contain"
                style={
                  isBrandTile
                    ? { filter: "brightness(0) invert(1)" }
                    : undefined
                }
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function CardThreeVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [tiles, setTiles] = useState<TileState[]>(() =>
    Array.from({ length: TILE_COUNT }, () => ({ kind: "empty" })),
  );
  const recentSlotsRef = useRef<number[]>([]);

  useEffect(() => {
    let intervalId: number | undefined;
    const seedId = window.setTimeout(() => {
      setTiles(seedTiles(LOGOS, TILE_COUNT, INITIAL_FILLED));
      if (reduced) return;
      intervalId = window.setInterval(() => {
        setTiles((prev) => {
          const result = stepTiles(
            prev,
            LOGOS,
            recentSlotsRef.current,
            MIN_FILLED,
            MAX_FILLED,
          );
          if (result.changedSlot >= 0) {
            recentSlotsRef.current = [
              result.changedSlot,
              ...recentSlotsRef.current,
            ].slice(0, RECENT_WINDOW);
          }
          return result.tiles;
        });
      }, CYCLE_MS);
    }, 120);
    return () => {
      window.clearTimeout(seedId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [reduced]);

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center px-[6%] py-[6%]",
        className,
      )}
    >
      <div
        className="grid aspect-[4/3] h-full grid-cols-4 grid-rows-3 gap-[2.5%]"
      >
        {tiles.map((state, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const shape = GRID_SHAPES[row][col];
          return <Tile key={i} shape={shape} state={state} />;
        })}
      </div>
    </div>
  );
}

function seedTiles(
  logos: Logo[],
  total: number,
  filled: number,
): TileState[] {
  const slots: TileState[] = Array.from({ length: total }, () => ({
    kind: "empty",
  }));
  const pool = shuffle(logos.slice());
  for (let i = 0; i < filled; i++) {
    const eligible = slots
      .map((_, idx) => idx)
      .filter((idx) => slots[idx].kind === "empty");
    if (eligible.length === 0) break;
    const scores = eligible.map((idx) => emptyNeighborRatio(idx, slots));
    const picked = weightedPick(eligible, scores);
    slots[picked] = { kind: "logo", logo: pool[i % pool.length] };
  }
  return slots;
}

function getNeighbors(slot: number): number[] {
  const row = Math.floor(slot / COLS);
  const col = slot % COLS;
  const result: number[] = [];
  if (row > 0) result.push(slot - COLS);
  if (row < ROWS - 1) result.push(slot + COLS);
  if (col > 0) result.push(slot - 1);
  if (col < COLS - 1) result.push(slot + 1);
  return result;
}

function emptyNeighborRatio(slot: number, tiles: TileState[]): number {
  const nbrs = getNeighbors(slot);
  if (nbrs.length === 0) return 1;
  const empties = nbrs.filter((n) => tiles[n].kind === "empty").length;
  return empties / nbrs.length;
}

// Bias-weighted random pick. Higher score → more likely to be picked.
// The exponent strength (BIAS) is gentle so the result still feels random;
// raise it to enforce stricter spacing.
const BIAS = 2;
function weightedPick(candidates: number[], scores: number[]): number {
  const weights = scores.map((s) => Math.exp(s * BIAS) + 0.1);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

interface StepResult {
  tiles: TileState[];
  changedSlot: number;
}

function stepTiles(
  prev: TileState[],
  logos: Logo[],
  recentSlots: number[],
  minFilled: number,
  maxFilled: number,
): StepResult {
  if (logos.length === 0) return { tiles: prev, changedSlot: -1 };
  const filledCount = prev.filter((t) => t.kind === "logo").length;
  const recent = new Set(recentSlots);

  // Each tick either fills an empty tile or empties a filled one — never
  // replaces one logo with another in the same slot.
  type Action = "add" | "remove";
  const canAdd = filledCount < maxFilled;
  const canRemove = filledCount > minFilled;
  let action: Action;
  if (!canAdd && !canRemove) {
    return { tiles: prev, changedSlot: -1 };
  } else if (!canAdd) {
    action = "remove";
  } else if (!canRemove) {
    action = "add";
  } else {
    action = Math.random() < 0.5 ? "add" : "remove";
  }

  const slotKind: TileState["kind"] = action === "add" ? "empty" : "logo";
  const eligible = prev
    .map((_, i) => i)
    .filter((i) => !recent.has(i) && prev[i].kind === slotKind);
  if (eligible.length === 0) return { tiles: prev, changedSlot: -1 };

  // Score-weighted pick:
  // - add → prefer empty slots with mostly-empty neighbors (isolation)
  // - remove → prefer filled slots surrounded by other logos (break up clusters)
  const scores =
    action === "add"
      ? eligible.map((i) => emptyNeighborRatio(i, prev))
      : eligible.map((i) => 1 - emptyNeighborRatio(i, prev));
  const picked = weightedPick(eligible, scores);

  const next = prev.slice();
  if (action === "remove") {
    next[picked] = { kind: "empty" };
    return { tiles: next, changedSlot: picked };
  }

  // add — pick a logo that isn't already on screen
  const inUse = new Set<string>();
  for (const t of prev) {
    if (t.kind === "logo") inUse.add(t.logo.slug);
  }
  const logoCandidates = logos.filter((l) => !inUse.has(l.slug));
  if (logoCandidates.length === 0) return { tiles: prev, changedSlot: -1 };
  const pick =
    logoCandidates[Math.floor(Math.random() * logoCandidates.length)];
  next[picked] = { kind: "logo", logo: pick };
  return { tiles: next, changedSlot: picked };
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

