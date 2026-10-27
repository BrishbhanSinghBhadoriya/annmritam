import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface FeaturedProductSectionProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onDirectCheckout: (product: Product, packIndex: number) => void;
}

export const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({
  product,
  onQuickView,
  onDirectCheckout,
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(product.defaultPackIndex);
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPack = product.packSizes[selectedPackIndex];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedPackIndex, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <section className="py-16 bg-[#F8F5EC] border-b border-[#DDE4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold tracking-widest text-[#B88A25] mb-2">
            Flagship Superfood · Original &amp; Earthly
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2E22] tracking-tight">
            Featured Product: Annmritam Makhana
          </h2>
          <p className="text-[#6B756D] text-sm sm:text-base mt-3 leading-relaxed">
            Directly from the lotus ponds of Mithila, Bihar. Sun-popped, unbleached, and graded to generous 6-suta jumbo size for authentic Indian snacking and sacred rituals.
          </p>
        </div>

        {/* Featured Product Card */}
        <div className="bg-white rounded-2xl border border-[#DDE4DA] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          
          {/* Left Column: Product Imagery */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F5EC] border border-[#DDE4DA] relative">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* GI Tag & Origin Tag */}
              <div className="absolute top-3 left-3 bg-[#0B2E22] text-[#E6C568] text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>GI Tagged Mithila Origin</span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/90 text-[#6B756D] hover:text-[#0B2E22] border border-[#DDE4DA]'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Preview Thumbnails */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#6B756D]">
              <span className="flex items-center gap-1 text-[#0B2E22] font-medium">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold">4.9</span> / 5.0 (380+ Verified Desi Reviews)
              </span>
              <button
                onClick={() => onQuickView(product)}
                className="text-[#B88A25] hover:text-[#0B2E22] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Full Nutrition Sheet &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Brand */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#6B756D] font-medium mb-1">
                Annmritam · Desi Super Foods
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E22]">
                {product.name}
              </h3>
              <p className="text-sm text-[#B88A25] font-medium mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-[#24352B] leading-relaxed">
              {product.description}
            </p>

            {/* Dietary Highlights */}
            <div className="flex flex-wrap gap-2 text-xs text-[#24352B]">
              {product.dietaryBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-[#F8F5EC] border border-[#DDE4DA] px-2.5 py-1 rounded text-[11px] font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#24352B]">
                Select Pack Size: <span className="text-[#B88A25] font-bold">{currentPack.label}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {product.packSizes.map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedPackIndex === idx
                        ? 'border-[#0B2E22] bg-[#0B2E22] text-white shadow-sm'
                        : 'border-[#DDE4DA] bg-white text-[#24352B] hover:border-[#B88A25]'
                    }`}
                  >
                    <div className="font-bold text-xs">{pack.label}</div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-bold">₹{pack.price}</span>
                      <span className={`text-[10px] line-through ${selectedPackIndex === idx ? 'text-white/60' : 'text-[#6B756D]'}`}>
                        ₹{pack.originalPrice}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & CTA Action Bar */}
            <div className="pt-4 border-t border-[#DDE4DA] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2E22]">
                    ₹{currentPack.price}
                  </span>
                  <span className="text-sm line-through text-[#6B756D]">
                    ₹{currentPack.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save ₹{currentPack.originalPrice - currentPack.price}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B756D] mt-0.5">
                  Inclusive of all taxes · Free delivery on orders above ₹499
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 sm:flex-initial bg-[#B88A25] hover:bg-[#D4AF37] text-[#0B2E22] font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation ? 'scale-95 bg-emerald-600 text-white' : ''
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onDirectCheckout(product, selectedPackIndex)}
                  className="bg-[#0B2E22] hover:bg-[#123B2A] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Quick Nutrition Strip */}
            <div className="grid grid-cols-4 gap-2 pt-2 bg-[#F8F5EC] p-3 rounded-xl border border-[#DDE4DA] text-center">
              <div>
                <div className="text-[10px] text-[#6B756D] uppercase">Protein</div>
                <div className="text-xs font-bold text-[#0B2E22]">{product.nutritionPer100g.protein}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B756D] uppercase">Calcium</div>
                <div className="text-xs font-bold text-[#0B2E22]">{product.nutritionPer100g.calcium}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B756D] uppercase">Calories</div>
                <div className="text-xs font-bold text-[#0B2E22]">{product.nutritionPer100g.calories}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#6B756D] uppercase">Fats</div>
                <div className="text-xs font-bold text-[#0B2E22]">{product.nutritionPer100g.fats}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
