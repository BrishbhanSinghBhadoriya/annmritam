import React from 'react';
import { CATEGORIES_LIST } from '../data/products';

interface CategoryShowcaseProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-12 bg-white border-b border-[#DDE4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-[#B88A25] mb-1">
              Desi Superfoods Range
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E22]">
              Explore Superfood Categories
            </h2>
          </div>
          <p className="text-xs text-[#6B756D] max-w-md">
            Wholesome harvest from trusted Indian farms, packed fresh without artificial preservatives or processing.
          </p>
        </div>

        {/* Categories scrollable / flexible pill-free segmented buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0B2E22] text-[#D4AF37] shadow-sm font-semibold'
                    : 'bg-[#F8F5EC] text-[#24352B] hover:bg-[#DDE4DA]/60 border border-[#DDE4DA]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
