import React from 'react';
import { Search, ShoppingBag, Heart, MessageCircle, Phone, X } from 'lucide-react';
import { BatCategory } from '../types/bat';
import { SELLER_INFO } from '../data/bats';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeModel: BatCategory;
  onSelectModel: (model: BatCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  activeModel,
  onSelectModel,
}) => {
  const models: { label: string; value: BatCategory; short: string; symbol?: string }[] = [
    { label: 'All', value: 'All', short: 'All', symbol: '✦' },
    { label: 'Gold', value: '7T7T Gold Edition', short: 'Gold', symbol: '👑' },
    { label: 'Monster', value: 'Black Monster', short: 'Monster', symbol: '🖤' },
    { label: 'Grey 957g', value: 'Grey Edition', short: 'Grey', symbol: '⚡' },
    { label: '1-Side', value: 'One Side Hero', short: '1-Side', symbol: '🎯' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo - Minimalist & Sleek */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectModel('All')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-xs tracking-tighter transition-transform group-hover:scale-105">
              7T
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tight text-neutral-900 uppercase">
                7T7T
              </span>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                ADDA
              </span>
            </div>
          </button>
        </div>

        {/* Minimalist Segmented Model Navigation */}
        <nav className="hidden md:flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200/60">
          {models.map((item) => {
            const isActive = activeModel === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onSelectModel(item.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span className="text-[11px] opacity-70">{item.symbol}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Minimalist Icon Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Minimal Search Bar */}
          <div className="relative w-36 sm:w-48">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 bg-neutral-100 border border-transparent rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* WhatsApp Direct Icon Button */}
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%207T7T,%20I%20want%20to%20inquire%20about%20a%20bat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/60 flex items-center justify-center transition-colors cursor-pointer"
            title="Chat on WhatsApp (8669937070)"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Call Icon Button */}
          <a
            href={`tel:${SELLER_INFO.primaryPhone}`}
            className="hidden sm:flex w-8 h-8 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            title={`Call ${SELLER_INFO.primaryPhone}`}
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Wishlist Icon Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-8 h-8 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            title="Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#f15b28] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Model Selector Chips */}
      <div className="md:hidden flex items-center gap-1.5 px-4 py-2 overflow-x-auto border-t border-neutral-100 scrollbar-none bg-neutral-50/70">
        {models.map((item) => {
          const isActive = activeModel === item.value;
          return (
            <button
              key={item.value}
              onClick={() => onSelectModel(item.value)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700'
              }`}
            >
              <span className="text-[10px]">{item.symbol}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
