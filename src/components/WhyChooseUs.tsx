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
    <section className="py-16 md:py-24 bg-[#254A2A] text-white mithila-border mithila-border-bottom relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-[#A94B2B] mb-2">
            Purity Without Compromise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Why Choose Annmritam Superfoods
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 leading-relaxed font-light">
            Presented by Original and Earthly, we bridge age-old Indian agricultural wisdom with modern quality testing so you can nourish your family with absolute peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#1D3B20] rounded-xl p-6 border border-[#A94B2B]/20 hover:border-[#A94B2B]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#254A2A] border border-[#A94B2B]/30 flex items-center justify-center text-[#A94B2B] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#E8D6B8] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#A94B2B]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#A94B2B]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-14 bg-[#1D3B20]/70 rounded-xl p-6 border border-white/10 text-center max-w-2xl mx-auto">
          <p className="font-serif text-base sm:text-lg italic text-[#E8D6B8]">
            &ldquo;Food that is pure, traditional, and cultivated in harmony with the earth is the truest medicine for body and mind.&rdquo;
          </p>
          <p className="text-xs text-white/60 uppercase tracking-widest mt-2">
            The Philosophy of Original and Earthly
          </p>
        </div>

      </div>
    </section>
  );
};

