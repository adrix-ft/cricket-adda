import React from 'react';
import { X, MapPin, Phone, Mail, Clock, Award, ShieldCheck } from 'lucide-react';

interface InfoModalProps {
  type: 'about' | 'contact' | 'dealership' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200">
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
            <h3 className="text-xl font-bold text-neutral-900">About Cricket Adda</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Founded by master bat-crafters, Cricket Adda has stood as India's benchmark for bespoke, player-grade cricket bats. We hand-select genuine Grade 1 English willow from top British mills and seasoned Kashmir willow clefts from the Jhelum valley.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">25+</span>
                <span className="text-neutral-500 text-[11px]">Years of Handcrafting</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="font-bold text-neutral-900 block text-lg font-mono">150,000+</span>
                <span className="text-neutral-500 text-[11px]">Cricketers Geared</span>
              </div>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Contact Cricket Adda</h3>
            <p className="text-xs text-neutral-600">
              Have questions regarding willow cleft grain selection, bat weight customization, or bulk team orders? Speak directly to our master craftsmen.
            </p>
            <div className="space-y-2.5 text-xs pt-1">
              <a
                href="https://wa.me/919217679479"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Helpline: <strong>+91 92176 79479</strong></span>
              </a>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700">
                <Mail className="w-4 h-4 text-[#f15b28]" />
                <span>Email: support@cricketadda.in</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>Working Hours: Mon - Sat, 9:30 AM to 8:00 PM IST</span>
              </div>
            </div>
          </div>
        )}

        {type === 'dealership' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Locate Cricket Adda Dealership</h3>
            <p className="text-xs text-neutral-600">
              Test and pick up your balanced handcrafted cricket bat at our authorized flagship experience studios across India:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Delhi NCR Experience Center</span>
                <span className="text-neutral-500 text-[11px]">Sector 18, Sports Hub, Noida, UP 201301</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Mumbai Cricket Lounge</span>
                <span className="text-neutral-500 text-[11px]">Opposite Wankhede Pavilion, Marine Lines, Mumbai 400020</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Bangalore Bat Lab</span>
                <span className="text-neutral-500 text-[11px]">Koramangala 4th Block, Bengaluru, Karnataka 560034</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400">
              For dealership inquiries in your city, WhatsApp us at +91 92176 79479.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
