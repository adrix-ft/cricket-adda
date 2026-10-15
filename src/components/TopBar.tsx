import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Scale, Video } from 'lucide-react';
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
    <div className="bg-[#f15b28] text-white text-xs font-medium tracking-wide">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left: Direct WhatsApp & Phone Helpline */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20order%20a%207T7T%20tennis%20cricket%20bat`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">WhatsApp Order:</span>
            <span className="font-bold underline decoration-white/40 underline-offset-2">
              {SELLER_INFO.primaryPhone}
            </span>
          </a>

          <span className="text-white/40 hidden md:inline">|</span>

          <a
            href={`tel:${SELLER_INFO.secondaryPhone}`}
            className="hidden md:flex items-center gap-1 hover:text-amber-200 transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Call: {SELLER_INFO.secondaryPhone}</span>
          </a>
        </div>

        {/* Center: Live Guarantee */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-white/95">
          <span className="flex items-center gap-1 font-semibold">
            <Scale className="w-3.5 h-3.5 text-amber-200" />
            <span>Exact Digital Scale Weight Match</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold">
            <Video className="w-3.5 h-3.5 text-emerald-200" />
            <span>Video Call Verification</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
            <span>Free 7T7T Padded Bat Cover</span>
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenAbout}
            className="hover:underline underline-offset-2 transition-colors cursor-pointer text-xs"
          >
            About Workshop
          </button>
          <button
            onClick={onOpenContact}
            className="hover:underline underline-offset-2 transition-colors cursor-pointer text-xs"
          >
            Contact & Video Call
          </button>
        </div>
      </div>
    </div>
  );
};
