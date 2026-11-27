"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildConnectorFlipPool } from "@/lib/home-integration-tools";
import type { CapabilityGridConnector } from "@/lib/page-defaults/ai-chat-capability-grid";
import { cn } from "@/lib/utils";

const TICK_MS = 1_800;

const FALLBACK_CONNECTOR: CapabilityGridConnector = {
  name: "Odoo",
  logo: "/images/home/logos/odoo.svg",
};

type FlipCellState = {
  front: CapabilityGridConnector;
  back: CapabilityGridConnector;
  rotated: boolean;
  animating: boolean;
  noTransition: boolean;
};

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function visibleLogoNames(
  cells: FlipCellState[],
  skipIndex: number,
): Set<string> {
  const names = new Set<string>();
  cells.forEach((cell, index) => {
    if (index === skipIndex) {
      return;
    }
    const shown = cell.animating ? cell.back : cell.front;
    names.add(normalizeName(shown.name));
  });
  return names;
}

function pickNextConnector(
  current: CapabilityGridConnector,
  pool: CapabilityGridConnector[],
  taken: Set<string>,
): CapabilityGridConnector {
  const currentKey = normalizeName(current.name);
  const unique = pool.filter(
    (c) =>
      c.logo &&
      normalizeName(c.name) !== currentKey &&
      !taken.has(normalizeName(c.name)),
  );
  if (unique.length) {
    return unique[Math.floor(Math.random() * unique.length)]!;
  }

  const different = pool.filter(
    (c) => c.logo && normalizeName(c.name) !== currentKey,
  );
  if (different.length) {
    return different[Math.floor(Math.random() * different.length)]!;
  }

  return current.logo ? current : FALLBACK_CONNECTOR;
}

function ConnectorLogo({
  connector,
  dense,
}: {
  connector: CapabilityGridConnector;
  dense: boolean;
}) {
  const isIcon = connector.variant === "icon";
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const src =
    connector.logo && connector.logo !== failedLogo
      ? connector.logo
      : FALLBACK_CONNECTOR.logo;

  return (
    <Image
      src={src}
      alt={connector.name}
      width={isIcon ? 32 : 72}
      height={isIcon ? 32 : 28}
      onError={() => setFailedLogo(connector.logo ?? null)}
      className={cn(
        "w-auto object-contain",
        isIcon
          ? dense
            ? "max-h-7 max-w-7 md:max-h-8 md:max-w-8"
            : "max-h-8 max-w-8"
          : dense
            ? "max-h-6 max-w-[3.25rem] md:max-h-7 md:max-w-[3.75rem]"
            : "max-h-7 max-w-[4.5rem]",
      )}
    />
  );
}

function FlipCell({
  cell,
  dense,
  onTransitionEnd,
}: {
  cell: FlipCellState;
  dense: boolean;
  onTransitionEnd: () => void;
}) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden [perspective:28rem]">
      <div
        className={cn(
          "relative h-full min-h-0 w-full [transform-style:preserve-3d]",
          cell.noTransition
            ? "transition-none"
            : "transition-transform duration-500 ease-in-out",
          cell.rotated && "[transform:rotateY(180deg)]",
        )}
        onTransitionEnd={(event) => {
          if (event.propertyName !== "transform" || !cell.animating) {
            return;
          }
          onTransitionEnd();
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
          <ConnectorLogo connector={cell.front} dense={dense} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <ConnectorLogo connector={cell.back} dense={dense} />
        </div>
      </div>
    </div>
  );
}

function initialCells(
  items: CapabilityGridConnector[],
  pool: CapabilityGridConnector[],
): FlipCellState[] {
  const used = new Set<string>();
  const queue = [...items];

  return queue.map((item, index) => {
    let front = item.logo ? item : FALLBACK_CONNECTOR;
    let key = normalizeName(front.name);

    if (used.has(key)) {
      const taken = new Set(used);
      front = pickNextConnector(front, pool, taken);
      key = normalizeName(front.name);
    }

    used.add(key);

    return {
      front,
      back: front,
      rotated: false,
      animating: false,
      noTransition: false,
    };
  });
}

export function ConnectorsVisual({
  items,
  visualClassName,
}: {
  items: CapabilityGridConnector[];
  visualClassName: string;
}) {
  const denseGrid = items.length >= 15;
  const columnClass = denseGrid
    ? "grid-cols-4 grid-rows-3 md:grid-cols-5 md:grid-rows-4"
    : "grid-cols-3";
  const MOBILE_DENSE_SLOTS = 12;
  const flipPool = useMemo(() => buildConnectorFlipPool(items), [items]);
  const [cells, setCells] = useState<FlipCellState[]>(() =>
    initialCells(items, buildConnectorFlipPool(items)),
  );
  const [cellsItems, setCellsItems] = useState(items);
  const [motionOk, setMotionOk] = useState(false);

  if (cellsItems !== items) {
    setCellsItems(items);
    setCells(initialCells(items, flipPool));
  }

  useEffect(() => {
    if (!cells.some((cell) => cell.noTransition)) {
      return;
    }
    const id = window.requestAnimationFrame(() => {
      setCells((prev) =>
        prev.map((cell) =>
          cell.noTransition ? { ...cell, noTransition: false } : cell,
        ),
      );
    });
    return () => window.cancelAnimationFrame(id);
  }, [cells]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const flipCells = useCallback(
    (indices: number[]) => {
      setCells((prev) => {
        const next = [...prev];
        const reserved = new Set<string>();

        for (const cell of next) {
          if (!cell.animating) {
            reserved.add(normalizeName(cell.front.name));
          } else {
            reserved.add(normalizeName(cell.back.name));
          }
        }

        for (const index of indices) {
          const cell = next[index];
          if (!cell || cell.animating) {
            continue;
          }

          const taken = new Set(reserved);
          visibleLogoNames(next, index).forEach((name) => taken.add(name));

          const back = pickNextConnector(cell.front, flipPool, taken);
          taken.add(normalizeName(back.name));
          reserved.add(normalizeName(back.name));

          next[index] = {
            ...cell,
            back,
            rotated: true,
            animating: true,
          };
        }

        return next;
      });
    },
    [flipPool],
  );

  const settleFlip = useCallback((index: number) => {
    setCells((prev) => {
      const cell = prev[index];
      if (!cell?.animating) {
        return prev;
      }
      const nextCells = [...prev];
      nextCells[index] = {
        front: cell.back,
        back: cell.back,
        rotated: false,
        animating: false,
        noTransition: true,
      };
      return nextCells;
    });
  }, []);

  useEffect(() => {
    if (!motionOk || items.length === 0) {
      return;
    }

    const id = window.setInterval(() => {
      const flipCount = Math.random() < 0.4 ? 2 : 1;
      const indices: number[] = [];
      const used = new Set<number>();
      for (let n = 0; n < flipCount; n++) {
        let index = Math.floor(Math.random() * items.length);
        let guard = 0;
        while (used.has(index) && guard++ < 12) {
          index = Math.floor(Math.random() * items.length);
        }
        used.add(index);
        indices.push(index);
      }
      flipCells(indices);
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [flipCells, items.length, motionOk]);

  return (
    <div
      className={cn(
        visualClassName,
        "grid min-h-0 gap-px p-0",
        columnClass,
      )}
    >
      {cells.map((cell, index) => (
        <div
          key={`connector-slot-${index}`}
          className={cn(
            "flex min-h-0 items-center justify-center overflow-hidden bg-light-gray",
            denseGrid ? "h-full p-1.5 md:p-2" : "min-h-[5.5rem] p-2",
            denseGrid && index >= MOBILE_DENSE_SLOTS && "hidden md:flex",
          )}
        >
          <FlipCell
            cell={cell}
            dense={denseGrid}
            onTransitionEnd={() => settleFlip(index)}
          />
        </div>
      ))}
    </div>
  );
}
