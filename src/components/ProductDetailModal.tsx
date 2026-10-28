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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#C8B48A] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-[#C8B48A] text-[#1E3320] hover:text-[#254A2A] flex items-center justify-center cursor-pointer shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F1E2C5] border border-[#C8B48A] relative">
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
                    : 'bg-white/80 text-[#5A7260] hover:text-[#254A2A] border border-[#C8B48A]'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust Origin Strip */}
            <div className="bg-[#F1E2C5] p-3 rounded-lg border border-[#C8B48A] text-xs text-[#1E3320] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#254A2A]">
                <ShieldCheck className="w-4 h-4 text-[#A94B2B]" />
                <span>Origin: {product.origin}</span>
              </div>
              <p className="text-[11px] text-[#5A7260]">
                Presented by Original and Earthly Foods Pvt. Ltd.
              </p>
            </div>

            {/* Storage & Shelf Life */}
            <div className="text-xs space-y-1 text-[#5A7260] border-t border-[#C8B48A] pt-3">
              <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
              <p><strong>Storage:</strong> {product.storageInstructions}</p>
            </div>
          </div>

          {/* Right Column: Details & Add to Cart */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5A7260] mb-1">
                <span className="font-semibold text-[#A94B2B] uppercase tracking-wider">
                  {product.brand} · {product.categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-[#1E3320] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#A94B2B] text-[#A94B2B]" />
                  <span>{product.rating}</span> ({product.reviewCount} reviews)
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#254A2A]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#A94B2B] font-medium mt-0.5">
                {product.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#1E3320] leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Dietary Badges */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {product.dietaryBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-[#F1E2C5] border border-[#C8B48A] px-2 py-0.5 rounded text-[#254A2A] font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2 pt-2 border-t border-[#C8B48A]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E3320]">
                Choose Pack Size: <span className="text-[#A94B2B] font-bold">{currentPack.label}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.packSizes.map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-2 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                      selectedPackIndex === idx
                        ? 'border-[#254A2A] bg-[#254A2A] text-[#E8D6B8] shadow-xs'
                        : 'border-[#C8B48A] bg-white text-[#1E3320] hover:border-[#A94B2B]'
                    }`}
                  >
                    <div className="font-bold">{pack.label}</div>
                    <div className="font-semibold text-[11px] mt-0.5">₹{pack.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity & CTAs */}
            <div className="pt-3 border-t border-[#C8B48A] space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#254A2A]">
                  ₹{currentPack.price * quantity}
                </span>
                <span className="text-sm line-through text-[#5A7260]">
                  ₹{currentPack.originalPrice * quantity}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹{(currentPack.originalPrice - currentPack.price) * quantity}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center border border-[#C8B48A] rounded-lg bg-[#F1E2C5] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded bg-white text-[#1E3320] hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-[#254A2A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded bg-white text-[#1E3320] hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer"
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
                      : 'bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A]'
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
                  className="bg-[#254A2A] hover:bg-[#1D3B20] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Nutritional Breakdown Table */}
            <div className="border-t border-[#C8B48A] pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-2">
                Nutritional Facts (Per 100g)
              </h4>
              <div className="grid grid-cols-4 gap-2 bg-[#F1E2C5] p-2.5 rounded-lg border border-[#C8B48A] text-center text-[11px]">
                <div>
                  <span className="text-[#5A7260] block">Energy</span>
                  <strong className="text-[#254A2A]">{product.nutritionPer100g.calories}</strong>
                </div>
                <div>
                  <span className="text-[#5A7260] block">Protein</span>
                  <strong className="text-[#254A2A]">{product.nutritionPer100g.protein}</strong>
                </div>
                <div>
                  <span className="text-[#5A7260] block">Fiber</span>
                  <strong className="text-[#254A2A]">{product.nutritionPer100g.dietaryFiber}</strong>
                </div>
                <div>
                  <span className="text-[#5A7260] block">Calcium</span>
                  <strong className="text-[#254A2A]">{product.nutritionPer100g.calcium}</strong>
                </div>
              </div>
            </div>

            {/* Ayurvedic Benefits */}
            {product.ayurvedicBenefits.length > 0 && (
              <div className="border-t border-[#C8B48A] pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#A94B2B]" />
                  <span>Ayurvedic &amp; Holistic Indications</span>
                </h4>
                <ul className="space-y-1 text-xs text-[#1E3320]">
                  {product.ayurvedicBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#A94B2B] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            <div className="text-[11px] text-[#5A7260] border-t border-[#C8B48A] pt-2">
              <strong>Ingredients:</strong> {product.ingredients}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

