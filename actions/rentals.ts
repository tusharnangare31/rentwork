import { rentalOrderRequestSchema, type RentalOrderRequestInput } from '../lib/validations/rental.ts';
import { createServerClient } from '../lib/supabase/server.ts';
import { calculateRentalPricing } from '../lib/pricing/engine.ts';
import type { ActionResult } from './auth.ts';

export async function createRentalOrderAction(
  customerId: string,
  input: RentalOrderRequestInput
): Promise<ActionResult> {
  const validation = rentalOrderRequestSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || 'Invalid rental parameters' };
  }

  try {
    const supabase = createServerClient();

    // 1. Fetch product prices and total fleet count directly from DB
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', validation.data.productId)
      .single();

    if (productError || !product) {
      return { success: false, error: 'Product not found in catalog' };
    }

    // 2. Compute overlapping reservations for temporal availability
    const { data: overlappingItems, error: overlapError } = await supabase
      .from('rental_items')
      .select(`
        quantity,
        rental_order:rental_orders!inner(start_date, end_date, status)
      `)
      .eq('product_id', validation.data.productId)
      .in('rental_order.status', ['APPROVED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'ACTIVE'])
      .lte('rental_order.start_date', validation.data.endDate)
      .gte('rental_order.end_date', validation.data.startDate);

    if (overlapError) {
      return { success: false, error: 'Error calculating temporal fleet availability' };
    }

    const reservedQty = (overlappingItems || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
    const availableQty = product.total_quantity - reservedQty;

    if (validation.data.quantity > availableQty) {
      return {
        success: false,
        error: `Insufficient inventory for the selected dates. Requested: ${validation.data.quantity}, Available: ${Math.max(0, availableQty)}`,
      };
    }

    // 3. Compute server-side verified pricing breakdown
    const pricing = calculateRentalPricing({
      rates: {
        dailyPrice: Number(product.daily_price),
        weeklyPrice: Number(product.weekly_price),
        monthlyPrice: Number(product.monthly_price),
        securityDeposit: Number(product.security_deposit),
      },
      quantity: validation.data.quantity,
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
    });

    // 4. Generate unique order number
    const orderNumber = `RW-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

    // 5. Commit transaction
    const { data: order, error: orderError } = await supabase
      .from('rental_orders')
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        company_id: product.company_id,
        start_date: validation.data.startDate,
        end_date: validation.data.endDate,
        subtotal: pricing.baseSubtotal,
        delivery_fee: pricing.deliveryFee,
        security_deposit: pricing.securityDeposit,
        tax: pricing.tax,
        total_amount: pricing.totalPayable,
        status: 'REQUESTED',
        payment_status: 'PENDING',
        delivery_address: validation.data.deliveryAddress,
        notes: validation.data.notes || null,
      })
      .select()
      .single();

    if (orderError || !order) {
      return { success: false, error: orderError?.message || 'Failed to initialize rental order' };
    }

    // 6. Create rental line item
    await supabase.from('rental_items').insert({
      rental_order_id: order.id,
      product_id: product.id,
      quantity: validation.data.quantity,
      unit_price: product.monthly_price,
      duration_type: pricing.months > 0 ? 'MONTHLY' : pricing.weeks > 0 ? 'WEEKLY' : 'DAILY',
      subtotal: pricing.baseSubtotal,
      security_deposit: pricing.securityDeposit,
    });

    return { success: true, data: order };
  } catch (err) {
    return { success: false, error: 'Internal error processing rental order' };
  }
}
