import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { RentWorkLogo } from '../shared/RentWorkLogo.tsx';

interface RentWorkFooterProps {
  onNavigate?: (id: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function RentWorkFooter({ onNavigate, onOpenPrivacy, onOpenTerms }: RentWorkFooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <RentWorkLogo size="md" />
            <p className="text-slate-500 text-xs max-w-sm">
              Equip Today. Grow Tomorrow.
            </p>
            <p className="text-slate-400 text-[11px]">
              &copy; {new Date().getFullYear()} RentWork. All rights reserved.
            </p>
          </div>

          {/* Col 1: Products */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Products</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <a href="#products" className="hover:text-blue-600 transition-colors">
                  Office Furniture
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-600 transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-600 transition-colors">
                  Event Equipment
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-600 transition-colors">
                  Conference Equipment
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-blue-600 transition-colors">
                  Storage Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Company</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Follow */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Support</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <a href="#help" className="hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-blue-600 transition-colors">
                  Delivery &amp; Returns
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <h4 className="font-bold text-slate-900 text-xs mb-2">Follow Us</h4>
              <div className="flex items-center gap-3 text-slate-500">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>Pune Commercial Hub: EON Free Zone Kharadi, Hinjawadi Phase 1-3, Baner, PCMC</span>
          <span>A more flexible tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}
