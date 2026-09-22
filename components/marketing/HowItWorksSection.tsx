import React from 'react';
import { PackageCheck, CalendarRange, Truck, RotateCcw } from 'lucide-react';
import { Container } from '../layout/container.tsx';
import { Badge } from '../ui/badge.tsx';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose equipment',
      description:
        'Select certified commercial equipment, conference AV, or office workstations matching your headcount and project requirements.',
      icon: PackageCheck,
    },
    {
      number: '02',
      title: 'Select rental period',
      description:
        'Choose flexible daily, weekly, or monthly tenure. Dynamic duration discounts and transparent deposits are computed instantly.',
      icon: CalendarRange,
    },
    {
      number: '03',
      title: 'Get it delivered',
      description:
        'Verified logistics partners deliver, assemble, and position equipment directly inside your office or event facility.',
      icon: Truck,
    },
    {
      number: '04',
      title: 'Return when finished',
      description:
        'Easily extend your lease with one click, or schedule a hassle-free pickup when your project or event concludes.',
      icon: RotateCcw,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <Badge variant="secondary">Seamless Lifecycle</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How RentWork Operates
          </h2>
          <p className="text-base text-slate-600">
            A 4-step streamlined B2B workflow designed specifically for business speed, procurement
            compliance, and zero asset burden.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
              >
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                    <Icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 tracking-tighter">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Subtext indicator */}
                <div className="mt-auto pt-4 text-[11px] font-semibold text-teal-700 flex items-center gap-1 uppercase tracking-wider">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
