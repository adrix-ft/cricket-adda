import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
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

    const encoded = encodeURIComponent(`Hello Cricket Adda! ${text}`);
    window.open(`https://wa.me/${SELLER_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setUserMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Consultation Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Header */}
          <div className="bg-neutral-950 text-white p-3.5 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                CA
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Cricket Adda Workshop</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-neutral-400">Online · +91 {SELLER_INFO.primaryPhone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-neutral-50/70 space-y-1.5 max-h-56 sm:max-h-64 overflow-y-auto">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-0.5">
              <Sparkles className="w-3 h-3 text-[#f15b28]" strokeWidth={1.75} />
              <span>Quick Inquiry</span>
            </div>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-2.5 bg-white hover:bg-neutral-100/90 text-neutral-700 text-xs rounded-xl border border-neutral-200/80 transition-colors cursor-pointer touch-manipulation font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-neutral-200/80 flex items-center gap-1.5">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your inquiry..."
              className="flex-1 px-3 py-1.5 bg-neutral-100 rounded-lg text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 font-medium"
            />
            <button
              onClick={() => handleSend()}
              className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer shrink-0 touch-manipulation"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}

      {/* Sleek Floating Circular Action Button with Lucide MessageCircle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-neutral-900 hover:bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer relative touch-manipulation border border-neutral-700/60"
        title="WhatsApp Workshop"
        aria-label="Open WhatsApp live inquiry"
      >
        <MessageCircle className="w-5 h-5 text-emerald-400" strokeWidth={1.75} />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </span>
      </button>
    </div>
  );
};
