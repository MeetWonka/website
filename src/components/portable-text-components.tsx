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

const ptComponents: PortableTextComponents = {
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
}

export function SmartPortableText({ value }: SmartPortableTextProps) {
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
