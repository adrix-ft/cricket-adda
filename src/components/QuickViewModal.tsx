import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Scale, MessageCircle, Phone, Check, ShoppingBag, Eye, Video } from 'lucide-react';
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

  // Compile all images: generated studio image + real workshop/scale images
  const allImages = [
    {
      url: bat.imageUrl,
      caption: 'Studio Showcase View (7T7T Crafted Specification)',
      badge: '✨ Studio View'
    },
    ...bat.realImages
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
    `Hello Cricket Adda! I would like to order the ${bat.name}.\nModel: ${bat.model}\nChosen Weight: ${selectedWeight}\nPrice: ₹${formatINR(bat.finalPrice)}\nCan you arrange a video call to inspect this piece before courier dispatch?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left: Gallery with Real Photos & Studio Renders */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            {/* Main Active Image Container */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-[#fbfbfa] to-[#f4f2ee] rounded-xl p-4 border border-neutral-200 flex items-center justify-center overflow-hidden">
              <img
                src={currentImg.url}
                alt={currentImg.caption}
                className="w-full h-full object-contain"
              />

              {/* Image Type Badge */}
              {currentImg.badge && (
                <span className="absolute top-3 left-3 bg-neutral-900/85 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur-xs">
                  {currentImg.badge}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(bat)}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Caption */}
            <p className="text-[11px] text-neutral-500 text-center italic">
              {currentImg.caption}
            </p>

            {/* Thumbnail Carousel */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 shrink-0 rounded-lg border-2 p-1 bg-neutral-50 overflow-hidden cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#f15b28] ring-2 ring-orange-200'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-contain"
                    />
                    {img.badge && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[7px] text-white font-bold text-center truncate px-0.5">
                        {img.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Live Video Call Guarantee Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-900">
              <Video className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Video Call Inspection Before Dispatch:</strong>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  We show your exact bat on digital scale & verify grain on WhatsApp video before courier shipping.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Order Controls */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#f15b28]">
                  {bat.model}
                </span>
                {bat.freeCover && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    + Free 7T7T Bat Bag
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 leading-snug">
                {bat.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3 pb-3 border-b border-neutral-200">
                <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
                  ₹{formatINR(bat.finalPrice)}/-
                </div>
                <div className="text-sm text-neutral-500 font-mono line-through">
                  ₹{formatINR(bat.mrp)}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {bat.discountPercent}%
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed mt-3">
                {bat.shortDesc}
              </p>

              {/* Weight Selector */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#f15b28]" />
                    <span>Select Exact Weight:</span>
                  </span>
                  <span className="text-[#f15b28]">{selectedWeight}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {bat.availableWeights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        selectedWeight === w
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <div>
                  <span className="text-neutral-500 block">Scoop Type:</span>
                  <span className="font-bold text-neutral-800">{bat.scoopType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Edge Thickness:</span>
                  <span className="font-bold text-neutral-800">{bat.edgeThickness}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Blade Length:</span>
                  <span className="font-bold text-neutral-800">{bat.bladeLength}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Handle:</span>
                  <span className="font-bold text-neutral-800">{bat.handleType}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="mt-3 space-y-1 text-xs text-neutral-700">
                {bat.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions: Direct WhatsApp Order + Add to Cart */}
            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp ({selectedWeight})</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#f15b28] hover:bg-[#d64716] text-white border-transparent'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedAnimation ? 'Added!' : 'Add to Cart'}</span>
                </button>

                <a
                  href={`tel:${SELLER_INFO.primaryPhone}`}
                  className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-neutral-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Seller</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
