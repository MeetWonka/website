import {
  MAX_SEATS,
  MIN_SEATS,
  PLANS,
  seatPriceForBand,
  VOLUME_BAND_LABELS,
  type Billing,
  type ModelAccess,
  type PlanId,
  type PriceBand,
} from "@/lib/pricing.config";

export function volumeBandLabel(bandIndex: number): string {
  return VOLUME_BAND_LABELS[bandIndex] ?? `Band ${bandIndex + 1}`;
}

export interface BreakdownRow {
  from: number;
  to: number | null;
  seatsInBand: number;
  pricePerSeat: number;
  subtotal: number;
}

export interface PricingBreakdown {
  rows: BreakdownRow[];
  total: number;
}

const toCents = (amount: number) => Math.round(amount * 100);

export function clampSeats(value: number) {
  if (!Number.isFinite(value)) return MIN_SEATS;
  return Math.min(MAX_SEATS, Math.max(MIN_SEATS, Math.round(value)));
}

/** Average Standard seat price for the whole team, shown on the plan card. */
export function getAverageStandardSeatPrice(
  plan: PlanId,
  seats: number,
  billing: Billing,
  access: ModelAccess,
) {
  const count = clampSeats(seats);
  const { total } = calculateBreakdown(plan, count, billing, access);
  return Math.round((total / count) * 100) / 100;
}

/** Starting Standard seat price at the first volume band. */
export function getStandardSeatPrice(
  plan: PlanId,
  billing: Billing,
  access: ModelAccess,
) {
  return seatPriceForBand(PLANS[plan].standardBands[0], billing, access);
}

export function getPowerSeatPrice(plan: PlanId, billing: Billing) {
  return PLANS[plan].powerSeat?.[billing] ?? null;
}

function seatsInBand(band: PriceBand, seats: number) {
  const upper = band.to === null ? seats : Math.min(seats, band.to);
  return Math.max(0, upper - band.from + 1);
}

/**
 * Graduated Standard seat pricing: each band price only applies to seats in
 * that band. BYOK uses the same bands at included minus the fixed discount.
 */
export function calculateBreakdown(
  plan: PlanId,
  seats: number,
  billing: Billing,
  access: ModelAccess,
): PricingBreakdown {
  const count = clampSeats(seats);

  const rows = PLANS[plan].standardBands.map((band) => {
    const inBand = seatsInBand(band, count);
    const pricePerSeat = seatPriceForBand(band, billing, access);
    return {
      from: band.from,
      to: band.to,
      seatsInBand: inBand,
      pricePerSeat,
      subtotal: (toCents(pricePerSeat) * inBand) / 100,
    };
  });

  const totalCents = rows.reduce(
    (sum, row) => sum + toCents(row.pricePerSeat) * row.seatsInBand,
    0,
  );

  return { rows, total: totalCents / 100 };
}
