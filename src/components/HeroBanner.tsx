import React from 'react';
import { BatCategory } from '../types/bat';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

interface HeroBannerProps {
  onSelectCategory?: (model: BatCategory) => void;
  activeModel?: BatCategory;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden border-b border-neutral-800">
      {/* Background Image: Taller height, bright visibility */}
      <div className="relative w-full min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center">
        <img
          src="/bats/grey edition/IMG-20261014-WA0006.jpg"
          alt="Cricket Adda Handcrafted Bats"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_35%] opacity-90 transition-opacity duration-300"
        />

        {/* Soft, reduced overlay: subtle gradient on left for text legibility, right side stays clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/15 pointer-events-none" />

        {/* Minimalist Hero Content: Clean, concise, punchy */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex flex-col justify-center">
          <div className="max-w-xl space-y-4">
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f15b28]" />
              <span>Workshop Handcrafted</span>
            </div>

            {/* Stark, Bold Minimalist Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none font-display drop-shadow-sm">
              SCOOP TENNIS BATS
              <span className="block text-[#f15b28] text-2xl sm:text-4xl lg:text-5xl font-extrabold mt-1.5">
                LAGA TOH SIX.
              </span>
            </h1>

            {/* Minimal Subtitle: Just one clean line */}
            <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-md drop-shadow-xs">
              Precision aerodynamic airflow hollows · Digital scale verified (957g–1065g)
            </p>

            {/* Clean Action Triggers */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Explore Bats</span>
                <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
              </button>

              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20inquire%20about%20your%20bats.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                <span>WhatsApp Live Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
