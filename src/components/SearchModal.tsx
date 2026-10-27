import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.dietaryBadges.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [query, products]);

  if (!isOpen) return null;

  const popularSearches = [
    'Mithila Makhana',
    'Pink Salt Makhana',
    'Chia Seeds',
    'Pumpkin Seeds',
    'Flax Seeds',
    'Vrat Fasting',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#DDE4DA] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#DDE4DA] flex items-center gap-3 bg-[#F8F5EC]">
          <Search className="w-5 h-5 text-[#B88A25] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Annmritam superfoods, makhana, seeds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0B2E22] placeholder-[#6B756D] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#6B756D] hover:text-[#0B2E22] px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#6B756D] hover:text-[#0B2E22] hover:bg-black/5 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 text-xs">
            <span className="font-semibold text-[#6B756D] uppercase tracking-wider block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(term)}
                  className="bg-[#F8F5EC] hover:bg-[#0B2E22] hover:text-[#D4AF37] text-[#24352B] border border-[#DDE4DA] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="p-4 max-h-96 overflow-y-auto divide-y divide-[#DDE4DA]">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#F8F5EC] rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover border border-[#DDE4DA]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#0B2E22] group-hover:text-[#B88A25]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#6B756D]">{product.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-serif font-bold text-sm text-[#0B2E22]">
                        ₹{product.packSizes[0].price}
                      </div>
                      <div className="text-[10px] text-[#6B756D]">
                        from {product.packSizes[0].label}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B756D] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-[#6B756D]">
                No superfoods found for &ldquo;{query}&rdquo;. Try &ldquo;makhana&rdquo; or &ldquo;seeds&rdquo;.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
