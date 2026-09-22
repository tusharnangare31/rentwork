import { createServerClient } from '../lib/supabase/server.ts';
import type { ActionResult } from './auth.ts';
import type { Company } from '../types/database.ts';

export async function getCompanyAction(companyId: string): Promise<ActionResult<Company>> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Failed to retrieve company details' };
  }
}
