import React from 'react';
import { Phone, MessageCircle, ArrowUp, ShieldCheck, Scale, Award } from 'lucide-react';
import { BatCategory } from '../types/bat';
import { SELLER_INFO } from '../data/bats';

interface FooterProps {
  onSelectCategory: (model: BatCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121214] text-white pt-14 pb-8 border-t border-neutral-800 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand & Mission Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#f15b28] rounded flex items-center justify-center text-white font-black text-sm">
                7T
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black uppercase text-white tracking-tight">CRICKET</span>
                <span className="text-xl font-black uppercase text-[#f15b28] tracking-tight">ADDA</span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Specialized local workshop for 7T7T handcrafted scooped tennis cricket bats. Each bat is calibrated for weight, balanced by hand, and verified on digital scales before dispatch.
            </p>

            <div className="pt-1 space-y-1">
              <div className="text-[11px] text-neutral-400">Direct WhatsApp Orders & Inquiries:</div>
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+91 {SELLER_INFO.primaryPhone}</span>
              </a>
              <div className="text-xs text-neutral-400">
                Secondary Helpline: <a href={`tel:${SELLER_INFO.secondaryPhone}`} className="text-white hover:underline">+91 {SELLER_INFO.secondaryPhone}</a>
              </div>
            </div>
          </div>

          {/* Column 1: Our Bat Models */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">7T7T Models</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('7T7T Gold Edition')} className="hover:text-white transition-colors cursor-pointer text-left">
                  7T7T Gold Edition (Dual Scoop)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Black Monster')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Black Monster (Carbon Face)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Grey Edition')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Grey Edition (957g Featherlight)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('One Side Hero')} className="hover:text-white transition-colors cursor-pointer text-left">
                  One Side Hero (1-Side Scoop)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Accessories')} className="hover:text-white transition-colors cursor-pointer text-left">
                  7T7T Padded Bat Kit Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Seller Guarantees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Buyer Assurance</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-[#f15b28]" />
                <span>Exact Scale Weight Match</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Video Call Inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Free 7T7T Padded Bat Cover</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Workshop Support</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Workshop Hours & Delivery */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Dispatch & Delivery</h4>
            <div className="space-y-2 text-neutral-400">
              <p>• Pan-India Courier with Tracking</p>
              <p>• Cash on Delivery (COD) Available</p>
              <p>• Dispatch within 24 hours of order</p>
              <p className="text-[11px] text-neutral-500 pt-2">
                Workshop hours: Mon–Sun, 9:00 AM – 9:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Cricket Adda & 7T7T Bats. All rights reserved. Handcrafted in India.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
