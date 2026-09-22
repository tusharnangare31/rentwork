import React, { useState } from 'react';
import { Search, Calendar, MapPin, ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Container } from '../layout/container.tsx';

interface HeroProps {
  onSearchSubmit?: (query: string) => void;
  onExploreClick?: () => void;
}

export function Hero({ onSearchSubmit, onExploreClick }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.(searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50/50 pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200/70">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            Commercial B2B Equipment Rental Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Rent Business Equipment.{' '}
            <span className="text-slate-950 block sm:inline">
              Don’t Buy What You Don’t Need.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Flexible furniture and equipment rentals for offices, projects, events, and growing businesses.
          </p>

          {/* Product Search UI (Foundation) */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-stretch gap-2 text-left"
            >
              {/* Query Input */}
              <div className="flex-1 flex items-center px-3.5 py-2 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-100 transition-colors">
                <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ergonomic chairs, meeting desks, projectors..."
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Duration filter placeholder UI */}
              <div className="hidden sm:flex items-center px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="monthly">Monthly Lease</option>
                  <option value="weekly">Weekly Lease</option>
                  <option value="daily">Short Term / Daily</option>
                </select>
              </div>

              {/* Submit CTA */}
              <Button type="submit" variant="default" size="lg" className="gap-2 sm:px-6">
                Find Equipment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-slate-400">Popular searches:</span>
              <button
                type="button"
                onClick={() => setSearchQuery('Ergonomic Chairs')}
                className="hover:text-slate-900 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Ergonomic Chairs
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('Standing Desks')}
                className="hover:text-slate-900 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Standing Desks
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('Conference AV')}
                className="hover:text-slate-900 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Conference AV
              </button>
            </div>
          </div>

          {/* Value Micro-Pills */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/70 border border-slate-200/80 shadow-2xs">
              <Shield className="w-5 h-5 text-teal-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Zero Large CapEx</p>
                <p className="text-slate-500">Pay as an operational expense</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/70 border border-slate-200/80 shadow-2xs">
              <Clock className="w-5 h-5 text-teal-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Next-Day Delivery</p>
                <p className="text-slate-500">Commercial setup included</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/70 border border-slate-200/80 shadow-2xs">
              <Award className="w-5 h-5 text-teal-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Commercial Grade</p>
                <p className="text-slate-500">Tested and verified inventory</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
