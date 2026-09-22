import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  categoryId: z.string().uuid('Valid category ID required'),
  description: z.string().min(10, 'Detailed description is required'),
  dailyPrice: z.number().nonnegative('Daily price must be positive'),
  weeklyPrice: z.number().nonnegative('Weekly price must be positive'),
  monthlyPrice: z.number().nonnegative('Monthly price must be positive'),
  securityDeposit: z.number().nonnegative('Security deposit cannot be negative'),
  totalQuantity: z.number().int().positive('Total inventory fleet must be at least 1'),
  minRentalDays: z.number().int().positive().default(1),
  condition: z.enum(['EXCELLENT', 'GOOD', 'REFURBISHED']).default('EXCELLENT'),
});

export const productFilterSchema = z.object({
  categoryId: z.string().uuid().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  condition: z.enum(['EXCELLENT', 'GOOD', 'REFURBISHED']).optional(),
  searchQuery: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductFilterInput = z.infer<typeof productFilterSchema>;
