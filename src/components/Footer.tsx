import React from 'react';
import { Phone, MessageCircle, ArrowUp, ShieldCheck } from 'lucide-react';
import { BatCategory } from '../types/bat';
import { SELLER_INFO } from '../data/bats';

interface FooterProps {
  onSelectCategory: (model: BatCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const models: { label: string; value: BatCategory }[] = [
    { label: '7T7T Gold Edition', value: '7T7T Gold Edition' },
    { label: 'Black Monster', value: 'Black Monster' },
    { label: 'Grey Edition (957g)', value: 'Grey Edition' },
    { label: 'One Side Hero', value: 'One Side Hero' },
  ];

  return (
    <footer className="bg-neutral-950 text-white pt-10 pb-8 border-t border-neutral-900 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center font-black text-xs shadow-xs">
              CA
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight uppercase block font-display">
                CRICKET <span className="text-[#f15b28]">ADDA</span>
              </span>
              <span className="text-[10px] text-neutral-500 block">
                Direct Handcrafted Tennis Cricket Bat Workshop
              </span>
            </div>
          </div>

          {/* Model Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-400">
            {models.map((m) => (
              <button
                key={m.value}
                onClick={() => onSelectCategory(m.value)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Hotlines with Lucide Icons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              title={`WhatsApp: ${SELLER_INFO.primaryPhone}`}
              aria-label="WhatsApp helpline"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <a
              href={`tel:${SELLER_INFO.primaryPhone}`}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 flex items-center justify-center hover:text-white transition-colors"
              title={`Call: ${SELLER_INFO.primaryPhone}`}
              aria-label="Phone hotline"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px] font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" strokeWidth={1.75} />
            <span>© {new Date().getFullYear()} Cricket Adda · Handcrafted Bats · Pan-India Dispatch</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </footer>
  );
};
