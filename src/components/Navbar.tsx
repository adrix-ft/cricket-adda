import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Phone, MessageCircle } from 'lucide-react';
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
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  // Direct product models sold by client
  const models: { label: string; value: BatCategory; badge?: string }[] = [
    { label: 'All Bats', value: 'All' },
    { label: '7T7T Gold Edition', value: '7T7T Gold Edition' },
    { label: 'Black Monster', value: 'Black Monster', badge: 'Carbon' },
    { label: 'Grey Edition', value: 'Grey Edition', badge: '957g Scale' },
    { label: 'One Side Hero', value: 'One Side Hero', badge: '1-Side Scoop' },
  ];

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 md:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectModel('All')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-11 h-11 bg-[#f15b28] rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                {/* Bat Silhouette Logo */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M14.5 2.5 17 5 6 16l-3.5 1.5L4 14z" />
                  <path d="m14 8 2-2" />
                  <path d="m11 11 2-2" />
                  <path d="m8 14 2-2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#18181b] uppercase">
                    CRICKET
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#f15b28] uppercase">
                    ADDA
                  </span>
                </div>
                <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase -mt-0.5">
                  7T7T Scoop Tennis Bats Specialist
                </span>
              </div>
            </button>
          </div>

          {/* Simple, Direct Bat Model Tabs (No fancy confusing corporate tabs) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {models.map((item) => {
              const isActive = activeModel === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => onSelectModel(item.value)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-[#f15b28] hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                        isActive
                          ? 'bg-[#f15b28] text-white'
                          : 'bg-orange-100 text-[#f15b28]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Utilities: Search, Seller WhatsApp Hotline, Cart & Wishlist */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-56">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bat, weight..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#f15b28] focus:bg-white transition-colors"
              />
            </div>

            {/* Direct WhatsApp Call/Chat Button */}
            <a
              href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20order%20a%207T7T%20tennis%20cricket%20bat.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              title="Chat directly on WhatsApp with seller"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: 8669937070</span>
            </a>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-neutral-700 hover:text-[#f15b28] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-700 hover:text-[#f15b28] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f15b28] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Model Selector Chips */}
        <div className="lg:hidden flex items-center gap-2 px-4 py-2.5 overflow-x-auto border-t border-neutral-100 scrollbar-none bg-[#faf9f8]">
          {models.map((item) => {
            const isActive = activeModel === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onSelectModel(item.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:border-[#f15b28]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>
    </>
  );
};
