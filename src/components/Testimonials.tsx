import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dr. Shalini Mukhopadhyay',
      role: 'Integrative Nutritionist, Bengaluru',
      content: 'I routinely advise Annmritam Makhana to my clients managing insulin resistance. Most supermarket brands are treated with chemicals or filled with unpopped hard seeds. Annmritam is genuinely jumbo 6-suta grade, fresh, and cleanly roasted.',
      rating: 5,
      product: 'Annmritam Premium Jumbo Makhana',
      verified: true,
    },
    {
      name: 'Vikram & Sunita Singhal',
      role: 'Parents & Conscious Eaters, New Delhi',
      content: 'Replacing fried packaged chips with Annmritam Ghee-Roasted Himalayan Salt Makhana was the single best snack switch for our teenage kids. They finish the twin pack in two days! The crunch is remarkably crisp.',
      rating: 5,
      product: 'Slow-Roasted Pink Salt Makhana',
      verified: true,
    },
    {
      name: 'Acharya Raghavendra Sharma',
      role: 'Ayurvedic Wellness Practitioner, Varanasi',
      content: 'During Navratri and Ekadashi vrat, purity of food is of prime importance. Annmritam provides true Sattvic purity from the Mithila wetlands, completely unadulterated and processed with traditional dignity by Original & Earthly.',
      rating: 5,
      product: 'Desi Superfood Wellness Hamper',
      verified: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white mithila-border mithila-border-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase font-bold tracking-widest text-[#A94B2B] mb-2">
            Trusted Across India
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254A2A]">
            Loved by Conscious Indian Households
          </h2>
          <p className="text-sm text-[#5A7260] mt-2">
            Authentic experiences from nutritionists, ayurvedic practitioners, and families choosing wholesome nourishment.
          </p>
        </div>

        {/* Reviews 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F1E2C5] rounded-2xl p-6 sm:p-7 border border-[#C8B48A] flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#A94B2B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#A94B2B]/25" />
                </div>

                <p className="text-xs sm:text-sm text-[#1E3320] leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#C8B48A]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#254A2A]">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-[#5A7260]">{rev.role}</p>
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded font-medium">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[10px] text-[#A94B2B] font-semibold">
                  Verified Buyer · {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

