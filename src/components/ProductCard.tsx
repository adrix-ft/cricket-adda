import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { CricketBat } from '../types/bat';
import { CricketBatIllustration } from './CricketBatIllustration';

interface ProductCardProps {
  bat: CricketBat;
  isWishlisted: boolean;
  onToggleWishlist: (bat: CricketBat) => void;
  onQuickView: (bat: CricketBat) => void;
  onAddToCart: (bat: CricketBat) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  bat,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="group relative bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between hover:shadow-md">
      {/* Top action icons & tags */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        {bat.hasCompare ? (
          <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider bg-white/95 px-1.5 py-0.5 border border-neutral-200 pointer-events-auto">
            Compare
          </span>
        ) : (
          <span />
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(bat);
          }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors pointer-events-auto cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-500 hover:border-neutral-300'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => onQuickView(bat)}
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#fdfdfc] to-[#f7f6f4] p-3 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {bat.imageUrl && !imageError ? (
          <img
            src={bat.imageUrl}
            alt={bat.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CricketBatIllustration bat={bat} />
        )}

        {/* "New" Badge matching screenshot on bottom right */}
        {bat.isNew && (
          <span className="absolute bottom-3 right-3 bg-[#f15b28] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs tracking-wide shadow-xs z-10">
            New
          </span>
        )}

        {/* Quick View & Add to cart Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(bat);
            }}
            className="flex-1 py-2 px-3 bg-white hover:bg-neutral-100 text-[#18181b] text-xs font-bold rounded shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(bat);
            }}
            className="p-2 bg-[#f15b28] hover:bg-[#c93c0d] text-white rounded shadow-md transition-colors cursor-pointer"
            title="Instant Add"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Pricing */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Product Title */}
        <h3
          onClick={() => onQuickView(bat)}
          className="text-xs sm:text-[13px] font-semibold text-neutral-800 hover:text-[#f15b28] transition-colors line-clamp-2 min-h-[38px] cursor-pointer mb-2"
        >
          {bat.name}
        </h3>

        {/* Price Section matching screenshot typography */}
        <div className="space-y-0.5 pt-1 border-t border-neutral-100">
          <div className="text-[11px] text-neutral-500 font-mono">
            <span>MRP: </span>
            <span className="line-through">₹{formatINR(bat.mrp)}/-</span>
            <span className="text-[#f15b28] font-bold ml-1">
              ({bat.discountPercent}% OFF)
            </span>
          </div>

          <div className="text-sm sm:text-[15px] font-bold text-neutral-900 font-mono tracking-tight">
            <span>₹{formatINR(bat.finalPrice)}/- </span>
            <span className="text-[10px] font-normal text-neutral-500 font-sans">
              (incl. taxes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
