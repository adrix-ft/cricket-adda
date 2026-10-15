import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, CheckCheck } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const WHATSAPP_PHONE = '919217679479';
  const DISPLAY_PHONE = '+91 92176 79479';

  const quickPrompts = [
    'Can you send live photos of English willow grains?',
    'What is the lightest Mens size bat in stock?',
    'I want to inquire about custom machine knocking service.',
    'Which bat is recommended for T20 leather ball matches?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || userMessage;
    if (!text.trim()) return;

    const encoded = encodeURIComponent(
      `Hello Cricket Adda! ${text}`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
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
                  CA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Cricket Adda Bat Specialist</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <span>Helpline: {DISPLAY_PHONE}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] space-y-3 max-h-80 overflow-y-auto">
            {/* Incoming Specialist Message */}
            <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-xs max-w-[85%] text-xs text-neutral-800 space-y-1">
              <p className="font-semibold text-[#075E54] text-[11px]">
                Cricket Adda Workshop Team
              </p>
              <p>
                Namaste! Need help selecting the right bat cleft, checking weight in grams, or inspecting grain photos?
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-400">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                Tap to ask our bat makers:
              </span>
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-xs bg-white hover:bg-neutral-50 text-neutral-800 p-2 rounded-md border border-neutral-200 transition-colors cursor-pointer shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-xs px-3 py-2 border border-neutral-300 rounded-full focus:outline-none focus:border-[#075E54]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full transition-colors cursor-pointer"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-1.5 bg-neutral-100 text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1 border-t border-neutral-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Direct verified response from 92176 79479</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Contact Cricket Adda on WhatsApp"
        title="Chat with Cricket Adda on WhatsApp (+91 92176 79479)"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366]" />

        {/* Pulsating Online Status indicator */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
      </button>
    </div>
  );
};
