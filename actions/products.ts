import { createProductSchema, productFilterSchema, type CreateProductInput, type ProductFilterInput } from '../lib/validations/product.ts';
import { createServerClient } from '../lib/supabase/server.ts';
import type { ActionResult } from './auth.ts';
import type { ProductWithDetails } from '../types/product.ts';

export async function getProductsAction(filter?: ProductFilterInput): Promise<ActionResult<ProductWithDetails[]>> {
  try {
    const validated = productFilterSchema.safeParse(filter || {});
    if (!validated.success) {
      return { success: false, error: 'Invalid product filters' };
    }

    const supabase = createServerClient();
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        company:companies(id, name, city, status),
        images:product_images(*)
      `)
      .eq('status', 'ACTIVE');

    if (validated.data.categoryId) {
      query = query.eq('category_id', validated.data.categoryId);
    }
    if (validated.data.condition) {
      query = query.eq('condition', validated.data.condition);
    }
    if (validated.data.searchQuery) {
      query = query.ilike('name', `%${validated.data.searchQuery}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as ProductWithDetails[] };
  } catch (err) {
    return { success: false, error: 'Failed to fetch catalog' };
  }
}

export async function createProductAction(companyId: string, input: CreateProductInput): Promise<ActionResult> {
  const validation = createProductSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || 'Invalid product data' };
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .insert({
        company_id: companyId,
        category_id: validation.data.categoryId,
        name: validation.data.name,
        slug: validation.data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: validation.data.description,
        daily_price: validation.data.dailyPrice,
        weekly_price: validation.data.weeklyPrice,
        monthly_price: validation.data.monthlyPrice,
        security_deposit: validation.data.securityDeposit,
        total_quantity: validation.data.totalQuantity,
        min_rental_days: validation.data.minRentalDays,
        condition: validation.data.condition,
        status: 'ACTIVE',
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Database error creating product' };
  }
}
