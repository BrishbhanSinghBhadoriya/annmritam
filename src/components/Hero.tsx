import React from 'react';
import { ArrowRight, Leaf, Award, CheckCircle, Shield } from 'lucide-react';

interface HeroProps {
  onShopMakhana: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopMakhana, onExploreStory }) => {
  return (
    <section className="relative bg-[#0B2E22] text-white overflow-hidden border-b border-[#123B2A]">
      {/* Decorative subtle ambient backdrop pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Supporting Brand Presentation */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123B2A] border border-[#D4AF37]/30 text-xs text-[#E6C568]">
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#D4AF37]">Original &amp; Earthly</span>
              <span className="text-white/40">·</span>
              <span>Presenting Annmritam</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Pure Nutrition. <br />
              <span className="text-[#D4AF37] italic font-normal">Rooted in Tradition.</span>
            </h1>

            {/* Supporting Heading */}
            <h2 className="text-xl sm:text-2xl font-serif text-[#E6C568] tracking-wide">
              Annmritam Makhana — Desi Super Foods
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed font-sans font-light">
              Discover the goodness of Indian superfoods with Annmritam, presented by Original &amp; Earthly. Hand-harvested from the GI-tagged freshwater wetlands of Mithila, our slow-popped fox nuts offer clean, uncompromised vitality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopMakhana}
                className="bg-[#B88A25] hover:bg-[#D4AF37] text-[#0B2E22] font-bold text-sm sm:text-base px-7 py-3.5 rounded-md transition-all shadow-lg hover:shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Shop Annmritam Makhana</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreStory}
                className="border border-[#D4AF37]/60 hover:border-[#D4AF37] text-white hover:text-[#E6C568] font-medium text-sm sm:text-base px-6 py-3.5 rounded-md transition-colors bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer"
              >
                Explore Our Story
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% Sun-Dried &amp; Popped</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero Chemical Bleaching</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Mithila GI-Tag Origin</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>High Protein &amp; Calcium</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Product Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#123B2A] group">
              
              {/* Image container with aspect ratio */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-[#123B2A]">
                <img
                  src="/images/hero_annmritam_makhana_1793080249059.jpg"
                  alt="Annmritam Premium Jumbo Makhana in artisanal handcrafted bowl"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E22] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Quality Callout Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B2E22]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Hand-Selected 6-Suta Grade
                  </p>
                  <p className="text-xs text-white/90 font-medium">
                    GI Tagged Mithila Makhana · 9.7g Protein
                  </p>
                </div>
                <button
                  onClick={onShopMakhana}
                  className="text-xs font-bold text-[#E6C568] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  View Details &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
