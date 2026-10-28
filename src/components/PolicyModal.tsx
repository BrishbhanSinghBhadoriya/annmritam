import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, FileText, Lock } from 'lucide-react';

export type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Prompt, Reliable Pan-India Fulfillment',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#1E3320] leading-relaxed">
          <p>
            At <strong>Original and Earthly</strong>, we partner with premier express logistics carriers (BlueDart, Delhivery, ExpressBees) to deliver Annmritam superfoods fresh to your doorstep across 27,000+ Indian postal codes.
          </p>
          <div className="bg-[#F1E2C5] p-4 rounded-xl border border-[#C8B48A] space-y-2">
            <h4 className="font-bold text-[#254A2A]">Shipping Rates &amp; Delivery Timelines:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#5A7260]">
              <li><strong>Free Standard Delivery:</strong> On all orders totaling ₹499 or more.</li>
              <li><strong>Standard Delivery Fee:</strong> Flat ₹60 for orders below ₹499.</li>
              <li><strong>Express Air Priority:</strong> Optional flat ₹99 for guaranteed 2-day delivery in metro areas.</li>
              <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 business days.</li>
              <li><strong>Tier 2 &amp; Regional Hubs:</strong> 3 to 5 business days.</li>
            </ul>
          </div>
          <p>
            You will receive instant SMS and email notifications with your tracking AWB number upon parcel dispatch from our climate-controlled warehouse.
          </p>
        </div>
      ),
    },
    returns: {
      title: 'Returns & Replacement Policy',
      subtitle: '100% Purity Guarantee by Original & Earthly',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#1E3320] leading-relaxed">
          <p>
            Because Annmritam superfoods are edible food products with strict safety and hygiene standards, we uphold a dedicated <strong>7-Day Replacement Guarantee</strong>.
          </p>
          <div className="bg-[#F1E2C5] p-4 rounded-xl border border-[#C8B48A] space-y-2">
            <h4 className="font-bold text-[#254A2A]">Eligible Circumstances for Replacement:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#5A7260]">
              <li>Outer packaging seal was punctured, broken, or compromised in transit.</li>
              <li>Product received has passed its indicated best-before date.</li>
              <li>Incorrect item, pack size, or flavor was delivered.</li>
            </ul>
          </div>
          <p>
            To initiate a replacement, simply email <strong className="text-[#254A2A]">care@originalearthly.com</strong> or WhatsApp our support desk at +91 98765 43210 with your Order ID and photo of the issue within 7 days of delivery.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy & Data Protection Policy',
      subtitle: 'Committed to Safeguarding Your Personal Information',
      icon: Lock,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#1E3320] leading-relaxed">
          <p>
            <strong>Original and Earthly Foods Pvt. Ltd.</strong> respects your personal privacy. We collect strictly the essential data required to process orders, verify deliveries, and share requested promotional discounts.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#5A7260]">
            <li>We do NOT sell, rent, or trade customer contact information to third-party marketing brokers.</li>
            <li>All checkout transmissions utilize industry-standard 256-bit SSL encryption.</li>
            <li>Payment card credentials and UPI tokens are handled through PCI-DSS Level 1 compliant gateway partners and never stored on our servers.</li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions of Service',
      subtitle: 'Original & Earthly Foods Pvt. Ltd.',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#1E3320] leading-relaxed">
          <p>
            By accessing and shopping on the Annmritam web platform operated by Original and Earthly Foods Pvt. Ltd., you agree to comply with standard e-commerce purchase and consumer terms under Indian law.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#5A7260]">
            <li>All product pricing is in Indian Rupees (INR) and includes applicable GST taxes.</li>
            <li>We reserve the right to cancel orders with full refund in case of unforeseen harvest shortages or address discrepancies.</li>
            <li>Annmritam and Original and Earthly are proprietary trademarks protected under Indian intellectual property statutes.</li>
          </ul>
        </div>
      ),
    },
  };

  const selected = contentMap[policyType];
  const Icon = selected.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#C8B48A] p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1E2C5] hover:bg-slate-200 text-[#1E3320] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close policy"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#254A2A] text-[#A94B2B] flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#254A2A]">
              {selected.title}
            </h3>
            <p className="text-xs text-[#A94B2B] font-medium">{selected.subtitle}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#C8B48A]">
          {selected.body}
        </div>

        <div className="pt-6 border-t border-[#C8B48A] mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#254A2A] text-[#A94B2B] px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#1D3B20] transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};

