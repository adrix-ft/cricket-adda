import React from 'react';
import { X, MapPin, Phone, Clock, Award, ShieldCheck, Scale, Video, MessageCircle } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

interface InfoModalProps {
  type: 'about' | 'contact' | 'dealership' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <div className="w-11 h-11 bg-neutral-100 text-[#f15b28] rounded-xl flex items-center justify-center border border-neutral-200/80">
              <Award className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-display">About Cricket Adda Bats</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Cricket Adda is a dedicated direct-from-workshop manufacturer of premium scooped tennis cricket bats. Built for hard tennis tournaments, box cricket, and open-ground power hitters, every piece is shaped, scooped, and balanced by our master craftsmen.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">950g–1065g</span>
                <span className="text-neutral-500 text-[11px] font-medium">Precision Calibrated Weights</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">10,000+</span>
                <span className="text-neutral-500 text-[11px] font-medium">Bats Delivered Pan-India</span>
              </div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
              <span className="font-medium">Free heavy padded Cricket Adda bat cover with every order!</span>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center border border-emerald-200">
              <Phone className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-display">Contact Cricket Adda Workshop</h3>
            <p className="text-xs text-neutral-600 font-medium">
              Speak directly with our bat maker to pick your preferred weight, discuss scooping styles, or request a live video call.
            </p>
            <div className="space-y-2 text-xs pt-1">
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200/80 font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                <span>WhatsApp Helpline: <strong>+91 {SELLER_INFO.primaryPhone}</strong></span>
              </a>
              <a
                href={`tel:${SELLER_INFO.primaryPhone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 hover:bg-neutral-100 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-[#f15b28]" strokeWidth={1.75} />
                <span>Direct Calling Line: <strong>+91 {SELLER_INFO.primaryPhone}</strong></span>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium">
                <Clock className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                <span>Workshop Hours: 9:00 AM to 9:00 PM IST (All 7 Days)</span>
              </div>
            </div>
          </div>
        )}

        {type === 'dealership' && (
          <div className="space-y-4">
            <div className="w-11 h-11 bg-neutral-100 text-neutral-800 rounded-xl flex items-center justify-center border border-neutral-200">
              <MapPin className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 font-display">Direct Workshop & Wholesale</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              We cater to both individual tournament cricketers and sports store retailers looking for bulk wholesale supply of 7T7T Gold Edition, Black Monster, Grey Edition, and One Side Hero bats.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
              <p className="font-bold text-neutral-800">Wholesale / Team Inquiries:</p>
              <p className="text-neutral-600">WhatsApp / Call: +91 {SELLER_INFO.primaryPhone}</p>
              <p className="text-neutral-500 text-[11px]">Special team discounts for batch orders of 5+ bats.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
