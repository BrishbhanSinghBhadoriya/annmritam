import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onDirectCheckout: (product: Product, packIndex: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onDirectCheckout,
}) => {
  if (!product) return null;

  const [selectedPackIndex, setSelectedPackIndex] = useState(product.defaultPackIndex);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);

  const currentPack = product.packSizes[selectedPackIndex] || product.packSizes[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedPackIndex, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DDE4DA] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#DDE4DA] text-[#24352B] hover:text-[#0B2E22] flex items-center justify-center cursor-pointer shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F5EC] border border-[#DDE4DA] relative">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/80 text-[#6B756D] hover:text-[#0B2E22] border border-[#DDE4DA]'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust Origin Strip */}
            <div className="bg-[#F8F5EC] p-3 rounded-lg border border-[#DDE4DA] text-xs text-[#24352B] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#0B2E22]">
                <ShieldCheck className="w-4 h-4 text-[#B88A25]" />
                <span>Origin: {product.origin}</span>
              </div>
              <p className="text-[11px] text-[#6B756D]">
                Presented by Original &amp; Earthly Foods Pvt. Ltd.
              </p>
            </div>

            {/* Storage & Shelf Life */}
            <div className="text-xs space-y-1 text-[#6B756D] border-t border-[#DDE4DA] pt-3">
              <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
              <p><strong>Storage:</strong> {product.storageInstructions}</p>
            </div>
          </div>

          {/* Right Column: Details & Add to Cart */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B756D] mb-1">
                <span className="font-semibold text-[#B88A25] uppercase tracking-wider">
                  {product.brand} · {product.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[#24352B] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{product.rating}</span> ({product.reviewCount} reviews)
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E22]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#B88A25] font-medium mt-0.5">
                {product.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#24352B] leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Dietary Badges */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {product.dietaryBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-[#F8F5EC] border border-[#DDE4DA] px-2 py-0.5 rounded text-[#0B2E22] font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2 pt-2 border-t border-[#DDE4DA]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#24352B]">
                Choose Pack Size: <span className="text-[#B88A25] font-bold">{currentPack.label}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.packSizes.map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-2 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                      selectedPackIndex === idx
                        ? 'border-[#0B2E22] bg-[#0B2E22] text-[#E6C568] shadow-xs'
                        : 'border-[#DDE4DA] bg-white text-[#24352B] hover:border-[#B88A25]'
                    }`}
                  >
                    <div className="font-bold">{pack.label}</div>
                    <div className="font-semibold text-[11px] mt-0.5">₹{pack.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity & CTAs */}
            <div className="pt-3 border-t border-[#DDE4DA] space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#0B2E22]">
                  ₹{currentPack.price * quantity}
                </span>
                <span className="text-sm line-through text-[#6B756D]">
                  ₹{currentPack.originalPrice * quantity}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹{(currentPack.originalPrice - currentPack.price) * quantity}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center border border-[#DDE4DA] rounded-lg bg-[#F8F5EC] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded bg-white text-[#24352B] hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-[#0B2E22]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded bg-white text-[#24352B] hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#B88A25] hover:bg-[#D4AF37] text-[#0B2E22]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Buy Now button */}
                <button
                  onClick={() => {
                    onClose();
                    onDirectCheckout(product, selectedPackIndex);
                  }}
                  className="bg-[#0B2E22] hover:bg-[#123B2A] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Nutritional Breakdown Table */}
            <div className="border-t border-[#DDE4DA] pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2E22] mb-2">
                Nutritional Facts (Per 100g)
              </h4>
              <div className="grid grid-cols-4 gap-2 bg-[#F8F5EC] p-2.5 rounded-lg border border-[#DDE4DA] text-center text-[11px]">
                <div>
                  <span className="text-[#6B756D] block">Energy</span>
                  <strong className="text-[#0B2E22]">{product.nutritionPer100g.calories}</strong>
                </div>
                <div>
                  <span className="text-[#6B756D] block">Protein</span>
                  <strong className="text-[#0B2E22]">{product.nutritionPer100g.protein}</strong>
                </div>
                <div>
                  <span className="text-[#6B756D] block">Fiber</span>
                  <strong className="text-[#0B2E22]">{product.nutritionPer100g.dietaryFiber}</strong>
                </div>
                <div>
                  <span className="text-[#6B756D] block">Calcium</span>
                  <strong className="text-[#0B2E22]">{product.nutritionPer100g.calcium}</strong>
                </div>
              </div>
            </div>

            {/* Ayurvedic Benefits */}
            {product.ayurvedicBenefits.length > 0 && (
              <div className="border-t border-[#DDE4DA] pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2E22] mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88A25]" />
                  <span>Ayurvedic &amp; Holistic Indications</span>
                </h4>
                <ul className="space-y-1 text-xs text-[#24352B]">
                  {product.ayurvedicBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#B88A25] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            <div className="text-[11px] text-[#6B756D] border-t border-[#DDE4DA] pt-2">
              <strong>Ingredients:</strong> {product.ingredients}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
