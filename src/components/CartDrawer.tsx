import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, Scale, Phone } from 'lucide-react';
import { CartItem } from '../types/bat';
import { SELLER_INFO } from '../data/bats';
import { CricketBatIllustration } from './CricketBatIllustration';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  const subtotal = items.reduce((acc, item) => {
    return acc + item.bat.finalPrice * item.quantity;
  }, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  const generateWhatsAppOrderSummary = () => {
    const batList = items
      .map(
        (it) =>
          `• ${it.bat.name} (Weight: ${it.selectedWeight}) x${it.quantity} = ₹${formatINR(
            it.bat.finalPrice * it.quantity
          )}`
      )
      .join('\n');

    return encodeURIComponent(
      `Hello Cricket Adda! I want to confirm my order:\nOrder ID: ${orderId}\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}\n\nItems:\n${batList}\n\nTotal: ₹${formatINR(
        subtotal
      )}/-\nPlease share video call timing before dispatch.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <p className="text-[11px] text-neutral-500">
                Direct dispatch from Cricket Adda Bat Workshop
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
            {orderConfirmed ? (
              /* Post-Order Success Screen */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Order Placed!</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Order Reference: <span className="font-mono font-bold text-neutral-800">{orderId}</span>
                  </p>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl text-left text-xs space-y-2 border border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer:</span>
                    <span className="font-semibold text-neutral-800">{customerName || 'Cricket Adda Player'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-semibold text-neutral-800">{customerPhone || SELLER_INFO.displayPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total Payable:</span>
                    <span className="font-bold text-[#f15b28]">₹{formatINR(subtotal)}/-</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-neutral-200">
                    <span>Free Gift:</span>
                    <span>Cricket Adda Padded Bat Cover (Included)</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Our bat craftsman will contact you for a quick WhatsApp video call to inspect your piece before packing.
                </p>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${generateWhatsAppOrderSummary()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order to WhatsApp ({SELLER_INFO.primaryPhone})</span>
                  </a>

                  <button
                    onClick={handleFinish}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Continue Browsing Bats
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Simulated Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-3 py-2">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <h3 className="text-sm font-bold text-neutral-900">Delivery Details</h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#f15b28] hover:underline"
                  >
                    Back to Bag
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohit Sharma"
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-[16px] sm:text-xs focus:outline-none focus:border-[#f15b28]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-[16px] sm:text-xs focus:outline-none focus:border-[#f15b28]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase">
                    Delivery Address & Pincode *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Full street address, city, state and PIN code"
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-[16px] sm:text-xs focus:outline-none focus:border-[#f15b28]"
                  />
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>Order Amount:</span>
                    <span>₹{formatINR(subtotal)}/-</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Free Padded Cricket Adda Bat Cover + Video Inspection Included</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#f15b28] hover:bg-[#c93c0d] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer mt-4 shadow-md"
                >
                  Confirm Order · ₹{formatINR(subtotal)}
                </button>
              </form>
            ) : items.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-800">Your Bag is Empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our handcrafted Cricket Adda tennis cricket bats - 7T7T Gold Edition, Black Monster, Grey Edition, and One Side Hero!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-[#f15b28] text-white text-xs font-bold rounded-full hover:bg-[#c93c0d] transition-colors cursor-pointer"
                >
                  Browse Cricket Adda Bats
                </button>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-3">
                {items.map((item, idx) => {
                  return (
                    <div
                      key={`${item.bat.id}-${item.selectedWeight}-${idx}`}
                      className="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 relative"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-white rounded-lg border border-neutral-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {item.bat.imageUrl ? (
                          <img
                            src={item.bat.imageUrl}
                            alt={item.bat.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <CricketBatIllustration bat={item.bat} className="w-12 h-16" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 truncate">
                            {item.bat.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500">
                            <span className="flex items-center gap-1 font-semibold text-neutral-700">
                              <Scale className="w-3 h-3 text-[#f15b28]" />
                              <span>Weight: {item.selectedWeight}</span>
                            </span>
                          </div>
                          {item.bat.freeCover && (
                            <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                              + Free Cricket Adda Cover
                            </span>
                          )}
                        </div>

                        {/* Price & Steppers */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-neutral-900 font-mono">
                            ₹{formatINR(item.bat.finalPrice * item.quantity)}
                          </span>

                          <div className="flex items-center gap-1 border border-neutral-300 rounded-lg bg-white px-1">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer touch-manipulation"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1 font-mono min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer touch-manipulation"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-2 cursor-pointer touch-manipulation"
                        title="Remove"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {!orderConfirmed && items.length > 0 && !isCheckingOut && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-neutral-900">
                    ₹{formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Free Cricket Adda Bat Cover</span>
                  <span className="text-emerald-600 font-bold">INCLUDED</span>
                </div>
                <div className="flex justify-between">
                  <span>Pan-India Courier</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-bold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="text-[#f15b28] font-mono">₹{formatINR(subtotal)}/-</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-[#f15b28] hover:bg-[#c93c0d] text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Cricket Adda Direct Guarantee · Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
