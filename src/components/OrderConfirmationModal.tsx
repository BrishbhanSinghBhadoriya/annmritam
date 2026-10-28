import React from 'react';
import { CheckCircle2, Package, Truck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-[#C8B48A] p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="text-center pb-6 border-b border-[#C8B48A]">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#A94B2B]">
            Order Placed Successfully
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#254A2A] mt-1">
            Thank you, {order.customer.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-[#5A7260] mt-1">
            Your authentic Annmritam superfoods order has been confirmed by Original and Earthly.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 bg-[#F1E2C5] border border-[#C8B48A] px-4 py-2 rounded-lg text-xs">
            <span>Order ID: <strong className="font-mono text-[#254A2A]">{order.orderId}</strong></span>
            <span className="text-[#5A7260]">·</span>
            <span>Date: <strong>{order.orderDate}</strong></span>
            <span className="text-[#5A7260]">·</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              {order.status}
            </span>
          </div>
        </div>

        {/* Estimated Delivery & Shipping Step */}
        <div className="py-6 border-b border-[#C8B48A] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#F1E2C5] p-3.5 rounded-xl border border-[#C8B48A] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#254A2A]">
              <Truck className="w-4 h-4 text-[#A94B2B]" />
              <span>Estimated Delivery</span>
            </div>
            <p className="text-sm font-serif font-bold text-[#254A2A]">
              By {order.estimatedDelivery}
            </p>
            <p className="text-[11px] text-[#5A7260]">
              Shipping via BlueDart / Delhivery Express with live SMS tracking to {order.customer.phone}.
            </p>
          </div>

          <div className="bg-[#F1E2C5] p-3.5 rounded-xl border border-[#C8B48A] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#254A2A]">
              <Package className="w-4 h-4 text-[#A94B2B]" />
              <span>Delivery Address</span>
            </div>
            <p className="font-medium text-[#1E3320]">
              {order.customer.addressLine1}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </p>
            <p className="text-[11px] text-[#5A7260]">
              Payment: <strong className="uppercase">{order.customer.paymentMethod}</strong>
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-5 border-b border-[#C8B48A]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#254A2A] mb-3">
            Itemized Order Receipt
          </h4>
          <div className="space-y-2 text-xs divide-y divide-[#C8B48A]">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#254A2A] block">
                    {item.product.name}
                  </span>
                  <span className="text-[11px] text-[#5A7260]">
                    Pack: {item.packSize.label} &times; Qty {item.quantity}
                  </span>
                </div>
                <span className="font-serif font-bold text-[#254A2A]">
                  ₹{item.packSize.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 mt-3 border-t border-[#C8B48A] space-y-1.5 text-xs text-[#1E3320]">
            <div className="flex justify-between">
              <span className="text-[#5A7260]">Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Coupon Savings ({order.appliedCoupon})</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#5A7260]">Shipping &amp; Handling</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#C8B48A] text-[#254A2A]">
              <span>Total Paid</span>
              <span className="font-serif text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#C8B48A] hover:bg-[#F1E2C5] text-xs font-semibold text-[#1E3320] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onContinueShopping}
            className="w-full sm:w-auto bg-[#254A2A] hover:bg-[#1D3B20] text-[#A94B2B] text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

