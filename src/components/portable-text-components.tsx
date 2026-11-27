import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// ─── Types ───────────────────────────────────────────────────────────────────

type PTSpan = { _type: string; _key: string; text?: string; marks?: string[] };
type PTBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children?: PTSpan[];
  markDefs?: unknown[];
};
type PTCustomBlock = { _type: string; _key: string; [key: string]: unknown };
type PTNode = PTBlock | PTCustomBlock;

type TableGroup  = { kind: "table";  rows: string[][]; key: string };
type BlocksGroup = { kind: "blocks"; nodes: PTNode[];  key: string };
type Group = TableGroup | BlocksGroup;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function blockText(block: PTBlock): string {
  return (block.children ?? [])
    .map((s) => (s._type === "hardBreak" ? "\n" : (s.text ?? "")))
    .join("");
}

function isTableRow(node: PTNode): node is PTBlock {
  if (node._type !== "block") return false;
  const b = node as PTBlock;
  if (b.style && b.style !== "normal") return false;
  const text = blockText(b);
  return text.includes("|") && text.split("|").length >= 3;
}

/** Group consecutive pipe-rows into table groups, everything else into block groups */
function groupNodes(body: PTNode[]): Group[] {
  const groups: Group[] = [];
  let blockBuf: PTNode[] = [];
  let tableBuf: string[][] = [];
  let tableKey = "";

  const flushBlocks = () => {
    if (blockBuf.length) {
      groups.push({ kind: "blocks", nodes: blockBuf, key: blockBuf[0]._key });
      blockBuf = [];
    }
  };
  const flushTable = () => {
    if (tableBuf.length) {
      groups.push({ kind: "table", rows: tableBuf, key: tableKey });
      tableBuf = [];
      tableKey = "";
    }
  };

  for (const node of body) {
    if (isTableRow(node)) {
      flushBlocks();
      if (!tableKey) tableKey = node._key;
      // A single block may contain multiple rows separated by \n (Shift+Enter in Sanity)
      const lines = blockText(node as PTBlock).split("\n").map((l) => l.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.includes("|")) {
          tableBuf.push(line.split("|").map((c) => c.trim()));
        }
      }
    } else {
      flushTable();
      blockBuf.push(node);
    }
  }
  flushBlocks();
  flushTable();
  return groups;
}

// ─── Table renderer ──────────────────────────────────────────────────────────

function ProseTable({ rows }: { rows: string[][] }) {
  if (!rows.length) return null;
  const [head, ...body] = rows;

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-mid-gray">
            {head.map((cell, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left type-eyebrow text-text/60 whitespace-nowrap"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-border">
          {body.map((row, ri) => {
            const isWonka = row[0]?.toLowerCase().includes("wonka") || row[1]?.toLowerCase().includes("wonka");
            return (
              <tr
                key={ri}
                className={isWonka ? "bg-blue-100 font-medium" : "hover:bg-mid-gray transition-colors"}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 type-paragraph-m whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Base PortableText components ────────────────────────────────────────────

/** Stable anchor id for a heading (used by the article table of contents). */
export function headingId(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "section"
  );
}

/** H2 headings of a Portable Text body, in order. */
export function extractHeadings(value: unknown[]): { id: string; text: string }[] {
  return (value as PTNode[])
    .filter((node): node is PTBlock => node._type === "block" && (node as PTBlock).style === "h2")
    .map((block) => {
      const text = blockText(block).trim();
      return { id: headingId(text), text };
    })
    .filter((heading) => heading.text && !heading.text.startsWith("|"));
}

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={headingId(blockText(value as PTBlock))} className="scroll-mt-28">
        {children}
      </h2>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const className = "font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent";
      return href.startsWith("/") ? (
        <Link href={href} className={className}>{children}</Link>
      ) : (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }: { value: { asset?: unknown; alt?: string } }) =>
      value?.asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={(value as { url?: string }).url} alt={value.alt ?? ""} className="rounded-lg my-6 w-full" />
      ) : null,
    callout: ({ value }: { value: { content?: string; type?: string } }) => {
      const style =
        value.type === "warning"
          ? "border-orange-900 bg-orange-300/20 text-text"
          : value.type === "tip"
            ? "border-green-600 bg-green-100 text-text"
            : "border-blue-500 bg-blue-100 text-text";
      return (
        <div className={`not-prose my-6 rounded-r-lg border-l-4 p-4 type-paragraph-m ${style}`}>
          {value.content}
        </div>
      );
    },
  },
};

// ─── Smart PortableText that handles table rows ───────────────────────────────

interface SmartPortableTextProps {
  value: unknown[];
  /** Elements rendered right before the Nth H2 (0-based), e.g. product visuals. */
  inserts?: Record<number, ReactNode>;
}

export function SmartPortableText({ value, inserts }: SmartPortableTextProps) {
  if (inserts && Object.keys(inserts).length) {
    // Split the body before each H2 that has an insert and render segment by segment.
    const segments: { before?: ReactNode; nodes: unknown[] }[] = [{ nodes: [] }];
    let h2Index = -1;
    for (const node of value as PTNode[]) {
      const isH2 = node._type === "block" && (node as PTBlock).style === "h2";
      if (isH2) {
        h2Index += 1;
        if (inserts[h2Index] !== undefined) segments.push({ before: inserts[h2Index], nodes: [] });
      }
      segments[segments.length - 1].nodes.push(node);
    }
    return (
      <>
        {segments.map((segment, index) => (
          <div key={index} className="contents">
            {segment.before}
            {segment.nodes.length ? <SmartPortableText value={segment.nodes} /> : null}
          </div>
        ))}
      </>
    );
  }

  const groups = groupNodes(value as PTNode[]);

  return (
    <>
      {groups.map((group) =>
        group.kind === "table" ? (
          <ProseTable key={group.key} rows={group.rows} />
        ) : (
          <PortableText
            key={group.key}
            value={group.nodes as Parameters<typeof PortableText>[0]["value"]}
            components={ptComponents}
          />
        ),
      )}
    </>
  );
}
