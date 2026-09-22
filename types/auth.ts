import type { UserRole, Profile } from './database.ts';

export interface AuthSessionUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  avatarUrl?: string;
}

export interface SignInCredentials {
  email: string;
  password?: string;
}

export interface SignUpCredentials {
  email: string;
  password?: string;
  fullName: string;
  companyName?: string;
  phone?: string;
}

export interface AuthState {
  user: AuthSessionUser | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}
