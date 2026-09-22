import React from 'react';
import {
  Check,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  Wrench,
  Truck,
  RotateCw,
  Award,
} from 'lucide-react';
import { Container } from '../../layout/container.tsx';
import { Button } from '../../ui/button.tsx';

interface AboutSectionProps {
  onGetQuoteClick: () => void;
}

export function AboutSection({ onGetQuoteClick }: AboutSectionProps) {
  const benefits = [
    { title: 'Cost-effective furniture rental', desc: 'No heavy initial CapEx outlay; convert furnishing into affordable OpEx.' },
    { title: 'Quick setup & fast delivery in Pune', desc: 'Doorstep delivery and professional installation within 48 to 72 hours.' },
    { title: 'Zero maintenance & free repairs', desc: 'We handle regular wear-and-tear servicing at no additional charges.' },
    { title: 'Flexible tenure & easy upgrades', desc: 'Scale up or swap models anytime as your headcount expands or pivots.' },
    { title: 'Commercial-grade ergonomic design', desc: 'Premium materials, BIFMA-standard seating, and durable commercial finishes.' },
    { title: 'Hassle-free return & relocation', desc: 'Moving office? We dismantle, shift, or collect furniture smoothly.' },
  ];

  return (
    <section id="about-us" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual representation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                alt="Office Furniture Setup in Pune"
                referrerPolicy="no-referrer"
                className="w-full h-96 sm:h-[460px] object-cover"
              />

              {/* Float Experience Card */}
              <div className="absolute -bottom-2 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black text-xl shrink-0">
                    10+
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      Years of Commercial Furnishing
                    </h4>
                    <p className="text-xs text-slate-400">
                      Furnished 450+ IT offices, co-working spaces & startups across Pune
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed narrative matching officefurnrent.in */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
                Smart Office Rentals
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Affordable & Flexible Office Furniture Solutions in Pune
              </h2>
            </div>

            <p className="text-base font-semibold text-slate-800 leading-relaxed">
              Rent high-quality office setups and reduce expenses while enjoying flexible, best-in-class workspace solutions.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Rent office furniture in Pune at low cost. Enjoy quick setup, flexible plans, stylish workspaces, easy upgrades, and hassle-free service without extra spending. Stop tying up corporate funds in depreciating office assets that cost a fortune to repair, store, and move.
            </p>

            {/* Benefits 2-column checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{b.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={onGetQuoteClick}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 rounded-xl"
              >
                Request Custom Proposal
              </Button>
              <div className="text-xs text-slate-500 font-medium">
                ⚡ 100% Tax Deductible (Operating Expense)
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
