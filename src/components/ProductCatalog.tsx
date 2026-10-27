import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const dietaryOptions = [
    { id: 'all', label: 'All Diets' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
    { id: 'High Protein', label: 'High Protein' },
    { id: 'Vrat Friendly', label: 'Vrat / Fasting' },
    { id: 'Omega-3', label: 'Omega-3 Rich' },
    { id: 'A2 Desi Ghee', label: 'Desi Ghee' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchDesc && !matchCat) return false;
        }
        // Dietary filter
        if (selectedDietary !== 'all') {
          const hasDiet = p.dietaryBadges.some((badge) =>
            badge.toLowerCase().includes(selectedDietary.toLowerCase())
          );
          if (!hasDiet) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.packSizes[0].price - b.packSizes[0].price;
        }
        if (sortBy === 'price-desc') {
          return b.packSizes[0].price - a.packSizes[0].price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, selectedDietary, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedDietary('all');
    onSelectCategory('all');
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'all' || selectedDietary !== 'all' || searchQuery !== '';

  return (
    <section id="catalog-section" className="py-12 md:py-16 bg-[#F8F5EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E22]">
              Superfood Pantry Collection
            </h2>
            <p className="text-xs text-[#6B756D] mt-1">
              Showing {filteredProducts.length} authentic products by Annmritam
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#6B756D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search makhana, seeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2E22] text-[#24352B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6B756D] hover:text-[#0B2E22]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B756D] hidden sm:inline whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-white border border-[#DDE4DA] text-xs text-[#24352B] py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B2E22] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs bg-white border border-[#DDE4DA] rounded-lg text-[#24352B]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B88A25]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Dietary Filter Buttons Bar */}
        <div className={`mb-8 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DDE4DA]">
            <span className="text-xs font-semibold text-[#6B756D] mr-2">Dietary:</span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDietary(opt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedDietary === opt.id
                    ? 'bg-[#0B2E22] text-[#D4AF37]'
                    : 'bg-white border border-[#DDE4DA] text-[#6B756D] hover:text-[#0B2E22]'
                }`}
              >
                {opt.label}
              </button>
            ))}

            {isFiltered && (
              <button
                onClick={resetAllFilters}
                className="ml-auto text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-semibold cursor-pointer py-1 px-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DDE4DA] p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F8F5EC] text-[#B88A25] flex items-center justify-center mx-auto mb-3 font-serif text-xl font-bold">
              ∅
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0B2E22]">No superfoods matched</h3>
            <p className="text-xs text-[#6B756D] mt-1 mb-4">
              We couldn't find any products matching your active filters or search terms.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-[#0B2E22] text-[#D4AF37] px-4 py-2 text-xs font-semibold rounded-lg hover:bg-[#123B2A] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
