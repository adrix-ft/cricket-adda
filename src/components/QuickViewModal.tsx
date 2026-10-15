import React, { useState } from 'react';
import { X, Heart, Shield, Check, MessageSquare, ShoppingBag, Info } from 'lucide-react';
import { BatSize, CricketBat } from '../types/bat';
import { CricketBatIllustration } from './CricketBatIllustration';

interface QuickViewModalProps {
  bat: CricketBat | null;
  onClose: () => void;
  onAddToCart: (bat: CricketBat, size: BatSize, withKnocking: boolean) => void;
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

  const [selectedSize, setSelectedSize] = useState<BatSize>(bat.sizes[bat.sizes.length - 1] || 'Mens');
  const [withKnocking, setWithKnocking] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAdd = () => {
    onAddToCart(bat, selectedSize, withKnocking);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const knockingFee = withKnocking ? 799 : 0;
  const totalPrice = bat.finalPrice + knockingFee;

  const whatsappMessage = encodeURIComponent(
    `Hi Cricket Adda, I would like to inquire about the ${bat.name} (₹${formatINR(
      bat.finalPrice
    )}). Can you share the exact available weights and grain pictures?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Visual Showcase */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-[#fbfbfa] to-[#f4f2ee] rounded-xl p-6 border border-neutral-200 relative min-h-[360px]">
            {bat.imageUrl && !imgError ? (
              <img
                src={bat.imageUrl}
                alt={bat.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-80 object-contain mix-blend-multiply"
              />
            ) : (
              <CricketBatIllustration bat={bat} className="w-full h-80" />
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="bg-[#f15b28] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                {bat.willowType}
              </span>
              {bat.isNew && (
                <span className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  New Arrival
                </span>
              )}
            </div>

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

          {/* Right Column: Specifications & Configuration */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#f15b28]">
                {bat.series} · {bat.range} Range
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1 leading-tight">
                {bat.name}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-neutral-900 font-mono">
                  ₹{formatINR(totalPrice)}/-
                </span>
                <span className="text-sm text-neutral-400 line-through font-mono">
                  MRP ₹{formatINR(bat.mrp)}
                </span>
                <span className="text-xs font-bold text-[#f15b28] bg-[#fdf4f1] px-2 py-0.5 rounded border border-[#f8cdbf]">
                  {bat.discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">Inclusive of all taxes & free insured delivery</p>

              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {bat.shortDesc}
              </p>
            </div>

            {/* Authentic Bat Craftsmanship Specifications */}
            <div className="bg-neutral-50 rounded-lg p-3.5 border border-neutral-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 border-b border-neutral-200 pb-1.5">
                <Info className="w-3.5 h-3.5 text-[#f15b28]" />
                <span>Craftsmanship & Blade Specifications</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Grain Count:</span>
                  <span className="font-bold text-neutral-800">{bat.grainCount}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Edge Profile:</span>
                  <span className="font-bold text-neutral-800">{bat.edgeThickness}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Weight Range:</span>
                  <span className="font-bold text-neutral-800">{bat.weightRange}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Sweet Spot:</span>
                  <span className="font-bold text-neutral-800">{bat.sweetSpot}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500 block text-[11px]">Handle Construction:</span>
                  <span className="font-medium text-neutral-800">{bat.handleType}</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-2">
                <span>Select Bat Size:</span>
                <span className="text-neutral-500 font-normal">Active: Size {selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {bat.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#f15b28] text-white border-[#f15b28] shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-on: Professional Machine Knocking & Oiling */}
            <label className="flex items-start gap-3 p-3 bg-amber-50/60 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors select-none">
              <input
                type="checkbox"
                checked={withKnocking}
                onChange={(e) => setWithKnocking(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#f15b28] rounded border-neutral-300 focus:ring-[#f15b28] accent-[#f15b28]"
              />
              <div className="text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    Add Pro Machine Knocking & Oiling (+₹799)
                  </span>
                </div>
                <p className="text-neutral-600 text-[11px] mt-0.5">
                  15,000 pneumatic machine knocks, raw linseed oiling, fitted anti-scuff sheet, and protective edge tape. Ready for match play!
                </p>
              </div>
            </label>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 bg-[#f15b28] hover:bg-[#c93c0d] text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{formatINR(totalPrice)}</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/919217679479?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Bat Expert</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
