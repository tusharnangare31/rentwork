import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  PhoneCall,
  ShieldCheck,
  Truck,
  Sparkles,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../ui/button.tsx';
import { Container } from '../../layout/container.tsx';

interface HeroSliderProps {
  onGetQuoteClick: (category?: string) => void;
  onExploreProducts: (category?: string) => void;
}

const SLIDES = [
  {
    subtitle: 'Comfortable Seating on Rent',
    title: 'Office Chairs for Productive Workdays',
    description:
      'Choose premium chairs designed for comfort and posture perfect for long hours at work. Certified ergonomic mesh, pneumatic height adjustments, and sturdy wheels.',
    ctaCategory: 'chairs',
    badge: 'Starting at ₹399 / month',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a82104536b?auto=format&fit=crop&w=1000&q=80',
    stats: '5,000+ Chairs Deployed',
  },
  {
    subtitle: 'Modular Workstations for Teams',
    title: 'Workstations to Match Every Office Style',
    description:
      'Rent modern, space-saving workstations ideal for startups and growing IT businesses in Pune. Modular cable channels, privacy screens, and sturdy steel frames.',
    ctaCategory: 'workstations',
    badge: 'Custom Team Configurations',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    stats: 'Quick 48h Installation',
  },
  {
    subtitle: 'Smart Desks for Smarter Offices',
    title: 'Sleek and Functional Office Desks on Rent',
    description:
      'From executive cabin tables to boardroom conference desks, find rental options that fit your workspace aesthetics, team meetings, and commercial budget.',
    ctaCategory: 'tables',
    badge: 'Executive & Conference Desks',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80',
    stats: 'Zero Maintenance CapEx',
  },
  {
    subtitle: 'Space Saving Storage Solutions',
    title: 'Office Cabinets and Storage Units on Rent',
    description:
      'Keep your corporate workspace organized with stylish, heavy-duty file cabinets and under-desk mobile pedestals delivered and placed hassle-free.',
    ctaCategory: 'storage',
    badge: 'Lockable Steel Storage',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    stats: 'Flexible Tenures Available',
  },
];

export function HeroSlider({ onGetQuoteClick, onExploreProducts }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide rotation every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section id="home" className="relative overflow-hidden bg-slate-900 text-white">
      {/* Decorative gradient accents */}
      <div className="absolute inset-0 bg-radial from-slate-800 via-slate-900 to-slate-950 opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Slide Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Subtitle pill matching officefurnrent.in */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {slide.subtitle}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight min-h-[90px] sm:min-h-[120px] transition-all">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {slide.description}
            </p>

            {/* Key trust bullets */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Maintenance Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast Delivery & Setup in Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Flexible 1 - 36 Month Leases</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free Upgrades & Relocation</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => onGetQuoteClick(slide.ctaCategory)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-7 py-3 text-base rounded-xl shadow-lg shadow-amber-500/20 gap-2 cursor-pointer transition-transform active:scale-95"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onExploreProducts(slide.ctaCategory)}
                className="bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-white font-semibold px-6 py-3 text-base rounded-xl"
              >
                View Category
                <ChevronRight className="w-4 h-4 text-slate-400 ml-1" />
              </Button>

              <a
                href="tel:+919960466699"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 px-3 py-2 rounded-lg"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Call +91-9960 466 699</span>
              </a>
            </div>

            {/* Slide Navigation Dots */}
            <div className="pt-6 flex items-center gap-2.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover transition-all duration-700 hover:scale-105"
              />

              {/* Floating Badge on image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {slide.badge}
                  </p>
                  <p className="text-sm font-bold text-white">{slide.stats}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onGetQuoteClick(slide.ctaCategory)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                >
                  Inquire Now
                </button>
              </div>
            </div>

            {/* Quick trust tag pill */}
            <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-400 text-center">
              📍 Serving Hinjawadi, Kharadi, Baner, Viman Nagar, Magarpatta & All Pune Zones
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
