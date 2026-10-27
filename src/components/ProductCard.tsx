import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(product.defaultPackIndex);
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const currentPack = product.packSizes[selectedPackIndex] || product.packSizes[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedPackIndex, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-xl border border-[#DDE4DA] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#F8F5EC] overflow-hidden border-b border-[#DDE4DA]/60">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Minimal Unboxed Text Tag */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 left-2.5 bg-[#0B2E22] text-[#E6C568] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
            Bestseller
          </div>
        )}
        {!product.isBestSeller && product.isNew && (
          <div className="absolute top-2.5 left-2.5 bg-[#B88A25] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
            New Harvest
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 text-[#6B756D] hover:text-[#0B2E22] border border-[#DDE4DA]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-[#6B756D] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#B88A25]">
              {product.brand}
            </span>
            <span className="flex items-center gap-0.5 text-[#24352B]">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-semibold">{product.rating}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#0B2E22] line-clamp-1 group-hover:text-[#B88A25] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle / Key Claim */}
          <p className="text-xs text-[#6B756D] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Pack Selector (Segmented buttons) */}
        <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="text-[10px] uppercase tracking-wider text-[#6B756D] font-medium flex items-center justify-between">
            <span>Pack Size</span>
            <span className="text-[#0B2E22] font-semibold">{currentPack.label}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {product.packSizes.map((pack, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPackIndex(idx)}
                className={`px-2 py-1 text-[11px] font-medium rounded border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedPackIndex === idx
                    ? 'border-[#0B2E22] bg-[#0B2E22] text-[#E6C568] font-bold'
                    : 'border-[#DDE4DA] bg-[#F8F5EC] text-[#24352B] hover:border-[#B88A25]'
                }`}
              >
                {pack.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-[#DDE4DA] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-[#0B2E22] tabular-nums">
                ₹{currentPack.price}
              </span>
              <span className="text-xs text-[#6B756D] line-through tabular-nums">
                ₹{currentPack.originalPrice}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Save ₹{currentPack.originalPrice - currentPack.price}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#B88A25] hover:bg-[#D4AF37] text-[#0B2E22]'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="text-[11px]">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-[11px]">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
