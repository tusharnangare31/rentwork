import type { RentalOrder, RentalItem, Product, Company } from './database.ts';

export interface RentalPriceBreakdown {
  durationDays: number;
  months: number;
  weeks: number;
  days: number;
  baseSubtotal: number;
  securityDeposit: number;
  deliveryFee: number;
  tax: number;
  totalPayable: number;
}

export interface RentalCartItem {
  product: Product;
  quantity: number;
  startDate: string;
  endDate: string;
  pricing: RentalPriceBreakdown;
}

export interface RentalOrderWithDetails extends RentalOrder {
  items?: (RentalItem & { product?: Product })[];
  company?: Company;
}
