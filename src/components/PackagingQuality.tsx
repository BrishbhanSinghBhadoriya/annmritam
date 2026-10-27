import React from 'react';
import { Package, ShieldAlert, Sparkles, Wind, Layers, RefreshCw } from 'lucide-react';

export const PackagingQuality: React.FC = () => {
  const features = [
    {
      icon: Wind,
      title: 'Nitrogen-Flushed Crispness',
      desc: 'Ambient oxygen causes fox nuts to turn chewy and stale. We displace oxygen with food-grade pure nitrogen for guaranteed factory-fresh crunch upon unsealing.',
    },
    {
      icon: Layers,
      title: '4-Ply Foil Moisture Barrier',
      desc: 'Our matte pouches feature high-density metallic barrier laminates that repel ambient humidity, UV light, and heat during shipping across India.',
    },
    {
      icon: RefreshCw,
      title: 'Heavy-Duty Resealable Zipper',
      desc: 'Enjoy a handful today and lock the remaining superfoods securely. No need to transfer into kitchen glass jars immediately.',
    },
    {
      icon: ShieldAlert,
      title: 'NABL Certified Lab Testing',
      desc: 'Every production lot is tested by accredited laboratories for heavy metals, aflatoxins, and microbial safety prior to release.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#DDE4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0B2E22] rounded-3xl p-8 sm:p-12 text-white border border-[#123B2A] relative overflow-hidden">
          {/* Subtle gold accent ring */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#D4AF37]/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#D4AF37] bg-[#123B2A] px-3 py-1 rounded">
                Precision Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Product Quality &amp; Packaging Science
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                Fox nuts and natural seeds are vulnerable to moisture and rancidity. At Original &amp; Earthly, we engineer our packaging to match our rigorous sourcing standards.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#E6C568]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Food-Safe Inks</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#D4AF37]" />
                  <span>Recyclable Materials</span>
                </div>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#123B2A] rounded-xl p-5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#0B2E22] flex items-center justify-center text-[#D4AF37] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#E6C568] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
