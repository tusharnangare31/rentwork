import { createServerClient } from '../lib/supabase/server.ts';
import type { ActionResult } from './auth.ts';

export interface RazorpayOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createPaymentOrderAction(rentalOrderId: string): Promise<ActionResult<RazorpayOrderResult>> {
  try {
    const supabase = createServerClient();
    const { data: order, error } = await supabase
      .from('rental_orders')
      .select('total_amount, status, payment_status')
      .eq('id', rentalOrderId)
      .single();

    if (error || !order) {
      return { success: false, error: 'Rental order not found' };
    }

    if (order.payment_status === 'PAID') {
      return { success: false, error: 'Order is already settled' };
    }

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';

    // In production, invoke Razorpay API server-side:
    // const rzpOrder = await razorpay.orders.create({ amount: order.total_amount * 100, currency: 'INR' });
    const mockRazorpayOrderId = `order_${Date.now()}`;

    return {
      success: true,
      data: {
        orderId: mockRazorpayOrderId,
        amount: Number(order.total_amount),
        currency: 'INR',
        keyId,
      },
    };
  } catch (err) {
    return { success: false, error: 'Payment gateway initialization failed' };
  }
}
