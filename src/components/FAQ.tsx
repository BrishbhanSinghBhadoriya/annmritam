import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the connection between Original & Earthly and Annmritam?',
      a: 'Original & Earthly is our parent company committed to authentic, sustainable, and chemical-free food systems. Annmritam is our dedicated consumer product brand specializing in premium Indian superfoods, led by our GI-tagged Mithila Makhana and wholesome seeds.',
    },
    {
      q: 'What does "GI-Tagged Mithila Makhana" mean?',
      a: 'A Geographical Indication (GI) tag is an official government certification recognizing that Mithila Makhana possesses distinctive nutritional qualities, puffing characteristics, and mineral density derived specifically from the wetland terroir of northern Bihar.',
    },
    {
      q: 'Is Annmritam Makhana chemically bleached to appear white?',
      a: 'Never. Conventional industrial processors bleach fox nuts with sulfur fumes to conceal black spots or lower-grade crops. Annmritam makhana is 100% naturally processed through traditional clay-pot roasting, preserving its natural ivory tone and fragile micronutrients.',
    },
    {
      q: 'Can Makhana and seeds be consumed during Navratri or Vrat fasts?',
      a: 'Yes, absolutely. Makhana, pumpkin seeds, and chia seeds are 100% Phalahari (Sattvic) and are traditional staples during Navratri, Shivratri, Janmashtami, and Ekadashi fasting rituals in Sanatan culture.',
    },
    {
      q: 'What is the shelf life and best storage method?',
      a: 'Our raw makhana has a sealed shelf life of 9 months, and roasted varieties have 6 months. We pack them with pure nitrogen in 4-ply moisture-lock pouches. After opening, reseal the pouch zipper firmly or store in a dry airtight glass container.',
    },
    {
      q: 'What are your delivery timelines and free shipping limits?',
      a: 'We provide Free Standard Delivery on all orders above ₹499 across 27,000+ Indian pincodes. Metro orders typically arrive in 2–3 business days, and other regions in 3–5 business days.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F1E2C5] border-b border-[#C8B48A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase font-bold tracking-widest text-[#A94B2B] mb-2">
            Clear Answers
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#254A2A]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5A7260] mt-2">
            Everything you need to know about Annmritam superfoods, storage, and orders.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#C8B48A] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:bg-[#F1E2C5]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#254A2A]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A94B2B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-[#1E3320] leading-relaxed border-t border-[#C8B48A]/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

