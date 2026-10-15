import React from 'react';
import { X, MapPin, Phone, Mail, Clock, Award, ShieldCheck, Scale, Video } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

interface InfoModalProps {
  type: 'about' | 'contact' | 'dealership' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#fdf4f1] text-[#f15b28] rounded-full flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">About 7T7T Bats & Cricket Adda</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Cricket Adda is a dedicated direct-from-workshop manufacturer of premium scooped tennis cricket bats under the <strong>7T7T</strong> banner. Built for hard tennis tournaments, box cricket, and open-ground power hitters, every piece is shaped, scooped, and balanced by our master craftsmen.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">950g–1065g</span>
                <span className="text-neutral-500 text-[11px]">Precision Calibrated Weights</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">10,000+</span>
                <span className="text-neutral-500 text-[11px]">Bats Delivered Pan-India</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free heavy padded 7T7T bat cover with every order!</span>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Contact 7T7T Workshop</h3>
            <p className="text-xs text-neutral-600">
              Speak directly with our bat maker to pick your preferred weight, discuss scooping styles, or request a live video call.
            </p>
            <div className="space-y-2.5 text-xs pt-1">
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Helpline: <strong>+91 {SELLER_INFO.primaryPhone}</strong></span>
              </a>
              <a
                href={`tel:${SELLER_INFO.secondaryPhone}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#f15b28]" />
                <span>Alternate Calling Line: <strong>+91 {SELLER_INFO.secondaryPhone}</strong></span>
              </a>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>Workshop Hours: 9:00 AM to 9:00 PM IST (All 7 Days)</span>
              </div>
            </div>
          </div>
        )}

        {type === 'dealership' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Direct Workshop & Wholesale</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We cater to both individual tournament cricketers and sports store retailers looking for bulk wholesale supply of 7T7T Gold Edition, Black Monster, Grey Edition, and One Side Hero bats.
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
              <p className="font-bold text-neutral-800">Wholesale / Team Inquiries:</p>
              <p className="text-neutral-600">Contact: +91 {SELLER_INFO.primaryPhone} / +91 {SELLER_INFO.secondaryPhone}</p>
              <p className="text-neutral-500 text-[11px]">Special team discounts for batch orders of 5+ bats.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
