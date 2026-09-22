import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '../../layout/container.tsx';
import { Button } from '../../ui/button.tsx';

interface RentVsBuySectionProps {
  onGetQuoteClick: () => void;
}

export function RentVsBuySection({ onGetQuoteClick }: RentVsBuySectionProps) {
  const comparisonRows = [
    {
      parameter: 'Initial Capital Investment',
      buying: 'High CapEx outlay (₹15,000 - ₹35,000 per workstation upfront)',
      renting: 'Zero upfront CapEx; only nominal monthly rental starting from ₹450/seat',
      winner: 'renting',
    },
    {
      parameter: 'Tax & Accounting Impact',
      buying: 'Capital asset depreciating over 5-8 years on balance sheet',
      renting: '100% tax-deductible operational expense (OpEx) with full GST input credit',
      winner: 'renting',
    },
    {
      parameter: 'Maintenance & Repairs',
      buying: 'Company bears full cost of carpenters, gas-lift replacements & parts',
      renting: 'Zero maintenance cost; free prompt servicing & replacement included',
      winner: 'renting',
    },
    {
      parameter: 'Team Scalability',
      buying: 'Excess desks sit idle in storage during team downsizing',
      renting: 'Easily return surplus items or order new pods within 48 hours',
      winner: 'renting',
    },
    {
      parameter: 'Office Relocation',
      buying: 'Huge logistics, dismantling, and damage risks when shifting offices',
      renting: 'Hassle-free dismantling, shifting, or lease handover managed by our crew',
      winner: 'renting',
    },
    {
      parameter: 'Modern Aesthetics & Upgrades',
      buying: 'Stuck with dated furniture for 7+ years to recover investment',
      renting: 'Upgrade to modern ergonomic designs anytime your brand evolves',
      winner: 'renting',
    },
  ];

  return (
    <section id="rent-vs-buy" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <Container>
        {/* Header from officefurnrent.in */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            The Economic Case
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Office Furniture on Rent in Pune – Smart, Affordable Workspace Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Are you exhausted from spending hefty amounts on the maintenance of your office furniture every year? If depreciating values are making a big hole in your pocket, it’s time to change. How about having a complete office furniture setup on rent in Pune that comes at a fraction of the cost of new furniture?
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-900 text-white">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-1/4">
                  Financial & Operational Factor
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8 text-slate-300">
                  Buying New Furniture
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8 text-amber-400 bg-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Renting with OfficeFurnRent
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={row.parameter}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-amber-50/30`}
                >
                  <td className="py-4 px-6 font-bold text-slate-900 align-top">
                    {row.parameter}
                  </td>

                  <td className="py-4 px-6 text-slate-600 align-top">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.buying}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-medium text-slate-900 bg-amber-50/40 align-top">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.renting}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Save up to 68% in your first 2 years of office setup in Pune
            </h4>
            <p className="text-xs text-slate-300">
              Calculate your exact rental requirements with our instant estimator or speak with our Pune facilities advisor.
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={onGetQuoteClick}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 shrink-0 text-xs"
          >
            Get a Free Quote Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
