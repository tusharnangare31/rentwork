import { createServerClient } from './server.ts';

export interface AuthSessionCheck {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  redirectUrl?: string;
}

/**
 * Middleware session verifier foundation.
 * Validates session tokens on protected route segments:
 * - /dashboard/* (Requires authenticated customer)
 * - /company/*   (Requires COMPANY_ADMIN or COMPANY_STAFF)
 * - /admin/*     (Requires PLATFORM_ADMIN)
 */
export async function verifyRouteSession(
  pathname: string,
  authToken?: string
): Promise<AuthSessionCheck> {
  if (!authToken) {
    const isProtected =
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/company') ||
      pathname.startsWith('/admin');

    return {
      isAuthenticated: false,
      userId: null,
      role: null,
      redirectUrl: isProtected ? '/login' : undefined,
    };
  }

  try {
    const supabase = createServerClient(authToken);
    const { data: { user }, error } = await supabase.auth.getUser(authToken);

    if (error || !user) {
      return {
        isAuthenticated: false,
        userId: null,
        role: null,
        redirectUrl: '/login',
      };
    }

    // Query user role from public.profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'CUSTOMER';

    // Enforce role-based boundaries
    if (pathname.startsWith('/admin') && role !== 'PLATFORM_ADMIN') {
      return { isAuthenticated: true, userId: user.id, role, redirectUrl: '/unauthorized' };
    }

    if (
      pathname.startsWith('/company') &&
      role !== 'COMPANY_ADMIN' &&
      role !== 'COMPANY_STAFF' &&
      role !== 'PLATFORM_ADMIN'
    ) {
      return { isAuthenticated: true, userId: user.id, role, redirectUrl: '/unauthorized' };
    }

    return {
      isAuthenticated: true,
      userId: user.id,
      role,
    };
  } catch (err) {
    console.error('Session verification error:', err);
    return { isAuthenticated: false, userId: null, role: null, redirectUrl: '/login' };
  }
}
