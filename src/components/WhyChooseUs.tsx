import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'GI-Tagged Mithila Origin',
      description: 'Grown naturally in deep perennial wetland ponds of northern Bihar, known globally for providing superior mineral density and the authentic 6-suta makhana grade.',
    },
    {
      icon: Flame,
      title: 'Zero Chemical Bleaching',
      description: 'Unlike mass-market white fox nuts bleached with sulfur, Annmritam makhana is slow-popped in earthen clay stoves, preserving natural ivory cream color and nutrients.',
    },
    {
      icon: Sparkles,
      title: 'High Protein & Bio-Calcium',
      description: 'Packed with 9.7g of plant protein per 100g and essential calcium and magnesium for strong bones, healthy teeth, and steady cardiac rhythm.',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical Harvester Welfare',
      description: 'Original & Earthly works directly with traditional Mallah community harvesters in Bihar, eliminating middlemen and guaranteeing fair wages for their generational craft.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0B2E22] text-white border-b border-[#123B2A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] mb-2">
            Purity Without Compromise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Why Choose Annmritam Superfoods
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed font-light">
            Presented by Original &amp; Earthly, we bridge age-old Indian agricultural wisdom with modern quality testing so you can nourish your family with absolute peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#123B2A] rounded-xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#0B2E22] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#E6C568] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-14 bg-[#123B2A]/70 rounded-xl p-6 border border-white/10 text-center max-w-2xl mx-auto">
          <p className="font-serif text-base sm:text-lg italic text-[#E6C568]">
            &ldquo;Food that is pure, traditional, and cultivated in harmony with the earth is the truest medicine for body and mind.&rdquo;
          </p>
          <p className="text-xs text-white/60 uppercase tracking-widest mt-2">
            The Philosophy of Original &amp; Earthly
          </p>
        </div>

      </div>
    </section>
  );
};
