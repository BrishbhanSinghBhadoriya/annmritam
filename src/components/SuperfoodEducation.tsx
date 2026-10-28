import React from 'react';
import { HeartPulse, Utensils, Moon, Check, X } from 'lucide-react';

export const SuperfoodEducation: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F1E2C5] border-b border-[#C8B48A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-[#A94B2B] mb-2">
            Ancient Wisdom Meets Modern Science
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#254A2A] tracking-tight">
            The Desi Superfood Guide
          </h2>
          <p className="text-sm sm:text-base text-[#5A7260] mt-3 leading-relaxed">
            Makhana (Gorgon Nut) has been revered in classical Charaka Samhita and Sushruta Samhita for centuries. Here is what science and tradition reveal about this royal snack.
          </p>
        </div>

        {/* Nutritional Comparison Table */}
        <div className="bg-white rounded-2xl border border-[#C8B48A] p-6 sm:p-8 shadow-sm mb-16">
          <div className="mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#254A2A]">
              Nutritional Showdown: Per 100g Serving
            </h3>
            <p className="text-xs text-[#5A7260] mt-1">
              Compare Annmritam raw makhana against conventional tea-time snacks.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#C8B48A] text-[#5A7260] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Nutritional Metric</th>
                  <th className="py-3 px-4 font-bold text-[#254A2A] bg-[#F1E2C5] rounded-t-lg">
                    Annmritam Makhana
                  </th>
                  <th className="py-3 px-4 font-semibold">Cinema Popcorn</th>
                  <th className="py-3 px-4 font-semibold">Fried Potato Chips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8B48A] text-[#1E3320]">
                <tr>
                  <td className="py-3.5 px-4 font-medium">Protein Content</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5]">9.7 g (High)</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">3.1 g</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">2.2 g</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Total Fat</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5]">0.1 g (Virtually Zero)</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">14.5 g</td>
                  <td className="py-3.5 px-4 text-rose-700">35.0 g</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Dietary Fiber</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5]">14.5 g</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">5.0 g</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">2.5 g</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Glycemic Index (GI)</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5]">Low GI (&lt;55)</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">Moderate GI (65)</td>
                  <td className="py-3.5 px-4 text-rose-700">High GI (75+)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Trans Fat &amp; Cholesterol</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5]">0 mg (Zero)</td>
                  <td className="py-3.5 px-4 text-[#5A7260]">Contains Trans Fat</td>
                  <td className="py-3.5 px-4 text-rose-700">High Saturated Fat</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Vrat / Fasting Compliant</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 bg-[#F1E2C5] rounded-b-lg flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>100% Sattvic</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5A7260]"><X className="w-4 h-4 text-rose-500 inline" /> No</td>
                  <td className="py-3.5 px-4 text-[#5A7260]"><X className="w-4 h-4 text-rose-500 inline" /> No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Pillars of Desi Superfood Wellness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-xl p-6 border border-[#C8B48A] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#254A2A] text-[#A94B2B] flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#254A2A]">
              Heart &amp; Blood Sugar Support
            </h4>
            <p className="text-xs sm:text-sm text-[#5A7260] leading-relaxed">
              With low sodium, high potassium, and high magnesium, makhana helps regulate vascular tone and arterial elasticity. Its low glycemic index provides sustained energy without insulin spikes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#C8B48A] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#254A2A] text-[#A94B2B] flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#254A2A]">
              Tridoshic &amp; Sattvic Purity
            </h4>
            <p className="text-xs sm:text-sm text-[#5A7260] leading-relaxed">
              In Ayurveda, makhana is uniquely Tridoshic: soothing fiery Pitta, grounding anxious Vata, and light enough to not aggravate sluggish Kapha. It is the premier food for sacred Vrat and spiritual fasts.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#C8B48A] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#254A2A] text-[#A94B2B] flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#254A2A]">
              Versatile Indian Kitchen Craft
            </h4>
            <p className="text-xs sm:text-sm text-[#5A7260] leading-relaxed">
              Roast with a teaspoon of A2 cow ghee and sendha namak in 3 minutes; simmer with crushed cardamom and saffron for royal Makhana Kheer; or grind into gluten-free baking flours.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

