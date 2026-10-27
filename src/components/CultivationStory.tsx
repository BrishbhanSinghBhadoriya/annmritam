import React from 'react';
import { Compass, Sparkles, Sun, Flame, PackageCheck } from 'lucide-react';

export const CultivationStory: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Wetland Lotus Ecosystem',
      subtitle: 'Ponds of Mithila, Bihar',
      description: 'Makhana comes from Euryale Ferox, a majestic aquatic plant with thorny purple flowers that flourishes in the calm freshwater ponds of Mithila.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Generational Underwater Dive',
      subtitle: 'Manual seed collection',
      description: 'At dawn, skilled harvesters wade into muddy ponds, scooping fallen seeds from the bed using traditional conical bamboo baskets called Gaanj.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Solar Drying & Gradation',
      subtitle: 'Sun-cured over clean mats',
      description: 'The black seeds are thoroughly washed, graded across iron sieves, and dried under the bright north Indian sun to balance inner moisture.',
      icon: Sun,
    },
    {
      step: '04',
      title: 'Clay Pot Roasting & Hand-Popping',
      subtitle: 'The craft of Phodni',
      description: 'Seeds are heated in clay pots over wood fire and struck with wooden mallets on wooden blocks, instantly bursting into pristine white puffed nuts.',
      icon: Flame,
    },
    {
      step: '05',
      title: 'Original & Earthly Selection',
      subtitle: 'Nitrogen-sealed freshness',
      description: 'We hand-pick the jumbo 6-suta makhana, eliminating unpopped kernels and sealing them within hours to retain natural crunch without preservatives.',
      icon: PackageCheck,
    },
  ];

  return (
    <section id="sourcing-story" className="py-16 md:py-24 bg-[#F8F5EC] border-b border-[#DDE4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-[#B88A25] mb-2">
            The Sacred Craft of Indian Superfoods
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2E22] tracking-tight">
            Makhana Cultivation &amp; Sourcing Story
          </h2>
          <p className="text-sm sm:text-base text-[#6B756D] mt-3 leading-relaxed">
            From the tranquil lotus wetlands of Mithila to your wholesome pantry table. Discover how Original &amp; Earthly preserves this 2,000-year-old agricultural heritage.
          </p>
        </div>

        {/* Hero Sourcing Visual */}
        <div className="rounded-2xl overflow-hidden border border-[#DDE4DA] shadow-sm mb-16 relative bg-[#0B2E22] text-white">
          <div className="aspect-[16/9] md:aspect-[21/9] relative">
            <img
              src="/src/assets/images/story_makhana_wetlands_1793080252804.jpg"
              alt="Mithila lotus wetlands makhana harvesting at sunrise"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E22] via-[#0B2E22]/30 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] bg-[#123B2A] px-3 py-1 rounded border border-[#D4AF37]/30">
                Geographical Indication (GI) Protected
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white mt-2">
                The Heritage Wetlands of Mithila
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1">
                Over 85% of the world&apos;s finest makhana originates in this unique floodplain agro-ecosystem in northern Bihar.
              </p>
            </div>
            <div className="bg-[#123B2A]/90 backdrop-blur-md px-4 py-3 rounded-lg border border-[#D4AF37]/30 text-right shrink-0 hidden sm:block">
              <span className="text-xs text-[#E6C568] font-bold block">100% Direct Harvester Sourcing</span>
              <span className="text-[11px] text-white/70">Fair Trade &amp; Sustainable Ponds</span>
            </div>
          </div>
        </div>

        {/* Sourcing Timeline / Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-[#DDE4DA] hover:border-[#B88A25] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F8F5EC] flex items-center justify-center text-[#0B2E22]">
                      <Icon className="w-4 h-4 text-[#B88A25]" />
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#0B2E22] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#B88A25] uppercase tracking-wider mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#6B756D] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
