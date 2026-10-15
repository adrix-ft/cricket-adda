import React from 'react';
import { Instagram, Youtube, Facebook, Linkedin, Twitter, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (willow: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121214] text-white pt-14 pb-8 border-t border-neutral-800 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#f15b28] rounded flex items-center justify-center text-white font-black text-sm">
                CA
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black uppercase text-white tracking-tight">CRICKET</span>
                <span className="text-xl font-black uppercase text-[#f15b28] tracking-tight">ADDA</span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Cricket Adda is a master-craft cricket brand built on decades of craftsmanship, fearless innovation, and a passion for empowering players worldwide. Trusted by international professionals, loved by cricketers of every level.
            </p>

            {/* Helpline badge */}
            <div className="pt-1">
              <div className="text-[11px] text-neutral-400">WhatsApp & Phone Support:</div>
              <a
                href="https://wa.me/919217679479"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#f15b28] hover:underline"
              >
                +91 92176 79479
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-[#f15b28] transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-[#f15b28] transition-colors" title="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-[#f15b28] transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-[#f15b28] transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-[#f15b28] transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Explore</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('English Willow')} className="hover:text-white transition-colors cursor-pointer text-left">
                  English Willow
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Kashmir Willow')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Kashmir Willow
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Incredible Willow')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Tennis Bats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('English Willow')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Player Edition
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adda Rebels</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Important */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Important</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Loyalty Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Verify Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Catalogue</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Policies</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Refund & Return</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 @Cricket Adda. All rights reserved.
          </div>

          {/* Payment Badges matching screenshot (Visa, Mastercard, Maestro, Google Pay) */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="px-2.5 py-1 bg-neutral-800 rounded border border-neutral-700 text-white font-extrabold text-[11px] tracking-wider italic">
              VISA
            </div>
            {/* Mastercard */}
            <div className="px-2.5 py-1 bg-neutral-800 rounded border border-neutral-700 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block -mr-1" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block opacity-90" />
            </div>
            {/* Maestro */}
            <div className="px-2.5 py-1 bg-neutral-800 rounded border border-neutral-700 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block -mr-1" />
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block opacity-90" />
            </div>
            {/* GPay */}
            <div className="px-2.5 py-1 bg-neutral-800 rounded border border-neutral-700 text-neutral-200 font-bold text-[11px]">
              G Pay
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
