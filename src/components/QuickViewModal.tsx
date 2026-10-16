import React, { useState } from 'react';
import {
  X,
  Heart,
  Scale,
  MessageCircle,
  Phone,
  ShoppingBag,
  Video,
  ShieldCheck,
  Camera,
  Check,
  Truck,
} from 'lucide-react';
import { CricketBat } from '../types/bat';
import { SELLER_INFO } from '../data/bats';

interface QuickViewModalProps {
  bat: CricketBat | null;
  onClose: () => void;
  onAddToCart: (bat: CricketBat, selectedWeight: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (bat: CricketBat) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  bat,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!bat) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(
    bat.availableWeights[0] || bat.weightRange
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  const allImages =
    bat.realImages.length > 0
      ? bat.realImages
      : [{ url: bat.imageUrl, caption: bat.name, badge: 'Photo' }];

  const currentImg = allImages[activeImageIndex] || allImages[0];

  const handleAdd = () => {
    onAddToCart(bat, selectedWeight);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to order ${bat.name} (${selectedWeight}) for ₹${formatINR(
      bat.finalPrice
    )}. Please arrange a video call.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200/90 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button with Lucide X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 p-4 sm:p-7">
          {/* Left: Visual Gallery */}
          <div className="md:col-span-6 flex flex-col space-y-2.5">
            <div className="relative w-full aspect-square bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200/80 flex items-center justify-center overflow-hidden">
              <img
                src={currentImg.url}
                alt={currentImg.caption}
                className="w-full h-full object-contain"
              />

              {/* Top Right Wishlist Toggle with Lucide Heart */}
              <button
                onClick={() => onToggleWishlist(bat)}
                className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer shadow-xs ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white/95 border-neutral-200 text-neutral-400 hover:text-rose-500'
                }`}
                title="Save to wishlist"
                aria-label="Wishlist toggle"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              {/* Bottom Image Badge with Lucide Camera */}
              {currentImg.badge && (
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-900/85 text-white backdrop-blur-xs flex items-center gap-1">
                    <Camera className="w-3 h-3 text-white" strokeWidth={1.75} />
                    <span>{currentImg.badge}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -webkit-overflow-scrolling-touch">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg sm:rounded-xl border p-1 bg-neutral-50 overflow-hidden cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? 'border-neutral-900 ring-2 ring-neutral-200'
                        : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Order Controls */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  {bat.model}
                </span>
                <h2 className="text-base sm:text-xl font-bold text-neutral-900 mt-0.5 leading-snug">
                  {bat.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pb-2.5 border-b border-neutral-100 font-mono">
                <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                  ₹{formatINR(bat.finalPrice)}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  ₹{formatINR(bat.mrp)}
                </span>
                <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-sans ml-1">
                  Save {bat.discountPercent}%
                </span>
              </div>

              {/* Weight Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.75} />
                    <span>Select Verified Weight:</span>
                  </span>
                  <span className="font-bold text-neutral-950 font-mono">{selectedWeight}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bat.availableWeights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer touch-manipulation flex items-center gap-1 ${
                        selectedWeight === w
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {selectedWeight === w && <Check className="w-3 h-3" strokeWidth={2} />}
                      <span>{w}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimal Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 text-neutral-700">
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase font-medium">Scoop Profile</span>
                  <span className="font-semibold text-neutral-900 truncate block mt-0.5">
                    {bat.scoopType.split('(')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase font-medium">Edge Dimension</span>
                  <span className="font-semibold text-neutral-900 truncate block mt-0.5">
                    {bat.edgeThickness}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase font-medium">Blade Spec</span>
                  <span className="font-semibold text-neutral-900 truncate block mt-0.5">
                    {bat.bladeLength.split('(')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase font-medium">Handle Core</span>
                  <span className="font-semibold text-neutral-900 truncate block mt-0.5">Singapore Cane</span>
                </div>
              </div>

              {/* Quick Assurance Chips with Lucide Icons */}
              <div className="flex items-center gap-3 text-[10.5px] text-neutral-500 font-medium">
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <Video className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.75} />
                  <span>Video Call Pre-Dispatch</span>
                </span>
                <span className="text-neutral-300">|</span>
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.75} />
                  <span>Free Padded Cover</span>
                </span>
                <span className="text-neutral-300">|</span>
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <Truck className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />
                  <span>COD Available</span>
                </span>
              </div>
            </div>

            {/* Mobile & Desktop Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 sm:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                <span>WhatsApp Order ({selectedWeight})</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-black text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>{addedAnimation ? 'Added to Bag' : 'Add to Bag'}</span>
                </button>

                <a
                  href={`tel:${SELLER_INFO.primaryPhone}`}
                  className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Direct Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
