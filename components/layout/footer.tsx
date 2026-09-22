import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from './container.tsx';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col matching officefurnrent.in */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  OfficeFurnRent
                  <span className="text-amber-400">.in</span>
                </span>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Pune Office Furniture Rental
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tired of spending heavily on office furniture maintenance every year? If depreciation is draining your budget, switch smart — get a complete office furniture setup on rent in Pune today!
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>GST Compliant Invoicing • Verified Commercial Quality</span>
            </div>
          </div>

          {/* Useful Links Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase border-b border-slate-800 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about-us" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Products on Rent</a></li>
              <li><a href="#rent-vs-buy" className="hover:text-amber-400 transition-colors">Why Rent vs Buy</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">Cost Calculator</a></li>
              <li><a href="#contact-us" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Products on Rent Col matching officefurnrent.in */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase border-b border-slate-800 pb-2">
              Products On Rent
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Office Chair Rental</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Modular Workstations</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Office Desk & Tables</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Storage & File Cabinets</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Conference Tables</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition-colors">Mobile Pedestals</a></li>
            </ul>
          </div>

          {/* Contact Details Col matching officefurnrent.in */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase border-b border-slate-800 pb-2">
              Contact Details
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Survey No 48, Pune Satara Road, Behind Hotel Mastan, Mangdewadi, Katraj, Pune, Maharashtra 411046
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919960466699" className="font-bold text-amber-400 hover:underline">
                  +91-9960 466 699
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:sales@officefurnrent.in" className="hover:text-white">
                  sales@officefurnrent.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon – Sat: 9:30 AM to 7:30 PM (Sunday Closed)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Coverage Tags */}
        <div className="mt-12 pt-6 border-t border-slate-800/80">
          <p className="text-[11px] text-slate-500 mb-2 font-semibold">
            Areas Served in Pune:
          </p>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400">
            <span>Hinjawadi IT Park</span> • <span>Kharadi EON</span> • <span>Baner-Balewadi</span> • <span>Viman Nagar</span> • <span>Magarpatta City</span> • <span>Hadapsar SP Infocity</span> • <span>Pimpri Chinchwad (PCMC)</span> • <span>Senapati Bapat Road</span> • <span>Kothrud</span> • <span>Aundh</span> • <span>Yerwada</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {currentYear} Office Furn Rent Pune. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#contact-us" className="hover:text-slate-300">Terms of Rental</a>
            <a href="#contact-us" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#contact-us" className="hover:text-slate-300">GST Registration</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
