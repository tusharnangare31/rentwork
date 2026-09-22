import React, { useState } from 'react';
import { X, Building2, Lock, Mail, User, Building, Phone, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';
import { useAuth, DEMO_USER } from '../../lib/auth/auth-context.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin', onSuccess }: AuthModalProps) {
  const { signIn, signUp, updateProfile } = useAuth();
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email) {
      setErrorMessage('Please enter your work email.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.success) {
          setSuccessMessage(`Signed in successfully as ${email}`);
          setTimeout(() => {
            onClose();
            onSuccess?.();
          }, 600);
        } else {
          setErrorMessage(res.error || 'Failed to sign in.');
        }
      } else {
        if (!fullName || !companyName || !phone) {
          setErrorMessage('Please provide your name, company name, and phone number.');
          setIsLoading(false);
          return;
        }

        const res = await signUp({
          email,
          password,
          fullName,
          companyName,
          phone,
          gstin,
        });

        if (res.success) {
          setSuccessMessage(`Account created for ${companyName}!`);
          setTimeout(() => {
            onClose();
            onSuccess?.();
          }, 600);
        } else {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemoAccount = async () => {
    setIsLoading(true);
    await signIn(DEMO_USER.email);
    updateProfile(DEMO_USER);
    setSuccessMessage(`Signed in as ${DEMO_USER.fullName} (${DEMO_USER.companyName})`);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      onSuccess?.();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white mb-2">
            <Building2 className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {mode === 'signin' ? 'Sign in to RentWork' : 'Register Corporate Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access active equipment leases, GST invoices, and order history
          </p>
        </div>

        {/* 1-Click Demo Login Pill */}
        <button
          type="button"
          onClick={handleUseDemoAccount}
          disabled={isLoading}
          className="w-full mb-4 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-slate-900 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-left">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="block text-slate-950 font-extrabold">Instant 1-Click Corporate Login</span>
              <span className="text-[10px] text-slate-600">TechNova Solutions Pvt Ltd (Pune)</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-200/80 group-hover:bg-amber-300">
            Demo Account
          </span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-semibold text-[10px]">
              Or continue with work email
            </span>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 rounded-lg text-xs leading-relaxed mb-4 bg-rose-50 text-rose-700 border border-rose-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-lg text-xs leading-relaxed mb-4 bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div>
                <Label htmlFor="fullName" required>Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="e.g. Tushar Patil"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyName" required>Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Nexus Software Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="phone" required>Work Phone</Label>
                  <Input
                    id="phone"
                    placeholder="9960466699"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gstin">GSTIN (Optional)</Label>
                  <Input
                    id="gstin"
                    placeholder="27AABCT..."
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email" required>Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" required>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 font-bold gap-2 mt-2 cursor-pointer transition-colors"
          >
            {isLoading
              ? 'Authenticating...'
              : mode === 'signin'
              ? 'Sign In to Workspace'
              : 'Create Corporate Account'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Mode Toggle Footer */}
        <div className="mt-5 text-center text-xs text-slate-500">
          {mode === 'signin' ? (
            <p>
              New company to RentWork?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage(null);
                }}
                className="font-bold text-amber-700 hover:underline cursor-pointer"
              >
                Register your business
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                }}
                className="font-bold text-amber-700 hover:underline cursor-pointer"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
