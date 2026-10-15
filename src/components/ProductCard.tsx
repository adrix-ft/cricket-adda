import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Scale, Camera, Sparkles } from 'lucide-react';
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
  const [showRealPhoto, setShowRealPhoto] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  const currentDisplayImage = showRealPhoto && bat.realImages.length > 0
    ? bat.realImages[0].url
    : bat.imageUrl;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hi, I want to order the ${bat.name} (₹${formatINR(bat.finalPrice)}). Please share video inspection.`
    );
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-white border border-neutral-200/80 hover:border-neutral-400 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden hover:shadow-lg touch-manipulation">
      {/* Top Floating Controls */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Weight / Model Micro-badge */}
        <div className="flex items-center gap-1 pointer-events-auto">
          {bat.verifiedWeight && (
            <span className="text-[9px] sm:text-[10px] font-bold tracking-tight bg-neutral-900/90 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
              <Scale className="w-2.5 h-2.5 text-[#f15b28]" />
              <span className="truncate max-w-[80px] sm:max-w-none">
                {bat.verifiedWeight.split('(')[0].replace('Balanced Weight', '').trim()}
              </span>
            </span>
          )}
        </div>

        {/* Right: Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(bat);
          }}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors pointer-events-auto cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white/90 backdrop-blur-xs border-neutral-200 text-neutral-400 hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Saved' : 'Save'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => onQuickView(bat)}
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-neutral-50 to-neutral-100/60 p-2 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {!imageError ? (
          <img
            src={currentDisplayImage}
            alt={bat.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CricketBatIllustration bat={bat} />
        )}

        {/* Minimal Studio vs Real Toggle Symbol */}
        {bat.realImages.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowRealPhoto(!showRealPhoto);
            }}
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-20 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-xs flex items-center gap-1 shadow-xs cursor-pointer transition-transform hover:scale-105"
            title={showRealPhoto ? 'Studio View' : 'Real Photo'}
          >
            {showRealPhoto ? (
              <>
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span className="hidden sm:inline">Studio</span>
              </>
            ) : (
              <>
                <Camera className="w-2.5 h-2.5 text-white" />
                <span>Real</span>
              </>
            )}
          </button>
        )}

        {/* Desktop Quick View Overlay on Hover */}
        <div className="hidden lg:flex absolute bottom-3 right-3 items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(bat);
            }}
            className="w-8 h-8 rounded-full bg-white text-neutral-800 hover:bg-neutral-100 shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-grow bg-white space-y-1.5 sm:space-y-2">
        <div>
          {/* Micro Model Tag */}
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate block">
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
          <div className="text-[10px] sm:text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5 truncate">
            <span>{bat.weightRange}</span>
            <span>•</span>
            <span>{bat.edgeThickness.split(' ')[0]}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 font-mono">
            <span className="text-xs sm:text-base font-black text-neutral-900 leading-tight">
              ₹{formatINR(bat.finalPrice)}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-400 line-through leading-none">
              ₹{formatINR(bat.mrp)}
            </span>
          </div>

          {/* Action Symbols */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleWhatsAppOrder}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 flex items-center justify-center transition-colors cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(bat);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              title="Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
