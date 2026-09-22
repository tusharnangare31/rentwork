import React from 'react';
import { MapPin, Truck, Clock, CheckCircle, PhoneCall } from 'lucide-react';
import { Container } from '../../layout/container.tsx';

export function CoverageAreasSection() {
  const hubs = [
    { name: 'Hinjawadi Infotech Park', subtitle: 'Phase 1, Phase 2 & Phase 3', delivery: '24-48 Hours' },
    { name: 'Kharadi Commercial Zone', subtitle: 'EON IT Park & World Trade Center', delivery: '24-48 Hours' },
    { name: 'Baner & Balewadi Corridor', subtitle: 'High Street & Corporate Towers', delivery: 'Same/Next Day' },
    { name: 'Magarpatta & Hadapsar', subtitle: 'Cybercity & SP Infocity', delivery: '24-48 Hours' },
    { name: 'Viman Nagar & Yerwada', subtitle: 'Commerzone & Business Bay', delivery: '24-48 Hours' },
    { name: 'Pimpri-Chinchwad & Bhosari', subtitle: 'Industrial MIDC & Tech Parks', delivery: '24-48 Hours' },
    { name: 'Senapati Bapat Road & SB Road', subtitle: 'ICC Tech Park & Central Pune', delivery: 'Same/Next Day' },
    { name: 'Kothrud, Aundh & Bavdhan', subtitle: 'Commercial & Startup Offices', delivery: 'Same/Next Day' },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            Rapid Pune Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Prompt Delivery & Installation Across Pune & PCMC
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our specialized commercial delivery fleet and trained carpenters assemble your workstations, desks, and chairs directly on-site at all major Pune business hubs.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hubs.map((hub) => (
            <div
              key={hub.name}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 transition-all"
            >
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-600 shadow-2xs shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{hub.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{hub.subtitle}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>Setup: {hub.delivery}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warehouse & Hub Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Central Distribution Facility:</strong> Survey No 48, Pune Satara Road, Behind Hotel Mastan, Mangdewadi, Katraj, Pune, Maharashtra 411046
            </span>
          </div>
          <a
            href="tel:+919960466699"
            className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-amber-600 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            Check delivery to your pincode
          </a>
        </div>
      </Container>
    </section>
  );
}
