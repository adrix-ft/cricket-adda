import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory?: (willow: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full bg-[#04282c] overflow-hidden border-b border-[#084c52]">
      {/* Actual Hero Banner Image from DSC Website */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
        <img
          src="/hero-banner.webp"
          alt="Cricket Bats Banner"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover object-right sm:object-center"
        />

        {/* Ambient Dark Gradient on the left side so breadcrumbs and text are 100% crisp and legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032326]/90 via-[#032326]/60 to-transparent pointer-events-none" />

        {/* Category Overlay Content matching the official screenshot */}
        <div className="absolute inset-0 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-xl space-y-3 sm:space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <span className="text-white/60">/</span>
              <span className="text-white font-bold">Cricket Bats</span>
            </nav>

            {/* Giant Title matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              Cricket Bats
            </h1>

            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed max-w-md hidden sm:block">
              Buy top quality handcrafted cricket bats online. Explore our master range of English Willow, Kashmir Willow, and tennis bats with custom knocking.
            </p>

            {/* Quick Willow Selector Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-2">
              <button
                onClick={() => onSelectCategory && onSelectCategory('English Willow')}
                className="px-3.5 py-1.5 bg-black/40 hover:bg-[#f15b28] border border-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              >
                English Willow (104)
              </button>
              <button
                onClick={() => onSelectCategory && onSelectCategory('Kashmir Willow')}
                className="px-3.5 py-1.5 bg-black/40 hover:bg-[#f15b28] border border-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              >
                Kashmir Willow (65)
              </button>
              <button
                onClick={() => onSelectCategory && onSelectCategory('Incredible Willow')}
                className="px-3.5 py-1.5 bg-black/40 hover:bg-[#f15b28] border border-white/20 text-white rounded-full text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              >
                Tennis Bats (3)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
