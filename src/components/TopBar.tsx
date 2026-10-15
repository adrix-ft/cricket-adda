import React, { useState } from 'react';
import { Phone, MapPin, ChevronDown, Check } from 'lucide-react';

interface TopBarProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenDealership: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenDealership,
}) => {
  const [currency, setCurrency] = useState('INR');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencies = ['INR (₹)', 'USD ($)', 'GBP (£)', 'AED (د.إ)', 'AUD (A$)'];

  return (
    <div className="bg-[#f15b28] text-white text-xs font-medium tracking-wide">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left: Direct WhatsApp Helpline */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919217679479?text=Hi%20Cricket%20Adda,%20I'm%20looking%20for%20a%20cricket%20bat%20recommendation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">WhatsApp Expert Helpline:</span>
            <span className="font-bold underline decoration-white/40 underline-offset-2">+91 92176 79479</span>
          </a>
        </div>

        {/* Right: Quick Links & Currency */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenAbout}
            className="hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={onOpenContact}
            className="hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={onOpenDealership}
            className="hidden sm:flex items-center gap-1 hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-white/80" />
            <span>Locate Dealership</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors cursor-pointer font-bold"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showCurrencyDropdown && (
              <div
                className="absolute right-0 mt-1 w-32 bg-white text-[#24201e] rounded shadow-lg border border-neutral-200 py-1 z-50 text-xs font-semibold"
                onMouseLeave={() => setShowCurrencyDropdown(false)}
              >
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c.split(' ')[0]);
                      setShowCurrencyDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-100 flex items-center justify-between"
                  >
                    <span>{c}</span>
                    {currency === c.split(' ')[0] && <Check className="w-3 h-3 text-[#f15b28]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
