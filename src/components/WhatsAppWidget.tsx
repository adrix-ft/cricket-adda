import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { SELLER_INFO } from '../data/bats';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const quickPrompts = [
    'Live scale photo of 957g Grey Edition?',
    'Show Black Monster weights (1040g–1065g)?',
    'Schedule a video call to inspect my bat?',
    'Do you provide Cash on Delivery (COD)?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || userMessage;
    if (!text.trim()) return;

    const encoded = encodeURIComponent(`Hello 7T7T! ${text}`);
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setUserMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Consultation Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Header */}
          <div className="bg-neutral-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">
                7T
              </div>
              <div>
                <h4 className="text-xs font-bold">7T7T Workshop</h4>
                <span className="text-[10px] text-emerald-400">Online · +91 {SELLER_INFO.primaryPhone}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-neutral-50 space-y-1.5 max-h-64 overflow-y-auto">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
              Quick Inquiry
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-2 bg-white hover:bg-neutral-100 text-neutral-700 text-xs rounded-xl border border-neutral-200 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-1.5">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type message..."
              className="flex-1 px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
            />
            <button
              onClick={() => handleSend()}
              className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sleek Floating Circular Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer relative"
        title="WhatsApp Workshop"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </span>
      </button>
    </div>
  );
};
