import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Scale, ShieldCheck } from 'lucide-react';
import { CricketBat } from '../types/bat';
import { SELLER_INFO } from '../data/bats';
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
      `Hi Cricket Adda, I want to order the ${bat.name} (₹${formatINR(bat.finalPrice)}). Please send available weights and video inspection.`
    );
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-white border border-neutral-200 hover:border-[#f15b28]/60 rounded-xl transition-all duration-200 flex flex-col justify-between hover:shadow-lg overflow-hidden">
      {/* Top Floating Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          {bat.isBestseller && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#f15b28] text-white px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
          {bat.verifiedWeight && (
            <span className="text-[10px] font-bold tracking-tight bg-neutral-900 text-amber-300 px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Scale className="w-2.5 h-2.5" />
              <span>{bat.verifiedWeight.split('(')[0].trim()}</span>
            </span>
          )}
        </div>

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
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#fbfbfa] to-[#f4f2ee] p-3 flex items-center justify-center cursor-pointer overflow-hidden"
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

        {/* Image Mode Switcher (Studio vs Workshop) */}
        {bat.realImages.length > 0 && (
          <div className="absolute top-12 left-2.5 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRealPhoto(!showRealPhoto);
              }}
              className="text-[9px] font-bold px-2 py-1 rounded bg-black/75 hover:bg-black text-white backdrop-blur-xs flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>{showRealPhoto ? '✨ Studio View' : '📸 Real Photo'}</span>
            </button>
          </div>
        )}

        {/* Free Cover Tag */}
        {bat.freeCover && (
          <span className="absolute bottom-2.5 left-2.5 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs z-10 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Free 7T7T Cover</span>
          </span>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(bat);
            }}
            className="flex-1 py-2 px-3 bg-white hover:bg-neutral-100 text-[#18181b] text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(bat);
            }}
            className="p-2 bg-[#f15b28] hover:bg-[#d64716] text-white rounded-lg shadow-md transition-colors cursor-pointer"
            title="Instant Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Info & Pricing */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          {/* Model Tag */}
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f15b28]">
            {bat.model}
          </span>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(bat)}
            className="text-xs sm:text-[13px] font-bold text-neutral-900 hover:text-[#f15b28] transition-colors line-clamp-2 min-h-[36px] cursor-pointer mt-0.5 mb-1.5"
          >
            {bat.name}
          </h3>

          {/* Scoop & Weight Tag */}
          <div className="text-[11px] text-neutral-500 flex items-center gap-2 mb-2">
            <span>Weight: <strong>{bat.weightRange}</strong></span>
          </div>
        </div>

        {/* Pricing & WhatsApp Quick Order */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[11px] text-neutral-500 font-mono">
                <span className="line-through">₹{formatINR(bat.mrp)}</span>
                <span className="text-[#f15b28] font-bold ml-1">
                  ({bat.discountPercent}% OFF)
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-neutral-900 font-mono tracking-tight">
                ₹{formatINR(bat.finalPrice)}/-
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
