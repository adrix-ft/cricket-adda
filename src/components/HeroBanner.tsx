import React from 'react';
import { BatCategory } from '../types/bat';
import { ShieldCheck, Scale, Award, Truck } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

interface HeroBannerProps {
  onSelectCategory: (model: BatCategory) => void;
  activeModel: BatCategory;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory, activeModel }) => {
  return (
    <div className="relative w-full bg-[#0a1017] overflow-hidden border-b border-neutral-800">
      {/* Generated Cinematic Hero Banner */}
      <div className="relative w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] flex items-center">
        <img
          src="/images/hero_banner.jpg"
          alt="7T7T Tennis Cricket Bats"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Ambient Dark Gradient for contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 pointer-events-none" />

        {/* Content */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <div className="max-w-2xl space-y-4">
            {/* Seller Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f15b28]/90 text-white rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Direct Workshop Handcrafted Bats • No Middlemen</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              7T7T SCOOP TENNIS BATS
              <span className="block text-[#f15b28]">LAGA TOH SIX!</span>
            </h1>

            {/* Sub-text tailored to tennis cricket */}
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed max-w-xl">
              Precision scooped tennis cricket bats engineered for tournament power-hitting and lightning swing speed. Tested with hard tennis balls, verified on digital scales from <strong>957g</strong> to <strong>1065g</strong>.
            </p>

            {/* Quick Model Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => onSelectCategory('All')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeModel === 'All'
                    ? 'bg-[#f15b28] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/20'
                }`}
              >
                All 4 Models
              </button>
              <button
                onClick={() => onSelectCategory('7T7T Gold Edition')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeModel === '7T7T Gold Edition'
                    ? 'bg-[#f15b28] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/20'
                }`}
              >
                Gold Edition
              </button>
              <button
                onClick={() => onSelectCategory('Black Monster')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeModel === 'Black Monster'
                    ? 'bg-[#f15b28] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/20'
                }`}
              >
                Black Monster (Carbon Face)
              </button>
              <button
                onClick={() => onSelectCategory('Grey Edition')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeModel === 'Grey Edition'
                    ? 'bg-[#f15b28] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/20'
                }`}
              >
                Grey Edition (957g Scale)
              </button>
              <button
                onClick={() => onSelectCategory('One Side Hero')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeModel === 'One Side Hero'
                    ? 'bg-[#f15b28] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/80 text-white/90 border border-white/20'
                }`}
              >
                One Side Hero (1-Side Scoop)
              </button>
            </div>

            {/* Local seller trust highlights bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-[11px] text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#f15b28] shrink-0" />
                <span>Exact Scale Weight Match</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Video Call Inspection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free 7T7T Padded Bat Bag</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>COD & Fast Courier Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
