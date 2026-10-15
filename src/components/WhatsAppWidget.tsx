import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Scale, PhoneCall } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const quickPrompts = [
    'Can you show the 7T7T Black Monster on weighing scale?',
    'Is the 957g Grey Edition bat ready for dispatch?',
    'Can we arrange a WhatsApp video call to pick my bat?',
    'I want to order 7T7T One Side Hero with Cash on Delivery.',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || userMessage;
    if (!text.trim()) return;

    const encoded = encodeURIComponent(
      `Hello Cricket Adda! ${text}`
    );
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setUserMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Consultation Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  7T
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Cricket Adda Bat Workshop</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <span>Helpline: +91 {SELLER_INFO.primaryPhone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] space-y-3 max-h-80 overflow-y-auto">
            {/* Seller Automated Greeting */}
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-neutral-800 space-y-1 max-w-[85%]">
              <p className="font-semibold text-[#075E54]">7T7T Bat Specialist</p>
              <p>
                Namaste! Welcome to Cricket Adda. We handcraft specialized scooped tennis cricket bats: <strong>Gold Edition</strong>, <strong>Black Monster</strong>, <strong>Grey Edition (957g)</strong>, and <strong>One Side Hero</strong>.
              </p>
              <p className="text-[10px] text-neutral-500 pt-1">
                Ask us for live video call inspection or weighing scale pictures before ordering!
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-neutral-500 px-1">
                Quick Questions:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2 bg-white/90 hover:bg-white text-neutral-800 text-xs rounded-lg border border-neutral-200/60 shadow-xs transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about weight, bat model, COD..."
              className="flex-1 px-3 py-2 bg-neutral-100 rounded-full text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#075E54]"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1fb855] transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 py-3 px-4 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="text-xs font-bold hidden sm:inline">
          Order on WhatsApp (8669937070)
        </span>
      </button>
    </div>
  );
};
