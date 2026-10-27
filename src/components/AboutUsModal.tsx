import React from 'react';
import { X, Award, ShieldCheck, HeartHandshake, Leaf, Sparkles } from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DDE4DA] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2E22] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close about us"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[11px] uppercase tracking-widest font-bold text-[#D4AF37] bg-[#123B2A] px-3 py-1 rounded">
            Company Profile &amp; Mission
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold mt-2 text-white">
            Original &amp; Earthly
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#E6C568] mt-1">
            Presenting Annmritam — Desi Super Foods
          </p>
        </div>

        {/* Narrative Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#24352B] text-xs sm:text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0B2E22]">
              Our Heritage &amp; Purpose
            </h3>
            <p>
              <strong>Original &amp; Earthly</strong> is an Indian natural foods enterprise established with a singular conviction: that India&apos;s ancient superfoods — perfected over thousands of years by traditional cultivators — hold unmatched nutritional potential for the modern world.
            </p>
            <p>
              To bring these pristine foods directly to health-conscious consumers, Original &amp; Earthly created <strong>Annmritam</strong>, our dedicated consumer product brand embodying purity, tradition, and the spirit of <em>Desi Super Foods</em>.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#F8F5EC] p-4 rounded-xl border border-[#DDE4DA] space-y-1.5">
              <Leaf className="w-5 h-5 text-[#0B2E22]" />
              <h4 className="font-bold text-[#0B2E22] text-xs uppercase tracking-wider">
                100% Earthly Purity
              </h4>
              <p className="text-[11px] text-[#6B756D]">
                Zero sulfur bleaching, zero artificial nitrogen loss, and zero cheap fillers or refined oils.
              </p>
            </div>

            <div className="bg-[#F8F5EC] p-4 rounded-xl border border-[#DDE4DA] space-y-1.5">
              <HeartHandshake className="w-5 h-5 text-[#0B2E22]" />
              <h4 className="font-bold text-[#0B2E22] text-xs uppercase tracking-wider">
                Fair-Wage Harvesters
              </h4>
              <p className="text-[11px] text-[#6B756D]">
                Direct procurement from generational Mallah community pond harvesters across Mithila, Bihar.
              </p>
            </div>

            <div className="bg-[#F8F5EC] p-4 rounded-xl border border-[#DDE4DA] space-y-1.5">
              <Award className="w-5 h-5 text-[#0B2E22]" />
              <h4 className="font-bold text-[#0B2E22] text-xs uppercase tracking-wider">
                Certified GI Origin
              </h4>
              <p className="text-[11px] text-[#6B756D]">
                Official GI certification guaranteeing authentic regional terroir and superior mineral density.
              </p>
            </div>
          </div>

          <div className="border-t border-[#DDE4DA] pt-4 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0B2E22]">
              The Meaning of Annmritam
            </h3>
            <p>
              The word <em>Annmritam</em> stems from two timeless Sanskrit concepts: <strong>Annam</strong> (sacred grain/nourishment) and <strong>Amritam</strong> (the immortal nectar of vitality). Every handful of Annmritam Makhana represents our promise of clean nutrition rooted in tradition.
            </p>
          </div>

          {/* Company Details Strip */}
          <div className="bg-[#0B2E22] text-white p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
            <div>
              <span className="text-[#D4AF37] font-bold block">Original &amp; Earthly Foods Pvt. Ltd.</span>
              <span className="text-white/70 text-[11px]">Corporate Office: New Delhi · Agro Facility: Darbhanga, Bihar</span>
            </div>
            <span className="text-[11px] text-[#E6C568] bg-[#123B2A] px-2.5 py-1 rounded border border-[#D4AF37]/30">
              FSSAI Lic. 10023011000412
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
