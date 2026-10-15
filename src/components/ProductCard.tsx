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
      `Hi, I want to order the ${bat.name} (₹${formatINR(bat.finalPrice)}). Please share video inspection.`
    );
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-white border border-neutral-200/80 hover:border-neutral-400 rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-lg">
      {/* Top Floating Controls */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Weight / Model Micro-badge */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {bat.verifiedWeight && (
            <span className="text-[10px] font-bold tracking-tight bg-neutral-900/90 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
              <Scale className="w-2.5 h-2.5 text-[#f15b28]" />
              <span>{bat.verifiedWeight.split('(')[0].replace('Balanced Weight', '').trim()}</span>
            </span>
          )}
        </div>

        {/* Right: Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(bat);
          }}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors pointer-events-auto cursor-pointer shadow-xs ${
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
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-neutral-50 to-neutral-100/60 p-4 flex items-center justify-center cursor-pointer overflow-hidden"
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
            className="absolute bottom-3 left-3 z-20 text-[10px] font-bold px-2 py-1 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-xs flex items-center gap-1 shadow-xs cursor-pointer transition-transform hover:scale-105"
            title={showRealPhoto ? 'Switch to Studio View' : 'Switch to Real Photo'}
          >
            {showRealPhoto ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Studio</span>
              </>
            ) : (
              <>
                <Camera className="w-3 h-3 text-white" />
                <span>Real</span>
              </>
            )}
          </button>
        )}

        {/* Minimal Action Overlay - Symbol Only */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(bat);
            }}
            className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-black shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            title="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleWhatsAppOrder}
            className="w-8 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            title="Order via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Information - Clean & Less Text */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white space-y-2">
        <div>
          {/* Micro Model Tag */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
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
          <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-1">
            <span>{bat.weightRange}</span>
            <span>•</span>
            <span>{bat.edgeThickness.split(' ')[0]} edge</span>
          </div>
        </div>

        {/* Price & Quick Action */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-base font-black text-neutral-900">
              ₹{formatINR(bat.finalPrice)}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ₹{formatINR(bat.mrp)}
            </span>
          </div>

          {/* Quick Add Symbol Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleWhatsAppOrder}
              className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors cursor-pointer"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(bat);
              }}
              className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Add"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
