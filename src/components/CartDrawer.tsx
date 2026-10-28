import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', text: res.message });
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#C8B48A] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#254A2A] text-white flex items-center justify-between border-b border-[#1D3B20]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#A94B2B]" />
            <h2 className="font-serif text-lg font-bold text-white">Your Shopping Bag</h2>
            <span className="text-xs text-[#E8D6B8] bg-[#1D3B20] px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F1E2C5] px-4 py-3 border-b border-[#C8B48A] text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium text-[#1E3320]">
                <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong></span>
                <span className="font-bold text-[#A94B2B]">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#C8B48A] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#A94B2B] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>You have unlocked <strong>FREE Pan-India Delivery!</strong></span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#C8B48A]">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F1E2C5] border border-[#C8B48A] flex items-center justify-center mx-auto text-[#5A7260]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#254A2A]">Your bag is empty</h3>
                <p className="text-xs text-[#5A7260] mt-1 max-w-xs mx-auto">
                  Add Annmritam Jumbo Makhana or organic seeds to enjoy healthy Indian superfoods.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onExploreProducts();
                }}
                className="bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Explore Superfoods
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.productId}-${item.selectedPackIndex}`} className="py-3.5 flex gap-3">
                {/* Image */}
                <div className="w-16 h-16 rounded-lg bg-[#F1E2C5] border border-[#C8B48A] overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-xs font-bold text-[#254A2A] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.productId, item.selectedPackIndex)}
                        className="text-[#5A7260] hover:text-rose-600 p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#A94B2B] font-semibold mt-0.5">
                      Pack: {item.packSize.label}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-[#C8B48A] rounded bg-[#F1E2C5]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.selectedPackIndex, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1E3320] hover:bg-slate-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#254A2A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.selectedPackIndex, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1E3320] hover:bg-slate-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-serif text-[#254A2A]">
                        ₹{item.packSize.price * item.quantity}
                      </div>
                      <div className="text-[10px] text-[#5A7260] line-through">
                        ₹{item.packSize.originalPrice * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Calculation & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#C8B48A] space-y-3">
            
            {/* Coupon Application Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. DESI15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#F1E2C5] border border-[#C8B48A] rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#254A2A] text-[#A94B2B] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1D3B20] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p className={`text-[11px] mt-1 ${couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponFeedback.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-[#1E3320] pt-1">
              <div className="flex justify-between">
                <span className="text-[#5A7260]">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#5A7260]">Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#C8B48A] text-[#254A2A]">
                <span>Total Amount</span>
                <span className="font-serif text-base">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                onProceedToCheckout();
              }}
              className="w-full bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A] font-bold text-sm py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#5A7260]">
              All taxes included · 100% Genuine Mithila Desi Superfoods
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

