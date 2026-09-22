import React, { useState } from 'react';
import {
  Armchair,
  Table,
  LayoutGrid,
  Archive,
  ArrowRight,
  Check,
  Search,
  Sparkles,
  Info,
} from 'lucide-react';
import { Container } from '../../layout/container.tsx';
import { Card, CardContent } from '../../ui/card.tsx';
import { Button } from '../../ui/button.tsx';
import { Badge } from '../../ui/badge.tsx';

export interface OfficeProduct {
  id: string;
  name: string;
  category: 'chairs' | 'workstations' | 'tables' | 'storage';
  categoryLabel: string;
  tagline: string;
  description: string;
  rentalPriceMonthly: number;
  minDuration: string;
  imageUrl: string;
  dimensions: string;
  features: string[];
  securityDeposit?: number;
  condition?: string;
}

export const OFFICE_PRODUCTS: OfficeProduct[] = [
  {
    id: 'cabin-table',
    name: 'Executive Cabin Table',
    category: 'tables',
    categoryLabel: 'Office Tables',
    tagline: 'Spacious & authoritative executive desk',
    description: 'Stylish and spacious tables perfect for directors, executives, and private managerial cabins. Features cable pass-throughs and integrated side runner.',
    rentalPriceMonthly: 1200,
    minDuration: '3 Months',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    dimensions: '5 ft x 2.5 ft x 2.5 ft (L x W x H)',
    features: ['High-density engineered wood', 'Scratch-resistant laminate', 'Integrated grommet for laptop cords'],
  },
  {
    id: 'conference-table',
    name: 'Corporate Conference Table',
    category: 'tables',
    categoryLabel: 'Office Tables',
    tagline: '8 to 12 seater boardroom centerpiece',
    description: 'Large tables ideal for meetings, presentations, stakeholder discussions, and executive teamwork sessions in your corporate office.',
    rentalPriceMonthly: 2800,
    minDuration: '3 Months',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80',
    dimensions: '8 ft x 4 ft x 2.5 ft',
    features: ['Dual flip-top pop-up power boxes', 'Heavy gauge MS understructure', 'Accommodates up to 10-12 chairs'],
  },
  {
    id: 'medium-back-chair',
    name: 'Medium Back Ergonomic Chair',
    category: 'chairs',
    categoryLabel: 'Office Chairs',
    tagline: 'High-comfort daily task seating',
    description: 'Comfortable chairs providing excellent lumbar support for daily office use, software engineering sprints, and long work hours.',
    rentalPriceMonthly: 450,
    minDuration: '1 Month',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a82104536b?auto=format&fit=crop&w=600&q=80',
    dimensions: 'Adjustable height 38" - 42"',
    features: ['Breathable mesh backrest', 'Pneumatic gas-lift cylinder', 'Nylon 5-star base with PU casters'],
  },
  {
    id: 'revolving-office-chair',
    name: 'Revolving High Back Executive Chair',
    category: 'chairs',
    categoryLabel: 'Office Chairs',
    tagline: 'Full spine support with multi-tilt lock',
    description: 'Ergonomic swivel chairs designed for managerial flexibility, plush cushion comfort, and sustained focus throughout demanding workdays.',
    rentalPriceMonthly: 650,
    minDuration: '1 Month',
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80',
    dimensions: 'Adjustable height 44" - 48"',
    features: ['Synchronized tilting mechanism', 'Adjustable 2D armrests', 'Integrated neck & headrest'],
  },
  {
    id: 'single-seats-workstation',
    name: 'Single Seat Workstation',
    category: 'workstations',
    categoryLabel: 'Workstations',
    tagline: 'Compact focused workstation unit',
    description: 'Individual workstations thoughtfully designed to boost employee productivity, maintain privacy, and optimize commercial floor square footage.',
    rentalPriceMonthly: 850,
    minDuration: '3 Months',
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=600&q=80',
    dimensions: '3.5 ft x 2 ft x 4 ft (with screen)',
    features: ['Acoustic fabric pinnable partition', 'Integrated wire trunking raceway', 'Heavy duty powder-coated frame'],
  },
  {
    id: 'cluster-workstation-4',
    name: '4-Seater Linear Cluster Workstation',
    category: 'workstations',
    categoryLabel: 'Workstations',
    tagline: 'Collaborative team modular pod',
    description: 'Modern 4-person workstation benching system with privacy dividers, centralized wire raceways, and dedicated power management.',
    rentalPriceMonthly: 3200,
    minDuration: '3 Months',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    dimensions: '8 ft x 4 ft x 4 ft',
    features: ['Includes 4 separate work areas', 'Dual raceway for LAN & power', 'Frosted glass/fabric screen'],
  },
  {
    id: 'file-cabinet',
    name: 'Lockable Steel File Cabinet',
    category: 'storage',
    categoryLabel: 'Storage Units',
    tagline: 'Heavy-duty archival storage',
    description: 'Keep your confidential legal documents, accounting files, and office records organized and secure with high-gauge steel cabinets.',
    rentalPriceMonthly: 550,
    minDuration: '3 Months',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    dimensions: '4.5 ft x 3 ft x 1.5 ft (4 Shelves)',
    features: ['Three-point central locking system', 'Anti-rust powder coated steel', 'Heavy payload per shelf (50kg+)'],
  },
  {
    id: 'pedestal',
    name: '3-Drawer Mobile Under-Desk Pedestal',
    category: 'storage',
    categoryLabel: 'Storage Units',
    tagline: 'Personal desk drawer on castors',
    description: 'Compact and sturdy mobile pedestals to neatly store laptops, personal belongings, and daily stationery within arm reach of staff.',
    rentalPriceMonthly: 300,
    minDuration: '1 Month',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    dimensions: '16" x 18" x 24" (W x D x H)',
    features: ['Fits under standard workstations', 'Lockable top drawer', 'Smooth swivel castors with brakes'],
  },
  {
    id: 'stackable-chair',
    name: 'Multi-Purpose Stackable Chair',
    category: 'chairs',
    categoryLabel: 'Office Chairs',
    tagline: 'Space saving guest & training seating',
    description: 'Lightweight, durable, and space-saving stackable chairs that are easy to move, store efficiently, and configure for cafeteria or seminars.',
    rentalPriceMonthly: 180,
    minDuration: '1 Month',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    dimensions: 'Standard Training Height',
    features: ['Stacks up to 10 high safely', 'Cushioned fabric seat pad', 'Chrome-plated tubular steel frame'],
  },
];

interface ProductCatalogSectionProps {
  onSelectProductForQuote: (productName: string) => void;
  onRentProduct?: (product: OfficeProduct) => void;
  initialCategory?: string;
}

export function ProductCatalogSection({
  onSelectProductForQuote,
  onRentProduct,
  initialCategory = 'all',
}: ProductCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Furniture', icon: Sparkles },
    { id: 'chairs', label: 'Office Chairs', icon: Armchair },
    { id: 'workstations', label: 'Workstations', icon: LayoutGrid },
    { id: 'tables', label: 'Desks & Tables', icon: Table },
    { id: 'storage', label: 'Storage Units', icon: Archive },
  ];

  const filteredProducts = OFFICE_PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesQuery =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="products" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <Container>
        {/* Header matching officefurnrent.in */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            Office Furniture Range
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Explore Our Wide Range of Premium Office Furniture on Rent
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From single executive cabins to 500-seat tech enterprise floors in Pune, choose fully maintained, commercial-grade furniture with fast delivery.
          </p>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chairs, workstations..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between overflow-hidden border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white rounded-md">
                      {product.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 text-xs font-black bg-amber-500 text-slate-950 rounded-md shadow-sm">
                      ₹{product.rentalPriceMonthly.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] font-medium">/ month</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bullet Specs */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="text-[11px] font-semibold text-slate-400">
                      📐 {product.dimensions}
                    </div>
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectProductForQuote(product.name)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950 border-slate-200 cursor-pointer"
                >
                  Quote
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    if (onRentProduct) {
                      onRentProduct(product);
                    } else {
                      onSelectProductForQuote(product.name);
                    }
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 cursor-pointer shadow-xs"
                >
                  Rent Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-base font-bold text-slate-800">No furniture matched your search query.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for chairs, workstations, tables, or storage cabinets.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Corporate Fleet Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Need to furnish an entire office floor in Pune?
            </h4>
            <p className="text-xs text-slate-500 max-w-xl">
              We offer turnkey workspace packages with customized 2D layout planning, matching executive cabins, and volume discounts for 20+ seats.
            </p>
          </div>
          <Button
            variant="default"
            size="default"
            onClick={() => onSelectProductForQuote('Turnkey Office Setup (20+ Seats)')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-6 shrink-0"
          >
            Request Turnkey Office Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
