import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
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
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <h2 className="text-base font-bold text-neutral-900">
                Saved Bats ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-neutral-800">No Bats Saved Yet</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any bat in the catalog to save it to your wishlist.
                </p>
              </div>
            ) : (
              wishlist.map((bat) => (
                <div
                  key={bat.id}
                  className="flex gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 relative items-center"
                >
                  <div className="w-16 h-20 bg-white rounded border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    {bat.imageUrl ? (
                      <img
                        src={bat.imageUrl}
                        alt={bat.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <CricketBatIllustration bat={bat} className="w-12 h-16" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {bat.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 block">{bat.willowType}</span>
                    <span className="text-xs font-bold text-[#f15b28] font-mono mt-1 block">
                      ₹{formatINR(bat.finalPrice)}/-
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onMoveToCart(bat);
                        onRemoveFromWishlist(bat);
                      }}
                      className="p-2 bg-[#f15b28] hover:bg-[#c93c0d] text-white rounded shadow-xs transition-colors cursor-pointer"
                      title="Move to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(bat)}
                      className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
