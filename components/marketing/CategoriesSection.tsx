import React, { useState } from 'react';
import {
  Armchair,
  Table,
  Monitor,
  Video,
  Sparkles,
  Archive,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../layout/container.tsx';
import { Card, CardContent } from '../ui/card.tsx';
import { Badge } from '../ui/badge.tsx';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  exampleItems: string[];
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'chairs',
    name: 'Chairs',
    description: 'Ergonomic task seating, executive high-backs, and conference chairs.',
    icon: Armchair,
    exampleItems: ['Mesh task chairs', 'Leather executive chairs', 'Nesting guest chairs'],
  },
  {
    id: 'tables',
    name: 'Tables & Desks',
    description: 'Electric height-adjustable desks, linear workstations, and boardroom tables.',
    icon: Table,
    exampleItems: ['Sit-stand desks', '10-Person conference tables', 'Modular breakout tables'],
  },
  {
    id: 'office-furniture',
    name: 'Office Furniture',
    description: 'Complete departmental cubicles, reception desks, and modular pods.',
    icon: Briefcase,
    exampleItems: ['Acoustic phone booths', 'Reception counters', 'Modular privacy dividers'],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Professional 4K display monitors, commercial copiers, and docking setups.',
    icon: Monitor,
    exampleItems: ['27" & 32" IPS monitors', 'High-volume multifunction printers', 'Universal USB-C docks'],
  },
  {
    id: 'conference-equipment',
    name: 'Conference Equipment',
    description: 'Enterprise audio-visual presentation hubs, microphones, and projector units.',
    icon: Video,
    exampleItems: ['Laser 4K projectors', 'Video conferencing soundbars', 'Wireless presentation clickers'],
  },
  {
    id: 'event-furniture',
    name: 'Event Equipment',
    description: 'Temporary furniture, exhibition displays, and summit lounge setups.',
    icon: Sparkles,
    exampleItems: ['High-top bar tables', 'Velvet lounge couches', 'Exhibition stanchions & ropes'],
  },
];

interface CategoriesSectionProps {
  onSelectCategory?: (categoryId: string) => void;
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id === activeCategory ? null : id);
    onSelectCategory?.(id);
  };

  return (
    <section id="categories" className="py-20 bg-slate-50 border-b border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <Badge variant="teal">Equipment Taxonomy</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Commercial Rental Categories
            </h2>
            <p className="text-base text-slate-600 max-w-xl">
              Source standardized, enterprise-ready furniture and commercial equipment with zero
              long-term lease liabilities.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Verified Partner Inventory
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <Card
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isSelected
                    ? 'ring-2 ring-teal-600 border-teal-600 bg-teal-50/20'
                    : 'hover:border-slate-300'
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{cat.description}</p>
                  </div>

                  {/* Example items tags */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {cat.exampleItems.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            💡 <strong>Need customized fleet leasing?</strong> We support custom volume procurements for offices with 50+ workstations.
          </span>
          <a
            href="#business-benefits"
            className="inline-flex items-center gap-1 text-teal-700 font-bold hover:underline shrink-0"
          >
            Learn about corporate volume tiers <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
