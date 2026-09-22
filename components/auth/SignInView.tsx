import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { RentWorkLogo } from '../shared/RentWorkLogo.tsx';
import { Button } from '../ui/button.tsx';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface SignInViewProps {
  onBackToHome: () => void;
  onSwitchToSignUp: () => void;
  onSuccess: () => void;
}

export function SignInView({ onBackToHome, onSwitchToSignUp, onSuccess }: SignInViewProps) {
  const { signIn, signInWithProvider } = useAuth();
  const [email, setEmail] = useState('john.doe@acme.in');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'microsoft') => {
    setLoading(true);
    try {
      await signInWithProvider(provider);
      onSuccess();
    } catch (err: any) {
      setError('OAuth simulation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="cursor-pointer focus:outline-none"
        >
          <RentWorkLogo size="md" />
        </button>

        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>
      </header>

      {/* Main Split Card Container */}
      <main className="max-w-4xl w-full mx-auto my-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Form Column */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
              {error}
            </div>
          )}

          {/* Social Sign-In Buttons */}
          <div className="space-y-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleProviderLogin('google')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={() => handleProviderLogin('microsoft')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link sent to registered email.');
                  }}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm mt-2 cursor-pointer shadow-xs"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer toggle */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Create one
            </button>
          </div>
        </div>

        {/* Right Side Visual Banner matching image.png */}
        <div className="hidden md:flex md:col-span-5 relative bg-slate-900 text-white p-8 flex-col justify-between overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
            alt="Better Spaces for Brighter Businesses"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold tracking-wider uppercase border border-blue-400/30">
              Corporate Portal
            </span>
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
              Better Spaces for Brighter Businesses
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Flexible equipment rentals for modern companies.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-slate-400 py-4">
        &copy; {new Date().getFullYear()} RentWork. All rights reserved.
      </footer>
    </div>
  );
}
