export function formatEuro(amount: number): string {
  return `€ ${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** @deprecated Use formatEuro */
export const formatEur = formatEuro;