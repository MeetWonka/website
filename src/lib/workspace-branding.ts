/** CMS + legacy defaults still say WonkaChat; workspace routes show Wonka Workspace. */
export function brandAsWonkaWorkspace(text: string): string {
  return text
    .replaceAll("WonkaChat", "Wonka Workspace")
    .replaceAll("Wonkachat", "Wonka Workspace")
    .replaceAll("wonkachat", "Wonka Workspace");
}

export function brandDeep<T>(value: T): T {
  if (typeof value === "string") {
    return brandAsWonkaWorkspace(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => brandDeep(item)) as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      out[key] = brandDeep(nested);
    }
    return out as T;
  }
  return value;
}
