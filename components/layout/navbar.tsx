import React, { useState } from 'react';
import {
  Building2,
  Menu,
  X,
  ArrowUpRight,
  Phone,
  ChevronDown,
  Armchair,
  Table,
  LayoutGrid,
  Archive,
  User,
  Package,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Container } from './container.tsx';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onGetQuoteClick?: (prefilledProduct?: string) => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
  onOrdersClick?: () => void;
  onGetStartedClick?: () => void;
  orderCount?: number;
}

export function Navbar({
  onNavigate,
  onGetQuoteClick,
  onContactClick,
  onSignInClick,
  onOrdersClick,
  onGetStartedClick,
  orderCount = 0,
}: NavbarProps) {
  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleCtaClick = () => {
    if (onGetQuoteClick) {
      onGetQuoteClick();
    } else if (onGetStartedClick) {
      onGetStartedClick();
    }
  };

  const productSubmenu = [
    { label: 'Office Chair Rental', id: 'products', category: 'chairs', icon: Armchair, desc: 'Medium back, revolving & executive seating' },
    { label: 'Workstations on Rent', id: 'products', category: 'workstations', icon: LayoutGrid, desc: 'Single-seater & cluster workstations' },
    { label: 'Office Desk & Tables', id: 'products', category: 'tables', icon: Table, desc: 'Executive cabin & conference tables' },
    { label: 'Office Storage Units', id: 'products', category: 'storage', icon: Archive, desc: 'Mobile pedestals & steel file cabinets' },
  ];

  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setUserDropdownOpen(false);

    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo matching officefurnrent.in */}
          <div className="flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick('home', e)}
              className="flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm group-hover:bg-amber-500 transition-colors">
                <Building2 className="h-6 w-6 text-amber-400 group-hover:text-slate-950 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  OfficeFurnRent
                  <span className="text-amber-500 font-bold">.in</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                  Pune Office Furniture Rental
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              <a
                href="#home"
                onClick={(e) => handleNavClick('home', e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Home
              </a>

              <a
                href="#about-us"
                onClick={(e) => handleNavClick('about-us', e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                About Us
              </a>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={(e) => handleNavClick('products', e)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  Products on Rent
                  <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                </button>

                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 mb-1">
                      Explore Categories
                    </div>
                    {productSubmenu.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <a
                          key={sub.label}
                          href={`#${sub.id}`}
                          onClick={(e) => handleNavClick(sub.id, e)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-50/70 group transition-colors"
                        >
                          <div className="p-2 rounded-md bg-slate-100 text-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                              {sub.label}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{sub.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href="#rent-vs-buy"
                onClick={(e) => handleNavClick('rent-vs-buy', e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Why Rent
              </a>

              <a
                href="#calculator"
                onClick={(e) => handleNavClick('calculator', e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Calculator
              </a>

              <a
                href="#contact-us"
                onClick={(e) => handleNavClick('contact-us', e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Orders Dashboard Button */}
            <button
              type="button"
              onClick={onOrdersClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Package className="w-4 h-4 text-amber-600" />
              <span>My Orders</span>
              {orderCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-mono text-[11px] flex items-center justify-center font-bold">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Auth / Profile Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden md:block leading-tight">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">{user.fullName}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{user.companyName}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in">
                    <div className="p-2.5 border-b border-slate-100 bg-slate-50/50 rounded-lg mb-1">
                      <div className="text-xs font-bold text-slate-900">{user.fullName}</div>
                      <div className="text-[11px] text-slate-500">{user.email}</div>
                      <div className="text-[10px] font-semibold text-amber-700 mt-1">{user.companyName}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOrdersClick?.();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-amber-600" />
                      View Active Leases & Invoices
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onSignInClick}
                className="text-xs font-bold text-slate-800 border-slate-300 hover:bg-slate-100 gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                Sign In
              </Button>
            )}

            {/* Quick Call */}
            <a
              href="tel:+919960466699"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-600 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-extrabold">+91-9960466699</span>
            </a>

            {/* CTA Button */}
            <Button
              variant="default"
              size="default"
              onClick={handleCtaClick}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow-sm gap-1.5 cursor-pointer text-xs"
            >
              Get a Quote
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOrdersClick}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-800"
            >
              <Package className="w-4 h-4 text-amber-600" />
              {orderCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-amber-400 font-mono text-[9px] flex items-center justify-center font-bold">
                  {orderCount}
                </span>
              )}
            </button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCtaClick}
              className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5"
            >
              Quote
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* User Status Bar in Mobile */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700">Signed In</span>
                <div className="text-xs font-bold text-slate-900">{user.fullName}</div>
                <div className="text-[11px] text-slate-500">{user.companyName}</div>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="text-xs text-rose-600 font-bold p-1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onSignInClick?.();
              }}
              className="w-full justify-center text-xs font-bold border-slate-300"
            >
              Sign In to Corporate Account
            </Button>
          )}

          <div className="flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOrdersClick?.();
              }}
              className="flex items-center justify-between px-3 py-2 text-sm font-bold text-amber-800 bg-amber-50 rounded-lg text-left"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-600" />
                My Active Leases & Orders
              </span>
              <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full">
                {orderCount}
              </span>
            </button>
            <a
              href="#home"
              onClick={(e) => handleNavClick('home', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Home
            </a>
            <a
              href="#about-us"
              onClick={(e) => handleNavClick('about-us', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              About Us
            </a>
            <a
              href="#products"
              onClick={(e) => handleNavClick('products', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Products on Rent
            </a>
            <a
              href="#rent-vs-buy"
              onClick={(e) => handleNavClick('rent-vs-buy', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Why Rent
            </a>
            <a
              href="#calculator"
              onClick={(e) => handleNavClick('calculator', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Cost Calculator
            </a>
            <a
              href="#contact-us"
              onClick={(e) => handleNavClick('contact-us', e)}
              className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-amber-50 rounded-lg"
            >
              Contact Us
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="tel:+919960466699"
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              Call: +91-9960 466 699
            </a>
            <Button
              variant="default"
              onClick={() => {
                setMobileMenuOpen(false);
                onGetQuoteClick?.();
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold justify-center gap-2"
            >
              Get a Free Quote Now
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
