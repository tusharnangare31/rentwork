import { signInSchema, signUpSchema, type SignInSchema, type SignUpSchema } from '../lib/validations/auth.ts';
import { createServerClient } from '../lib/supabase/server.ts';

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function signInAction(input: SignInSchema): Promise<ActionResult> {
  const validation = signInSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || 'Invalid credentials' };
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Authentication service unavailable' };
  }
}

export async function signUpAction(input: SignUpSchema): Promise<ActionResult> {
  const validation = signUpSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || 'Invalid registration details' };
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: validation.data.email,
      password: validation.data.password,
      options: {
        data: {
          full_name: validation.data.fullName,
          company_name: validation.data.companyName,
          phone: validation.data.phone,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Registration service unavailable' };
  }
}

export async function signOutAction(): Promise<ActionResult> {
  try {
    const supabase = createServerClient();
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Error during sign out' };
  }
}
