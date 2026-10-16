import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Scale, ArrowRight } from 'lucide-react';
import { CricketBat } from '../types/bat';
import { CricketBatIllustration } from './CricketBatIllustration';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: CricketBat[];
  onRemoveFromWishlist: (bat: CricketBat) => void;
  onMoveToCart: (bat: CricketBat) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200/80 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/70 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900 leading-tight">
                  Saved Bats ({wishlist.length})
                </h2>
                <p className="text-[11px] text-neutral-500 font-medium">
                  Your curated collection of Cricket Adda bats
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors cursor-pointer"
              aria-label="Close saved bats"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* List */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-2.5">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <Heart className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-neutral-800">No Saved Bats</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any bat in the catalog to pin it here for easy comparison.
                </p>
              </div>
            ) : (
              wishlist.map((bat) => (
                <div
                  key={bat.id}
                  className="flex gap-3 p-3 bg-neutral-50/70 rounded-xl border border-neutral-200/80 relative items-center"
                >
                  <div className="w-16 h-20 bg-white rounded-lg border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    {bat.imageUrl ? (
                      <img
                        src={bat.imageUrl}
                        alt={bat.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <CricketBatIllustration bat={bat} className="w-12 h-16" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9.5px] font-bold text-neutral-400 uppercase tracking-wider">{bat.model}</span>
                    <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                      {bat.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5 font-medium">
                      <Scale className="w-3 h-3 text-[#f15b28]" strokeWidth={1.75} />
                      <span>{bat.weightRange}</span>
                    </span>
                    <span className="text-xs font-bold text-neutral-950 font-mono mt-1 block">
                      ₹{formatINR(bat.finalPrice)}/-
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onMoveToCart(bat);
                        onRemoveFromWishlist(bat);
                      }}
                      className="p-2 bg-neutral-900 hover:bg-black text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                      title="Move to Bag"
                      aria-label="Move to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(bat)}
                      className="p-2 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
