import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Scale, Camera } from 'lucide-react';
import { CricketBat } from '../types/bat';
import { SELLER_INFO } from '../data/bats';
import { CricketBatIllustration } from './CricketBatIllustration';

interface ProductCardProps {
  bat: CricketBat;
  isWishlisted: boolean;
  onToggleWishlist: (bat: CricketBat) => void;
  onQuickView: (bat: CricketBat) => void;
  onAddToCart: (bat: CricketBat) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  bat,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  compact = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hi, I want to order the ${bat.name} (₹${formatINR(bat.finalPrice)}). Please share video inspection.`
    );
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-white border border-neutral-200/90 hover:border-neutral-900 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden hover:shadow-md touch-manipulation">
      {/* Top Floating Controls */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Weight Micro-badge with Lucide Scale */}
        <div className="flex items-center gap-1 pointer-events-auto">
          {bat.verifiedWeight && (
            <span className="text-[9.5px] sm:text-[10px] font-semibold tracking-tight bg-neutral-950/90 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
              <Scale className="w-3 h-3 text-[#f15b28]" strokeWidth={1.75} />
              <span className="truncate max-w-[90px] sm:max-w-none">
                {bat.verifiedWeight.split('(')[0].replace('Balanced Weight', '').trim()}
              </span>
            </span>
          )}
        </div>

        {/* Right: Wishlist Icon Button with Lucide Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(bat);
          }}
          className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors pointer-events-auto cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white/95 backdrop-blur-xs border-neutral-200 text-neutral-400 hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : ''
            }`}
            strokeWidth={1.75}
          />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => onQuickView(bat)}
        className="relative w-full aspect-[4/5] bg-neutral-50/70 p-3 sm:p-5 flex items-center justify-center cursor-pointer overflow-hidden border-b border-neutral-100"
      >
        {!imageError ? (
          <img
            src={bat.imageUrl}
            alt={bat.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CricketBatIllustration bat={bat} />
        )}

        {/* Photo Gallery Indicator with Lucide Camera */}
        {bat.realImages.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 z-20 text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-neutral-900/80 text-white backdrop-blur-xs flex items-center gap-1">
            <Camera className="w-3 h-3 text-white" strokeWidth={1.75} />
            <span>{bat.realImages.length} Photos</span>
          </div>
        )}

        {/* Desktop Quick View Overlay on Hover */}
        <div className="hidden lg:flex absolute bottom-2.5 right-2.5 items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(bat);
            }}
            className="w-8 h-8 rounded-full bg-white text-neutral-800 hover:bg-neutral-100 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            title="Quick Preview"
            aria-label="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow bg-white space-y-2">
        <div>
          {/* Micro Model Tag */}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 truncate block">
            {bat.model}
          </span>

          {/* Bat Name */}
          <h3
            onClick={() => onQuickView(bat)}
            className="text-xs sm:text-[13px] font-bold text-neutral-900 hover:text-[#f15b28] transition-colors line-clamp-1 cursor-pointer mt-0.5"
          >
            {bat.name}
          </h3>

          {/* Micro Specs */}
          <div className="text-[10.5px] sm:text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5 truncate font-medium">
            <span>{bat.weightRange}</span>
            <span className="text-neutral-300">/</span>
            <span>{bat.edgeThickness.split(' ')[0]}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 font-mono">
            <span className="text-xs sm:text-base font-bold text-neutral-950 leading-tight">
              ₹{formatINR(bat.finalPrice)}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-400 line-through leading-none">
              ₹{formatINR(bat.mrp)}
            </span>
          </div>

          {/* Action Symbols with Lucide Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleWhatsAppOrder}
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 flex items-center justify-center transition-colors cursor-pointer"
              title="Order on WhatsApp"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(bat);
              }}
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              title="Add to Shopping Bag"
              aria-label="Add to bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
