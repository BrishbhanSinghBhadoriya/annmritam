import React from 'react';
import { ShieldCheck, Heart, Mail, Phone, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, categoryId?: string) => void;
  onOpenPolicy: (type: 'shipping' | 'returns' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  return (
    <footer className="bg-[#0B2E22] text-white border-t border-[#123B2A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Presentation Column (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#D4AF37]">
                  Annmritam
                </span>
                <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                  Desi Super Foods
                </span>
              </div>
              <p className="text-xs text-[#E6C568] font-medium mt-0.5">
                Presented by Original &amp; Earthly
              </p>
            </div>

            <p className="text-xs text-white/75 leading-relaxed font-light">
              Original &amp; Earthly is committed to restoring pure, unadulterated traditional Indian superfoods to modern urban life. Annmritam brings you the authentic GI-tagged makhana from Mithila wetlands alongside organic nutrient-dense seeds.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>GI Mithila Origin</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>FSSAI Certified</span>
              </span>
            </div>
          </div>

          {/* Quick Links Column (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6C568] tracking-wider uppercase">
              Superfoods
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'makhana')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Jumbo Fox Nuts (Makhana)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'roasted-makhana')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Roasted Ghee Makhana
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'flax-seeds')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Organic Flax Seeds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'pumpkin-seeds')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Raw Pumpkin Pepitas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'chia-seeds')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Black Chia Seeds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog', 'combos')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Superfood Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Story (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6C568] tracking-wider uppercase">
              Original &amp; Earthly
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  About Original &amp; Earthly
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Mithila Sourcing &amp; Harvester Welfare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Returns &amp; Replacement Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6C568] tracking-wider uppercase">
              Customer Care
            </h4>
            
            <div className="space-y-2 text-xs text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Original &amp; Earthly Foods Pvt. Ltd.</strong><br />
                  Plot 42, Heritage Agri-Zone, Darbhanga &amp; New Delhi, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 98765 43210 (Mon–Sat, 9AM–6PM IST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>care@originalearthly.com</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-white/60">
              <p>FSSAI Central Lic. No: <strong>10023011000412</strong></p>
              <p>Certified 100% Non-GMO &amp; Chemical Free</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            &copy; {new Date().getFullYear()} <strong>Original &amp; Earthly Foods</strong>. All Rights Reserved. Annmritam is a registered trademark.
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/50">
            <span>Secure 256-Bit SSL Encrypted Checkout</span>
            <span>·</span>
            <span>UPI</span>
            <span>·</span>
            <span>RuPay</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
