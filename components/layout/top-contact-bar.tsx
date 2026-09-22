import React from 'react';
import { Phone, Mail, Clock, MapPin, Sparkles } from 'lucide-react';
import { Container } from './container.tsx';

export function TopContactBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 border-b border-slate-800/80">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Slogan / Location banner */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Your Workspace, Our Furniture, Your Comfort
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-400" />
              Serving Pune & Pimpri-Chinchwad Commercial Hubs
            </span>
          </div>

          {/* Contact Details */}
          <div className="flex items-center gap-5 text-[11px] sm:text-xs">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Mon - Sat: 9:30 AM - 7:30 PM</span>
            </div>

            <a
              href="mailto:sales@officefurnrent.in"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>sales@officefurnrent.in</span>
            </a>

            <a
              href="tel:+919960466699"
              className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>+91-9960 466 699</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
