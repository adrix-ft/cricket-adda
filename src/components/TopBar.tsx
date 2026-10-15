import React from 'react';
import { Phone, MessageCircle, Scale, ShieldCheck, Video, Info } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

interface TopBarProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenAbout,
  onOpenContact,
}) => {
  return (
    <div className="bg-neutral-900 text-white text-[11px] font-medium tracking-tight border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        {/* Left: Quick Icon Hotlines */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{SELLER_INFO.primaryPhone}</span>
          </a>

          <span className="text-neutral-700">|</span>

          <a
            href={`tel:${SELLER_INFO.secondaryPhone}`}
            className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            title="Direct Calling"
          >
            <Phone className="w-3 h-3 text-neutral-400" />
            <span>{SELLER_INFO.secondaryPhone}</span>
          </a>
        </div>

        {/* Center: Minimalist Trust Indicators */}
        <div className="hidden md:flex items-center gap-4 text-neutral-400 text-[10px] uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1 text-neutral-300">
            <Scale className="w-3 h-3 text-[#f15b28]" />
            <span>Digital Scale Verified</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-neutral-300">
            <Video className="w-3 h-3 text-emerald-400" />
            <span>Live Video Inspection</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-neutral-300">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Free Cricket Adda Bag</span>
          </span>
        </div>

        {/* Right: Minimalist Links */}
        <div className="flex items-center gap-3 text-neutral-400">
          <button
            onClick={onOpenAbout}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span>About</span>
          </button>
          <span>/</span>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
