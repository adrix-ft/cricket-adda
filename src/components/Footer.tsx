import React from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
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
    { label: 'Gold Edition', value: '7T7T Gold Edition' },
    { label: 'Black Monster', value: 'Black Monster' },
    { label: 'Grey Edition (957g)', value: 'Grey Edition' },
    { label: 'One Side Hero', value: 'One Side Hero' },
  ];

  return (
    <footer className="bg-neutral-950 text-white pt-10 pb-8 border-t border-neutral-900 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-neutral-950 flex items-center justify-center font-black text-xs">
              7T
            </div>
            <div>
              <span className="text-sm font-black tracking-tight uppercase">CRICKET ADDA</span>
              <span className="text-[10px] text-neutral-500 block">7T7T Handcrafted Tennis Bats</span>
            </div>
          </div>

          {/* Model Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400">
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

          {/* Hotlines */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
              title={`WhatsApp: ${SELLER_INFO.primaryPhone}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`tel:${SELLER_INFO.primaryPhone}`}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 flex items-center justify-center hover:text-white transition-colors"
              title={`Call: ${SELLER_INFO.primaryPhone}`}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Cricket Adda · Handcrafted 7T7T Bats · Pan-India Dispatch
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
