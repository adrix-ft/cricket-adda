import React, { useState } from 'react';
import { X, Heart, Scale, MessageCircle, Phone, ShoppingBag, Video, ShieldCheck, Camera, Sparkles, Check } from 'lucide-react';
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

  const allImages: { url: string; caption: string; badge?: string; isStudio: boolean }[] = [
    {
      url: bat.imageUrl,
      caption: 'Studio View',
      badge: 'Studio',
      isStudio: true
    },
    ...bat.realImages.map((img) => ({
      url: img.url,
      caption: img.caption,
      badge: img.badge,
      isStudio: false
    }))
  ];

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
    `Hi, I want to order ${bat.name} (${selectedWeight}) for ₹${formatINR(bat.finalPrice)}. Please arrange a video call.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left: Visual Gallery */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-2xl p-4 border border-neutral-200/80 flex items-center justify-center overflow-hidden">
              <img
                src={currentImg.url}
                alt={currentImg.caption}
                className="w-full h-full object-contain"
              />

              {/* Top Right Save */}
              <button
                onClick={() => onToggleWishlist(bat)}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer shadow-xs ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-500'
                }`}
                title="Save"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Bottom Image Type Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                  {currentImg.isStudio ? (
                    <>
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>Studio</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-2.5 h-2.5 text-white" />
                      <span>{currentImg.badge || 'Real'}</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 shrink-0 rounded-xl border p-1 bg-neutral-50 overflow-hidden cursor-pointer transition-all ${
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

          {/* Right: Minimal Details & Controls */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {bat.model}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                  {bat.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 pb-3 border-b border-neutral-100 font-mono">
                <span className="text-2xl font-black text-neutral-900">
                  ₹{formatINR(bat.finalPrice)}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  ₹{formatINR(bat.mrp)}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-sans ml-1">
                  -{bat.discountPercent}%
                </span>
              </div>

              {/* Weight Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Weight:</span>
                  </span>
                  <span className="font-bold text-neutral-900">{selectedWeight}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bat.availableWeights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        selectedWeight === w
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimalist 4-Grid Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 text-neutral-700">
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Scoop</span>
                  <span className="font-semibold text-neutral-900">{bat.scoopType.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Edge</span>
                  <span className="font-semibold text-neutral-900">{bat.edgeThickness}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Length</span>
                  <span className="font-semibold text-neutral-900">{bat.bladeLength.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Handle</span>
                  <span className="font-semibold text-neutral-900">Singapore Cane</span>
                </div>
              </div>

              {/* Quick Trust Chips */}
              <div className="flex items-center gap-3 text-[10px] text-neutral-500 uppercase tracking-wider font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-emerald-600" />
                  <span>Video Call</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-500" />
                  <span>Free Bag</span>
                </span>
                <span>•</span>
                <span>COD</span>
              </div>
            </div>

            {/* Actions: Symbol-Rich Minimal Buttons */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-black text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{addedAnimation ? 'Added' : 'Add to Bag'}</span>
                </button>

                <a
                  href={`tel:${SELLER_INFO.primaryPhone}`}
                  className="py-2 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
