import React from 'react';
import { Button } from '../../ui/button.tsx';

interface ReadyToRentBannerProps {
  onGetStarted: () => void;
}

export function ReadyToRentBanner({ onGetStarted }: ReadyToRentBannerProps) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Subtle background photo overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Conference Room Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left Text */}
          <div className="relative z-10 space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to rent?
            </h3>
            <p className="text-sm text-slate-300">
              Join businesses that choose flexibility with RentWork.
            </p>
          </div>

          {/* Right Button */}
          <div className="relative z-10 shrink-0">
            <Button
              variant="default"
              size="lg"
              onClick={onGetStarted}
              className="bg-white hover:bg-slate-100 text-blue-600 font-extrabold px-8 py-3 rounded-xl text-sm shadow-md cursor-pointer transition-colors"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
