import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Building } from 'lucide-react';
import { Container } from '../layout/container.tsx';
import { Button } from '../ui/button.tsx';

interface CTASectionProps {
  onGetStarted?: () => void;
  onContactSales?: () => void;
}

export function CTASection({ onGetStarted, onContactSales }: CTASectionProps) {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1 text-xs font-semibold text-teal-400">
            <Building className="w-3.5 h-3.5" />
            Enterprise & Startup Procurement
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Ready to rent?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
            Equip your office, project, or corporate event with certified commercial equipment.
            No long-term debt, fast delivery, and fully flexible terms.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              variant="teal"
              size="lg"
              onClick={onGetStarted}
              className="w-full sm:w-auto gap-2 text-base font-semibold px-8"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onContactSales}
              className="w-full sm:w-auto gap-2 text-slate-900 border-slate-300 hover:bg-slate-100"
            >
              <PhoneCall className="w-4 h-4" />
              Speak with Facilities Advisor
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Standardized GST Invoices</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Cancel or Extend Anytime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Transparent Security Deposits</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
