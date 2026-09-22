import React, { useState } from 'react';
import { Search, ShieldCheck, Truck, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onExplore: () => void;
}

export function HeroSection({ onSearch, onExplore }: HeroSectionProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-slate-100" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & Search */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
              FLEXIBLE. SUSTAINABLE. BUSINESS READY.
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
              Rent Business Equipment.<br className="hidden sm:inline" />
              Don&apos;t Buy What You Don&apos;t Need.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-xl leading-relaxed">
              Flexible furniture and equipment rentals for offices, projects, events and growing businesses.
            </p>

            {/* Search Bar */}
            <form
              id="hero-search"
              onSubmit={handleSubmit}
              className="relative max-w-xl flex items-center shadow-md rounded-xl bg-white border border-slate-200/90 p-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for chairs, tables, monitors, and more..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none py-2"
              />
              <button
                type="submit"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-xs"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span>Flexible Terms</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span>Fast Delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span>Trusted by Businesses</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Floating "Equip / Scale / Succeed" Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85"
                alt="Modern workstation with ergonomic office chair and wooden desk"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center"
              />

              {/* Floating Pill Card matching image.png */}
              <div className="absolute right-6 bottom-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-200/80 space-y-0.5 text-left animate-in fade-in slide-in-from-bottom-2">
                <div className="text-sm font-bold text-slate-900 leading-tight">Equip</div>
                <div className="text-sm font-bold text-blue-600 leading-tight">Scale</div>
                <div className="text-sm font-bold text-slate-900 leading-tight">Succeed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
