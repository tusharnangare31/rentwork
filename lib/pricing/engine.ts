import type { RentalPriceBreakdown } from '../../types/rental.ts';

export interface ProductPricingRates {
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  securityDeposit: number;
}

export interface CalculateRentalPricingOptions {
  rates: ProductPricingRates;
  quantity: number;
  startDate: Date | string;
  endDate: Date | string;
  deliveryFee?: number;
  taxRatePercent?: number; // default 18% GST
}

/**
 * Calculates rental tenure and optimal tiered pricing for corporate rentals.
 * Days <= 6: Daily rate
 * Days 7-29: Combination of weeks and days (checking if full week is cheaper than partial days)
 * Days >= 30: Combination of months, weeks, and days
 */
export function calculateRentalPricing(
  options: CalculateRentalPricingOptions
): RentalPriceBreakdown {
  const {
    rates,
    quantity,
    startDate,
    endDate,
    deliveryFee = 1500, // Standard B2B commercial logistics fee
    taxRatePercent = 18, // Standard GST for rental services
  } = options;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  // Include both start and end days in commercial rental tenure
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

  let months = Math.floor(durationDays / 30);
  const remainderAfterMonths = durationDays % 30;

  let weeks = Math.floor(remainderAfterMonths / 7);
  let days = remainderAfterMonths % 7;

  // Rate optimization: if paying remaining days exceeds a full week, round up to a week if cheaper
  if (days * rates.dailyPrice > rates.weeklyPrice && rates.weeklyPrice > 0) {
    weeks += 1;
    days = 0;
  }

  // Rate optimization: if weeks + days exceeds a full month, round up to a month if cheaper
  if (
    (weeks * rates.weeklyPrice + days * rates.dailyPrice > rates.monthlyPrice) &&
    rates.monthlyPrice > 0
  ) {
    months += 1;
    weeks = 0;
    days = 0;
  }

  const singleUnitBaseSubtotal =
    months * rates.monthlyPrice + weeks * rates.weeklyPrice + days * rates.dailyPrice;

  const baseSubtotal = singleUnitBaseSubtotal * quantity;
  const securityDeposit = rates.securityDeposit * quantity;

  // GST applies to taxable commercial rental services and delivery logistics
  const taxableAmount = baseSubtotal + deliveryFee;
  const tax = Math.round((taxableAmount * (taxRatePercent / 100)) * 100) / 100;

  // Security deposit is refundable principal held in trust, not taxed
  const totalPayable = baseSubtotal + securityDeposit + deliveryFee + tax;

  return {
    durationDays,
    months,
    weeks,
    days,
    baseSubtotal,
    securityDeposit,
    deliveryFee,
    tax,
    totalPayable,
  };
}

/**
 * Checks if two date ranges overlap.
 * Theorem: Two intervals [A_start, A_end] and [B_start, B_end] overlap if and only if
 * A_start <= B_end AND A_end >= B_start
 */
export function doRentalIntervalsOverlap(
  startA: string | Date,
  endA: string | Date,
  startB: string | Date,
  endB: string | Date
): boolean {
  const aStart = new Date(startA).getTime();
  const aEnd = new Date(endA).getTime();
  const bStart = new Date(startB).getTime();
  const bEnd = new Date(endB).getTime();

  return aStart <= bEnd && aEnd >= bStart;
}
