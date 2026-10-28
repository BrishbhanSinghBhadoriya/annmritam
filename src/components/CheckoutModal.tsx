import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Smartphone, Building, Banknote, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderCustomerDetails, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { cart, subtotal, discountAmount, shippingFee, finalTotal, appliedCoupon, placeOrder } = useCart();

  const [formData, setFormData] = useState<OrderCustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'upi',
    notes: '',
  });

  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) return setErrorMsg('Please enter your full name.');
    if (!formData.email.trim() || !formData.email.includes('@')) return setErrorMsg('Please enter a valid email.');
    if (!formData.phone.trim() || formData.phone.length < 10) return setErrorMsg('Please enter a valid 10-digit mobile number.');
    if (!formData.addressLine1.trim()) return setErrorMsg('Please enter your delivery street address.');
    if (!formData.city.trim()) return setErrorMsg('Please enter your city.');
    if (!formData.pincode.trim() || formData.pincode.length < 6) return setErrorMsg('Please enter a valid 6-digit postal pincode.');

    setIsSubmitting(true);

    // Simulate secure order verification and gateway call
    setTimeout(() => {
      const randomOrderId = 'AM-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDays = formData.deliveryMethod === 'express' ? 2 : 4;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

      const placed: PlacedOrder = {
        orderId: randomOrderId,
        orderDate: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee + (formData.deliveryMethod === 'express' ? 99 : 0),
        total: finalTotal + (formData.deliveryMethod === 'express' ? 99 : 0),
        appliedCoupon: appliedCoupon?.code,
        customer: formData,
        status: 'Confirmed',
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      };

      placeOrder(placed);
      setIsSubmitting(false);
      onClose();
      onOrderSuccess(placed);
    }, 1200);
  };

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi NCR', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-[#C8B48A] relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#254A2A] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#1D3B20]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#A94B2B]">
                Annmritam Checkout
              </span>
              <span className="text-[11px] text-[#E8D6B8] bg-[#1D3B20] px-2 py-0.5 rounded font-medium">
                Desi Super Foods
              </span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              Original and Earthly Foods · 256-Bit SSL Encrypted Order
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 flex-1">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer & Shipping Details (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* 1. Contact Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#254A2A] text-[#E8D6B8] text-[10px] flex items-center justify-center">1</span>
                  <span>Contact Information</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[#5A7260] mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A7260] mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A7260] mb-1 font-medium">Mobile Number (India) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-3 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#254A2A] text-[#E8D6B8] text-[10px] flex items-center justify-center">2</span>
                  <span>Delivery Address</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#5A7260] mb-1 font-medium">House / Flat / Street Address *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      placeholder="e.g. Flat 402, Lotus Apartments, MG Road"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A7260] mb-1 font-medium">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Near City Park / Metro Station"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[#5A7260] mb-1 font-medium">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. New Delhi"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A7260] mb-1 font-medium">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-2 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A] bg-white cursor-pointer"
                      >
                        {indianStates.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#5A7260] mb-1 font-medium">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        placeholder="110001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#C8B48A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#254A2A] text-[#E8D6B8] text-[10px] flex items-center justify-center">3</span>
                  <span>Shipping Preference</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      formData.deliveryMethod === 'standard'
                        ? 'border-[#254A2A] bg-[#F1E2C5]'
                        : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={handleInputChange}
                        className="text-[#254A2A]"
                      />
                      <div>
                        <span className="font-bold text-[#254A2A] block">Standard Delivery</span>
                        <span className="text-[11px] text-[#5A7260]">3–5 business days</span>
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-800">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-[#254A2A] bg-[#F1E2C5]'
                        : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={handleInputChange}
                        className="text-[#254A2A]"
                      />
                      <div>
                        <span className="font-bold text-[#254A2A] block">Express Priority Air</span>
                        <span className="text-[11px] text-[#5A7260]">1–2 business days</span>
                      </div>
                    </div>
                    <span className="font-semibold text-[#254A2A]">+₹99</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#254A2A] text-[#E8D6B8] text-[10px] flex items-center justify-center">4</span>
                  <span>Payment Method</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi' ? 'border-[#254A2A] bg-[#F1E2C5]' : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                    />
                    <Smartphone className="w-4 h-4 text-[#A94B2B]" />
                    <span className="font-semibold text-[#254A2A]">Instant UPI (GPay/PhonePe)</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card' ? 'border-[#254A2A] bg-[#F1E2C5]' : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <CreditCard className="w-4 h-4 text-[#A94B2B]" />
                    <span className="font-semibold text-[#254A2A]">Credit / Debit Card</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'netbanking' ? 'border-[#254A2A] bg-[#F1E2C5]' : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                    />
                    <Building className="w-4 h-4 text-[#A94B2B]" />
                    <span className="font-semibold text-[#254A2A]">NetBanking (All Banks)</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-[#254A2A] bg-[#F1E2C5]' : 'border-[#C8B48A] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <Banknote className="w-4 h-4 text-[#A94B2B]" />
                    <span className="font-semibold text-[#254A2A]">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'upi' && (
                  <div className="mt-2.5 p-3 bg-[#F1E2C5] rounded-lg border border-[#C8B48A] text-xs">
                    <label className="block text-[#5A7260] mb-1 font-medium">Enter your Virtual Payment Address (UPI ID)</label>
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank or yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#C8B48A] rounded focus:outline-none focus:ring-1 focus:ring-[#254A2A]"
                    />
                    <span className="text-[10px] text-[#5A7260] mt-1 block">A payment request link will be pinged directly to your UPI app.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-[#F1E2C5] p-5 rounded-xl border border-[#C8B48A] flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-serif text-base font-bold text-[#254A2A] mb-3">
                  Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
                </h4>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto divide-y divide-[#C8B48A] text-xs pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-medium text-[#254A2A] truncate block">
                          {item.product.name}
                        </span>
                        <span className="text-[11px] text-[#5A7260]">
                          {item.packSize.label} &times; {item.quantity}
                        </span>
                      </div>
                      <span className="font-serif font-bold text-[#254A2A] shrink-0">
                        ₹{item.packSize.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="border-t border-[#C8B48A] pt-3 mt-3 space-y-1.5 text-xs text-[#1E3320]">
                  <div className="flex justify-between">
                    <span className="text-[#5A7260]">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#5A7260]">Shipping</span>
                    <span>
                      {shippingFee === 0 && formData.deliveryMethod === 'standard' ? (
                        <strong className="text-emerald-800">FREE</strong>
                      ) : (
                        `₹${shippingFee + (formData.deliveryMethod === 'express' ? 99 : 0)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#C8B48A] text-[#254A2A]">
                    <span>Total Payable</span>
                    <span className="font-serif text-lg">
                      ₹{finalTotal + (formData.deliveryMethod === 'express' ? 99 : 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#A94B2B] hover:bg-[#A94B2B] text-[#254A2A] font-bold text-sm py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#254A2A] border-t-transparent rounded-full animate-spin" />
                      <span>Verifying &amp; Placing Order...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm &amp; Place Order (₹{finalTotal + (formData.deliveryMethod === 'express' ? 99 : 0)})</span>
                    </>
                  )}
                </button>

                {/* Technical Transparency Note */}
                <div className="p-3 bg-white rounded-lg border border-[#C8B48A] text-[11px] text-[#5A7260] space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-[#254A2A]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Production Readiness Notice</span>
                  </div>
                  <p>
                    This is a fully-wired interactive client checkout simulation. In production, this securely posts to your Node/Express backend with Razorpay or Cashfree webhook verification before final order persistence.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

