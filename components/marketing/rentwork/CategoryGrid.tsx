import React from 'react';
import {
  Armchair,
  Monitor,
  Volume2,
  Tv,
  Archive,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export function CategoryGrid({ onSelectCategory, selectedCategory }: CategoryGridProps) {
  const categories = [
    {
      id: 'furniture',
      title: 'Office Furniture',
      subtitle: 'Chairs, tables, desks',
      image: 'https://images.unsplash.com/photo-1580481077195-c3a82104536b?auto=format&fit=crop&w=320&q=80',
      icon: Armchair,
    },
    {
      id: 'electronics',
      title: 'Electronics',
      subtitle: 'Monitors, projectors, printers',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=320&q=80',
      icon: Monitor,
    },
    {
      id: 'events',
      title: 'Event Equipment',
      subtitle: 'Chairs, stages, audio',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=320&q=80',
      icon: Volume2,
    },
    {
      id: 'conference',
      title: 'Conference Equipment',
      subtitle: 'Video, audio, displays',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=320&q=80',
      icon: Tv,
    },
    {
      id: 'storage',
      title: 'Storage Solutions',
      subtitle: 'Cabinets, shelves, racks',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=320&q=80',
      icon: Archive,
    },
    {
      id: 'all',
      title: 'More Categories',
      subtitle: 'Explore all ->',
      isMore: true,
      icon: MoreHorizontal,
    },
  ];

  return (
    <section className="py-12 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Browse by Category
          </h2>
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Cards in Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Visual Thumbnail or Icon Frame */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 mb-3 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-slate-200/80 flex items-center justify-center text-slate-600">
                      <Icon className="w-7 h-7 text-slate-600" />
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
