export interface PricingBandBreakdown {
  tier: number;
  seats: number;
  rate: number;
  subtotal: number;
}

/** Annual billing discount (20% off list monthly). */
export const ANNUAL_DISCOUNT_FACTOR = 0.8;

export interface PricingResult {
  bands: PricingBandBreakdown[];
  listMonthly: number;
  payableMonthly: number;
  acv: number;
  perSeatPerYear: number;
  perSeatMonth: number;
  annualSaving: number;
}

const AI_CREDITS_ADDON = 7;

const TIER_BASE_RATES = [20, 16, 12, 9] as const;

function rateForTier(tierIndex: number, aiModelsIncluded: boolean) {
  const base = TIER_BASE_RATES[tierIndex];
  return aiModelsIncluded ? base + AI_CREDITS_ADDON : base;
}

export function bandSeatCounts(seats: number) {
  const s = Math.max(0, Math.floor(seats));
  return {
    band1: Math.min(s, 50),
    band2: Math.max(0, Math.min(s, 250) - 50),
    band3: Math.max(0, Math.min(s, 1000) - 250),
    band4: Math.max(0, s - 1000),
  };
}

const TIER_LABELS = [
  "For the first",
  "For the next",
  "For the next",
  "For the next",
] as const;

const TIER_CAPACITIES: readonly (number | "1000+")[] = [
  50,
  200,
  750,
  "1000+",
];

/** Tier rate card for the pricing breakdown modal (first 3 tiers only). */
export function getPricingTierCatalog(
  annual: boolean,
  aiModelsIncluded: boolean,
) {
  const discount = annual ? ANNUAL_DISCOUNT_FACTOR : 1;

  return TIER_LABELS.slice(0, 3).map((label, index) => ({
    label,
    tierSeats: TIER_CAPACITIES[index],
    ratePerSeat: rateForTier(index, aiModelsIncluded) * discount,
  }));
}

export function calculatePricing(
  seats: number,
  annual: boolean,
  aiModelsIncluded: boolean,
): PricingResult {
  const counts = bandSeatCounts(seats);
  const seatBands = [counts.band1, counts.band2, counts.band3, counts.band4];

  const bands: PricingBandBreakdown[] = seatBands
    .map((bandSeats, index) => {
      if (bandSeats <= 0) return null;
      const rate = rateForTier(index, aiModelsIncluded);
      return {
        tier: index + 1,
        seats: bandSeats,
        rate,
        subtotal: bandSeats * rate,
      };
    })
    .filter((band): band is PricingBandBreakdown => band !== null);

  const listMonthly = bands.reduce((sum, band) => sum + band.subtotal, 0);
  const payableMonthly = annual ? listMonthly * ANNUAL_DISCOUNT_FACTOR : listMonthly;
  const acv = payableMonthly * 12;
  const perSeatPerYear = seats > 0 ? acv / seats : 0;
  const perSeatMonth = seats > 0 ? payableMonthly / seats : 0;
  const annualSaving = annual ? (listMonthly - payableMonthly) * 12 : 0;

  return {
    bands,
    listMonthly,
    payableMonthly,
    acv,
    perSeatPerYear,
    perSeatMonth,
    annualSaving,
  };
}
