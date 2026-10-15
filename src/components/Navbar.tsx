import React, { useState } from 'react';
import { Search, User, ShoppingBag, Heart, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeBatCategory: string;
  onSelectBatCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  activeBatCategory,
  onSelectBatCategory,
}) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Exclusively Bat Categories since they only sell bats
  const batCategories = [
    'All Bats',
    'English Willow',
    'Kashmir Willow',
    'Player Edition',
    'Tennis Bats',
  ];

  return (
    <>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Logo: Cricket Adda */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectBatCategory('All Bats');
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              {/* Dynamic Winged Blade Icon */}
              <div className="w-11 h-11 bg-[#f15b28] rounded-md flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
                  <path
                    d="M 12 28 L 26 14 Q 28 12 30 14 L 32 16 Q 34 18 32 20 L 18 34 Q 15 36 12 34 L 10 32 Q 8 29 12 28 Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M 28 12 L 34 6 L 36 8 L 30 14 Z"
                    fill="#fed7aa"
                  />
                  <path
                    d="M 6 22 L 18 10 L 14 8 L 4 18 Z"
                    fill="rgba(255,255,255,0.7)"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black tracking-tight text-[#18181b] uppercase">
                    CRICKET
                  </span>
                  <span className="text-2xl font-black tracking-tight text-[#f15b28] uppercase">
                    ADDA
                  </span>
                </div>
                <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase -mt-1">
                  Handcrafted Cricket Bats Specialist
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Bat Category Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#24201e]">
            {batCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectBatCategory(cat)}
                className={`relative py-1 transition-colors hover:text-[#f15b28] cursor-pointer whitespace-nowrap ${
                  activeBatCategory === cat
                    ? 'text-[#f15b28] font-bold'
                    : 'text-neutral-700'
                }`}
              >
                {cat}
                {activeBatCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f15b28] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Search, User & Cart (Bat Advisor removed) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Input */}
            <div className="relative w-36 sm:w-56 md:w-64">
              <input
                type="text"
                placeholder="Search bats, willow, range..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-7 py-2 text-xs border border-neutral-300 rounded-full bg-neutral-50 focus:bg-white focus:outline-none focus:border-[#f15b28] focus:ring-1 focus:ring-[#f15b28] transition-all placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-neutral-700 hover:text-[#f15b28] transition-colors cursor-pointer"
              title="Saved Bats"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#f15b28] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button
              onClick={() => setShowAccountModal(true)}
              className="p-2 text-neutral-700 hover:text-[#f15b28] transition-colors cursor-pointer"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon & Counter */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-neutral-100 hover:bg-[#fdf4f1] text-neutral-800 hover:text-[#f15b28] rounded-full transition-colors cursor-pointer"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#f15b28] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl relative border border-neutral-200">
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#fdf4f1] text-[#f15b28] rounded-full mx-auto flex items-center justify-center mb-3">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Cricket Adda Bats Club</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Sign in to manage your handcrafted bat orders, warranty registration, and knocking-in tracking.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your phone or email"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-[#f15b28]"
                  defaultValue="adrashyadav07o8@gmail.com"
                />
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="w-full py-2.5 bg-[#f15b28] hover:bg-[#c93c0d] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
