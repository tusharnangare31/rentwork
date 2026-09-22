import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '../../types/database.ts';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  gstin?: string;
  address?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithProvider: (provider: 'google' | 'linkedin' | 'microsoft') => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    email: string;
    password?: string;
    fullName: string;
    companyName: string;
    phone?: string;
    gstin?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
}

const STORAGE_KEY = 'rentwork_auth_user';

// Sample demo corporate account for quick 1-click testing
export const DEMO_USER: AuthUser = {
  id: 'usr_pune_89421',
  email: 'tushar@technova.in',
  fullName: 'Tushar Nangare',
  companyName: 'TechNova Solutions Pvt Ltd',
  phone: '+91-9960466699',
  role: 'CUSTOMER',
  gstin: '27AABCT3421K1ZZ',
  address: 'EON Free Zone, Cluster C, Kharadi, Pune 411014',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from persistent storage or default demo on first load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Automatically provide demo account so user can test orders and payments immediately
        setUser(DEMO_USER);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
      setUser(DEMO_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const loggedUser: AuthUser = {
      id: `usr_${Date.now()}`,
      email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      companyName: 'Enterprise Client Workspace',
      phone: '+91-9960466699',
      role: 'CUSTOMER',
      gstin: '27AABCT3421K1ZZ',
      address: 'Hinjawadi Phase 1, Pune 411057',
    };

    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    setIsLoading(false);
    return { success: true };
  };

  const signInWithProvider = async (provider: 'google' | 'linkedin' | 'microsoft'): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const providerUser: AuthUser = {
      id: `usr_${provider}_${Date.now()}`,
      email: provider === 'google' ? 'tushar@technova.in' : provider === 'microsoft' ? 'tushar.n@technovacorp.onmicrosoft.com' : 'tushar.nangare@linkedin-corp.in',
      fullName: 'Tushar Nangare',
      companyName: 'TechNova Solutions Pvt Ltd',
      phone: '+91-9960466699',
      role: 'CUSTOMER',
      gstin: '27AABCT3421K1ZZ',
      address: 'EON Free Zone, Cluster C, Kharadi, Pune 411014',
    };

    setUser(providerUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(providerUser));
    setIsLoading(false);
    return { success: true };
  };

  const signUp = async (data: {
    email: string;
    fullName: string;
    companyName: string;
    phone?: string;
    gstin?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      companyName: data.companyName,
      phone: data.phone || '+91-9960466699',
      role: 'CUSTOMER',
      gstin: data.gstin || '27AABCT3421K1ZZ',
      address: 'Pune, Maharashtra',
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signInWithProvider,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
