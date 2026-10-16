import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  MessageCircle,
  Phone,
  X,
  Layers,
  Crown,
  ShieldAlert,
  Feather,
  Target,
  Sparkles,
} from 'lucide-react';
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const models: {
    label: string;
    value: BatCategory;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { label: 'All Bats', value: 'All', icon: Layers },
    { label: '7T7T Gold', value: '7T7T Gold Edition', icon: Crown },
    { label: 'Black Monster', value: 'Black Monster', icon: ShieldAlert },
    { label: 'Grey (957g)', value: 'Grey Edition', icon: Feather },
    { label: 'One Side Hero', value: 'One Side Hero', icon: Target },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-neutral-200/70 sticky top-0 z-40 transition-all">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo - Minimalist Architectural Monogram */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectModel('All')}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-xs tracking-wider transition-all group-hover:bg-[#f15b28]">
              CA
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-neutral-900 leading-none">
                CRICKET <span className="text-[#f15b28]">ADDA</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium">
                Workshop Bats
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Segmented Model Navigation with Lucide Icons */}
        <nav className="hidden lg:flex items-center p-1 bg-neutral-100/80 rounded-xl border border-neutral-200/60 space-x-0.5">
          {models.map((item) => {
            const isActive = activeModel === item.value;
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                onClick={() => onSelectModel(item.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-[#f15b28]' : 'text-neutral-400'
                  }`}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block w-44 lg:w-52">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search bats, weights..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8.5 pr-7 py-1.5 bg-neutral-100 border border-transparent rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Search"
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? (
              <X className="w-4 h-4" strokeWidth={1.75} />
            ) : (
              <Search className="w-4 h-4" strokeWidth={1.75} />
            )}
          </button>

          {/* WhatsApp Direct Icon Button */}
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20inquire%20about%20a%20bat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/70 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Direct WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          </a>

          {/* Phone Call Icon (Tablet/Desktop) */}
          <a
            href={`tel:${SELLER_INFO.primaryPhone}`}
            className="hidden sm:flex w-8 h-8 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title={`Call: ${SELLER_INFO.primaryPhone}`}
            aria-label="Call workshop"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-600" strokeWidth={1.75} />
          </a>

          {/* Wishlist Icon Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-8 h-8 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Wishlist"
            aria-label="Open wishlist"
          >
            <Heart className="w-4 h-4 text-neutral-600" strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-1 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs shrink-0"
            title="Shopping Bag"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-1 bg-[#f15b28] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-3 py-2 bg-neutral-50 border-t border-neutral-200 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search bats, weight, scoop..."
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-neutral-300 rounded-xl text-[16px] sm:text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Horizontal Model Selector Chips (With Lucide Icons) */}
      <div className="lg:hidden flex items-center gap-1.5 px-3 sm:px-4 py-2 overflow-x-auto border-t border-neutral-100 scrollbar-none bg-neutral-50/90 -webkit-overflow-scrolling-touch overscroll-x-contain">
        {models.map((item) => {
          const isActive = activeModel === item.value;
          const Icon = item.icon;
          return (
            <button
              key={item.value}
              onClick={() => onSelectModel(item.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 touch-manipulation ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white border border-neutral-200/90 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-[#f15b28]' : 'text-neutral-500'
                }`}
                strokeWidth={isActive ? 2 : 1.75}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
