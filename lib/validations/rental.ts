import { z } from 'zod';

export const rentalOrderRequestSchema = z.object({
  productId: z.string().uuid('Valid product ID required'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid start date (YYYY-MM-DD) required'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid end date (YYYY-MM-DD) required'),
  deliveryAddress: z.object({
    companyName: z.string().min(2, 'Company name required'),
    buildingFloor: z.string().min(2, 'Building/Floor required'),
    streetAddress: z.string().min(5, 'Street address required'),
    city: z.string().min(2, 'City required'),
    state: z.string().min(2, 'State required'),
    pincode: z.string().regex(/^\d{6}$/, 'Valid 6-digit PIN code required'),
    contactName: z.string().min(2, 'Contact person name required'),
    contactPhone: z.string().min(10, 'Contact phone required'),
  }),
  notes: z.string().optional(),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be on or after start date',
  path: ['endDate'],
});

export type RentalOrderRequestInput = z.infer<typeof rentalOrderRequestSchema>;
