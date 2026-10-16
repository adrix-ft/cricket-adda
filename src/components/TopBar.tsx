import React from 'react';
import { Phone, MessageCircle, Scale, Video, ShieldCheck, Info } from 'lucide-react';
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
    <div className="bg-neutral-950 text-neutral-300 text-[11px] font-medium tracking-tight border-b border-neutral-800/80">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        {/* Left: Direct Hotline with Lucide Icons */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
            <span className="font-semibold text-white tracking-normal">{SELLER_INFO.primaryPhone}</span>
          </a>

          <span className="text-neutral-800">/</span>

          <a
            href={`tel:${SELLER_INFO.secondaryPhone}`}
            className="hidden sm:flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors group"
            title="Direct Phone Call"
          >
            <Phone className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" strokeWidth={1.75} />
            <span>{SELLER_INFO.secondaryPhone}</span>
          </a>
        </div>

        {/* Center: Minimalist Trust Specifications with Lucide Icons */}
        <div className="hidden md:flex items-center gap-4 text-neutral-400 text-[10.5px] tracking-wide font-medium">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Scale className="w-3 h-3 text-[#f15b28]" strokeWidth={1.75} />
            <span>Digital Scale Verified</span>
          </span>
          <span className="text-neutral-800">|</span>
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Video className="w-3 h-3 text-emerald-400" strokeWidth={1.75} />
            <span>Live Video Inspection</span>
          </span>
          <span className="text-neutral-800">|</span>
          <span className="flex items-center gap-1.5 text-neutral-300">
            <ShieldCheck className="w-3 h-3 text-amber-400" strokeWidth={1.75} />
            <span>Free Padded Bag Included</span>
          </span>
        </div>

        {/* Right: Clean Minimal Links */}
        <div className="flex items-center gap-2.5 text-neutral-400 text-[11px]">
          <button
            onClick={onOpenAbout}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3 h-3" strokeWidth={1.75} />
            <span>About</span>
          </button>
          <span className="text-neutral-800">/</span>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Phone className="w-3 h-3" strokeWidth={1.75} />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
