import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '../../layout/container.tsx';
import { Card, CardContent } from '../../ui/card.tsx';
import { Button } from '../../ui/button.tsx';

interface InstantQuoteCalculatorProps {
  onProceedToQuote: (details: {
    chairs: number;
    workstations: number;
    cabins: number;
    storage: number;
    durationMonths: number;
    monthlyTotal: number;
  }) => void;
  onDirectOrder?: (details: {
    chairs: number;
    workstations: number;
    cabins: number;
    storage: number;
    durationMonths: number;
    monthlyTotal: number;
    totalRentForTenure: number;
  }) => void;
}

export function InstantQuoteCalculator({ onProceedToQuote, onDirectOrder }: InstantQuoteCalculatorProps) {
  const [chairsCount, setChairsCount] = useState<number>(10);
  const [workstationsCount, setWorkstationsCount] = useState<number>(10);
  const [cabinsCount, setCabinsCount] = useState<number>(1);
  const [storageCount, setStorageCount] = useState<number>(5);
  const [durationMonths, setDurationMonths] = useState<number>(6);

  // Unit rates in INR per month
  const RATE_CHAIR = 450;
  const RATE_WORKSTATION = 850;
  const RATE_CABIN = 1200;
  const RATE_STORAGE = 300;

  // Base raw monthly sum
  const baseMonthly =
    chairsCount * RATE_CHAIR +
    workstationsCount * RATE_WORKSTATION +
    cabinsCount * RATE_CABIN +
    storageCount * RATE_STORAGE;

  // Duration discounts for long-term leases
  // 3 months: 0%, 6 months: 8% discount, 12 months: 15% discount, 24+ months: 20% discount
  const discountPercent =
    durationMonths >= 24 ? 20 : durationMonths >= 12 ? 15 : durationMonths >= 6 ? 8 : 0;

  const discountAmount = Math.round(baseMonthly * (discountPercent / 100));
  const discountedMonthly = baseMonthly - discountAmount;
  const gst = Math.round(discountedMonthly * 0.18);
  const finalMonthlyWithGst = discountedMonthly + gst;

  // Equivalent purchase estimate (approx ₹18,000 per workstation, ₹7,000 per chair, ₹15,000 cabin, ₹4,500 pedestal)
  const equivalentPurchaseCost =
    chairsCount * 7000 +
    workstationsCount * 18000 +
    cabinsCount * 15000 +
    storageCount * 4500;

  const totalRentForTenure = finalMonthlyWithGst * durationMonths;
  const upfrontSavings = equivalentPurchaseCost - (finalMonthlyWithGst * 3); // initial 3 months vs CapEx

  const handleSend = () => {
    onProceedToQuote({
      chairs: chairsCount,
      workstations: workstationsCount,
      cabins: cabinsCount,
      storage: storageCount,
      durationMonths,
      monthlyTotal: finalMonthlyWithGst,
    });
  };

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            Cost Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Instant Office Rental Budget Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Estimate your monthly corporate rental expense in real time with transparent rates, long-term tenure discounts, and zero hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Sliders & Counters */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              Configure Your Office Inventory
            </h3>

            {/* Control 1: Ergonomic Chairs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Ergonomic Medium-Back Chairs (₹{RATE_CHAIR}/mo)</span>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-mono text-sm">
                  {chairsCount} units
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={chairsCount}
                onChange={(e) => setChairsCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+ seats</span>
              </div>
            </div>

            {/* Control 2: Modular Workstations */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Modular Linear Workstations (₹{RATE_WORKSTATION}/mo)</span>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-mono text-sm">
                  {workstationsCount} units
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={workstationsCount}
                onChange={(e) => setWorkstationsCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+ seats</span>
              </div>
            </div>

            {/* Control 3: Executive Cabin Tables */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Executive Cabin Desks (₹{RATE_CABIN}/mo)</span>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-mono text-sm">
                  {cabinsCount} units
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCabinsCount(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      cabinsCount === num
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Mobile Pedestals / Storage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Under-Desk Mobile Pedestals (₹{RATE_STORAGE}/mo)</span>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-mono text-sm">
                  {storageCount} units
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={storageCount}
                onChange={(e) => setStorageCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
            </div>

            {/* Rental Tenure Selection */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Rental Tenure (Duration)</span>
                {discountPercent > 0 && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    🎉 {discountPercent}% Long-Term Discount Applied
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { m: 3, label: '3 Months' },
                  { m: 6, label: '6 Months', tag: '8% off' },
                  { m: 12, label: '12 Months', tag: '15% off' },
                  { m: 24, label: '24 Months', tag: '20% off' },
                ].map((item) => (
                  <button
                    key={item.m}
                    type="button"
                    onClick={() => setDurationMonths(item.m)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      durationMonths === item.m
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-500 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.tag && (
                      <span className="text-[9px] font-semibold text-slate-900 mt-0.5 opacity-80">
                        {item.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Monthly Rental Estimate
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ₹{finalMonthlyWithGst.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ month (incl. 18% GST)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero security deposit for verified corporate entities with GSTIN.
              </p>
            </div>

            {/* Line item breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Base Subtotal:</span>
                <span className="font-mono">₹{baseMonthly.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Tenure Discount ({discountPercent}%):</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Discounted Monthly:</span>
                <span className="font-mono">₹{discountedMonthly.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18% input credit eligible):</span>
                <span className="font-mono">₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800 text-sm">
                <span>Total for {durationMonths} Months:</span>
                <span className="font-mono text-amber-400">
                  ₹{totalRentForTenure.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CapEx Savings Insight */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Preserve Your Working Capital
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Purchasing this setup brand-new would cost ~₹{equivalentPurchaseCost.toLocaleString('en-IN')}. Renting frees up <strong>₹{Math.max(0, upfrontSavings).toLocaleString('en-IN')}</strong> in immediate cash flow for your business operations!
              </p>
            </div>

            <div className="space-y-2.5">
              {onDirectOrder && (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() =>
                    onDirectOrder({
                      chairs: chairsCount,
                      workstations: workstationsCount,
                      cabins: cabinsCount,
                      storage: storageCount,
                      durationMonths,
                      monthlyTotal: finalMonthlyWithGst,
                      totalRentForTenure,
                    })
                  }
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl gap-2 cursor-pointer shadow-lg text-sm"
                >
                  Order Configured Setup & Pay Online
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={handleSend}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 font-bold py-2.5 rounded-xl gap-2 cursor-pointer text-xs"
              >
                Or Request Quotation via Email
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-amber-400" /> Doorstep Delivery
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-amber-400" /> Free Setup
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-amber-400" /> Full Servicing
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
