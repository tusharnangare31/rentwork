import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  LayoutDashboard,
  Package,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { RentWorkLogo } from '../shared/RentWorkLogo.tsx';
import { Button } from '../ui/button.tsx';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface RentWorkNavbarProps {
  onNavigate: (sectionId: string) => void;
  onSignInClick: () => void;
  onGetStartedClick: () => void;
  onDashboardClick: () => void;
  onSearchSubmit?: (term: string) => void;
  activeView?: 'home' | 'signin' | 'signup' | 'dashboard';
}

export function RentWorkNavbar({
  onNavigate,
  onSignInClick,
  onGetStartedClick,
  onDashboardClick,
  onSearchSubmit,
  activeView = 'home',
}: RentWorkNavbarProps) {
  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', id: 'products' },
    { label: 'Categories', id: 'categories' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'For Businesses', id: 'for-businesses' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="cursor-pointer focus:outline-none"
            >
              <RentWorkLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              type="button"
              onClick={() => onNavigate('hero-search')}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Search equipment"
            >
              <Search className="w-4 h-4" />
            </button>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.fullName
                      ? user.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : 'JD'}
                  </div>
                  <div className="text-left text-xs leading-tight">
                    <span className="font-bold text-slate-900 block">{user.fullName || 'John Doe'}</span>
                    <span className="text-[10px] text-slate-500 block">{user.companyName || 'Acme Pvt Ltd'}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in">
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onDashboardClick();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      Client Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onSignInClick}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Sign In
                </button>

                <Button
                  variant="default"
                  onClick={onGetStartedClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('hero-search')}
              className="p-2 text-slate-600"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(link.id, e)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDashboardClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignInClick();
                  }}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 text-center"
                >
                  Sign In
                </button>
                <Button
                  variant="default"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGetStartedClick();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
