import React from 'react';
import { Calendar, Clock, Truck, RotateCcw, Package } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: 'Choose equipment',
      description: 'Browse and select from a wide range of business furniture and equipment.',
      icon: Package,
    },
    {
      step: 2,
      title: 'Select rental period',
      description: 'Pick the dates that work for you — short or long term.',
      icon: Clock,
    },
    {
      step: 3,
      title: 'Get it delivered',
      description: 'We deliver and set up at your location.',
      icon: Truck,
    },
    {
      step: 4,
      title: 'Return when finished',
      description: "We'll pick it up when you're done. Simple and hassle-free.",
      icon: RotateCcw,
    },
  ];

  return (
    <section className="py-14 bg-slate-50/70 border-y border-slate-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Get the equipment you need in four simple steps.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Top Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Step Number & Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-8">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
