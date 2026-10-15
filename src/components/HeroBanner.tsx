import React from 'react';
import { BatCategory } from '../types/bat';
import { Scale, Video, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory: (model: BatCategory) => void;
  activeModel: BatCategory;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory, activeModel }) => {
  const modelChips: { label: string; value: BatCategory; icon: string }[] = [
    { label: 'All', value: 'All', icon: '✦' },
    { label: 'Gold', value: '7T7T Gold Edition', icon: '👑' },
    { label: 'Black Monster', value: 'Black Monster', icon: '🖤' },
    { label: 'Grey (957g)', value: 'Grey Edition', icon: '⚡' },
    { label: '1-Side Hero', value: 'One Side Hero', icon: '🎯' },
  ];

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden border-b border-neutral-900">
      {/* Background Image with Clean Minimalist Overlay */}
      <div className="relative w-full min-h-[260px] sm:min-h-[320px] flex items-center">
        <img
          src="/bats/grey edition/IMG-20261014-WA0006.jpg"
          alt="Cricket Adda Bats"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40 pointer-events-none" />

        {/* Minimalist Editorial Content */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
          <div className="max-w-xl space-y-3">
            {/* Minimal Sub-tag */}
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f15b28]" />
              <span>Cricket Adda Handcrafted Workshop</span>
            </div>

            {/* Bold Minimal Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-none">
              SCOOP TENNIS BATS
              <span className="block text-[#f15b28] text-xl sm:text-3xl lg:text-4xl font-extrabold mt-1">
                LAGA TOH SIX.
              </span>
            </h1>

            {/* Ultra-concise line */}
            <p className="text-xs text-neutral-400 font-medium max-w-md">
              Aerodynamic hollows · Carbon face shield · Weighed from 957g to 1065g on digital scales.
            </p>

            {/* Clean Segmented Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {modelChips.map((chip) => {
                const isActive = activeModel === chip.value;
                return (
                  <button
                    key={chip.value}
                    onClick={() => onSelectCategory(chip.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#f15b28] text-white shadow-sm'
                        : 'bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 backdrop-blur-xs'
                    }`}
                  >
                    <span className="text-[10px]">{chip.icon}</span>
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Micro Indicators */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1 text-neutral-300">
                <Scale className="w-3 h-3 text-[#f15b28]" />
                <span>957g–1065g</span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <Video className="w-3 h-3 text-emerald-400" />
                <span>Video Inspection</span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Free Padded Bag</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
