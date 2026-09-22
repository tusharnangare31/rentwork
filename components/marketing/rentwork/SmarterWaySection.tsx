import React from 'react';
import { ShieldCheck, Calendar, Layers, Truck } from 'lucide-react';

export function SmarterWaySection() {
  const benefits = [
    {
      title: 'Lower Upfront Cost',
      description: 'Preserve your capital and invest in what matters most.',
      icon: ShieldCheck,
    },
    {
      title: 'Flexible Rental Periods',
      description: 'Short or long term options for any project.',
      icon: Calendar,
    },
    {
      title: 'Scalable Inventory',
      description: 'Easily scale up or down as your needs change.',
      icon: Layers,
    },
    {
      title: 'Delivery and Pickup',
      description: 'We handle the logistics, so you can focus on your business.',
      icon: Truck,
    },
  ];

  return (
    <section className="py-14 bg-white" id="for-businesses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            A Smarter Way to Equip Your Business
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Focus on growth while we take care of your equipment needs.
          </p>
        </div>

        {/* Outer Light-Blue Enclosure Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
