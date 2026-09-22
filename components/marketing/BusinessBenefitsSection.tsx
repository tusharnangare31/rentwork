import React from 'react';
import { DollarSign, SlidersHorizontal, TrendingUp, Truck, Check } from 'lucide-react';
import { Container } from '../layout/container.tsx';
import { Badge } from '../ui/badge.tsx';

export function BusinessBenefitsSection() {
  const benefits = [
    {
      title: 'Lower Upfront Cost',
      description:
        'Eliminate massive capital expenditures (CapEx). Preserve working capital and record rentals as standard, tax-efficient operating expenses (OpEx).',
      icon: DollarSign,
      highlights: ['Zero heavy initial cash outlay', '100% tax-deductible operational expense', 'No depreciation book write-offs'],
    },
    {
      title: 'Flexible Rental Periods',
      description:
        'Lease for precisely as long as your team or project requires — from a single weekend summit to a multi-year office lease with dynamic extension options.',
      icon: SlidersHorizontal,
      highlights: ['Daily, weekly, and monthly options', 'One-click tenure extensions', 'Zero penalties for early returns'],
    },
    {
      title: 'Scalable Inventory',
      description:
        'Scale office seating or computer monitors up when hiring cohorts join, and return surplus units when teams migrate or projects wrap up.',
      icon: TrendingUp,
      highlights: ['On-demand fleet scalability', 'Standardized ergonomic setups', 'Multi-location delivery support'],
    },
    {
      title: 'Delivery and Pickup',
      description:
        'Full-service logistics including doorstep delivery, commercial assembly, positioning, and scheduled return retrieval handled end-to-end.',
      icon: Truck,
      highlights: ['Professional installation included', 'Scheduled time-slot arrival', 'Damage-free return pickup'],
    },
  ];

  return (
    <section id="business-benefits" className="py-24 bg-slate-50 border-b border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <Badge variant="teal">Why Companies Choose Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Engineered for Modern Business Agility
          </h2>
          <p className="text-base text-slate-600">
            Smart companies rent instead of purchasing depreciating assets. Discover how RentWork
            optimizes your balance sheet and facilities operations.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {benefit.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {benefit.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
