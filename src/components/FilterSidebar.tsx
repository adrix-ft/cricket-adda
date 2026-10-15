import React, { useState } from 'react';
import { RotateCcw, Scale, Shield, Phone, MessageCircle } from 'lucide-react';
import { BatCategory, BatWeightClass, SortOption } from '../types/bat';
import { SELLER_INFO } from '../data/bats';

interface FilterSidebarProps {
  selectedModel: BatCategory;
  onSelectModel: (model: BatCategory) => void;
  selectedWeightClass: BatWeightClass;
  onSelectWeightClass: (weight: BatWeightClass) => void;
  selectedBallType: string;
  onSelectBallType: (ball: string) => void;
  priceRange: [number, number];
  onPriceChange: (min: number, max: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedModel,
  onSelectModel,
  selectedWeightClass,
  onSelectWeightClass,
  selectedBallType,
  onSelectBallType,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onResetFilters,
  activeFilterCount,
}) => {
  const [minInput, setMinInput] = useState<number>(priceRange[0]);
  const [maxInput, setMaxInput] = useState<number>(priceRange[1]);

  const models: { label: string; value: BatCategory; count: string }[] = [
    { label: 'All Bats', value: 'All', count: '6' },
    { label: '7T7T Gold Edition', value: '7T7T Gold Edition', count: '1' },
    { label: 'Black Monster', value: 'Black Monster', count: '2' },
    { label: 'Grey Edition', value: 'Grey Edition', count: '2' },
    { label: 'One Side Hero', value: 'One Side Hero', count: '1' },
  ];

  const weightClasses: { label: string; value: BatWeightClass; desc: string }[] = [
    { label: 'All Weights', value: 'All', desc: '950g to 1065g' },
    { label: 'Under 980g', value: 'Under 980g', desc: 'Featherlight (957g / 974g on scale)' },
    { label: '1000g - 1035g', value: '1000g - 1035g', desc: 'Balanced Power & Pickup' },
    { label: '1040g+', value: '1040g+', desc: 'Heavy Monster Power (1065g tag)' },
  ];

  const ballTypes = ['All', 'Hard Tennis', 'Light Tennis', 'Box Cricket'];

  const handleApplyPrice = () => {
    const min = Math.max(400, Math.min(minInput, maxInput - 200));
    const max = Math.min(4500, Math.max(maxInput, minInput + 200));
    setMinInput(min);
    setMaxInput(max);
    onPriceChange(min, max);
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-5">
      {/* Filter Header */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wide">
            Filter Bats
          </h2>
          <span className="text-[11px] text-neutral-500">
            {activeFilterCount > 0 ? `${activeFilterCount} active filters` : 'Handcrafted 7T7T range'}
          </span>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-bold text-[#f15b28] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Bat Model Selection */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Bat Model
        </h3>
        <div className="space-y-1.5">
          {models.map((m) => {
            const isSelected = selectedModel === m.value;
            return (
              <button
                key={m.value}
                onClick={() => onSelectModel(m.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#f15b28] text-white shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{m.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {m.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight Class */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#f15b28]" />
            <span>Weight Range</span>
          </h3>
        </div>
        <div className="space-y-1.5">
          {weightClasses.map((w) => {
            const isSelected = selectedWeightClass === w.value;
            return (
              <button
                key={w.value}
                onClick={() => onSelectWeightClass(w.value)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#f15b28] bg-orange-50 text-neutral-900 font-bold'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{w.label}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#f15b28]" />}
                </div>
                <div className="text-[10px] text-neutral-500 font-normal mt-0.5">
                  {w.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Ball Compatibility */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Ball Type
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {ballTypes.map((b) => {
            const isSelected = selectedBallType === b;
            return (
              <button
                key={b}
                onClick={() => onSelectBallType(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Filter */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Price Range (₹)
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <input
            type="number"
            value={minInput}
            onChange={(e) => setMinInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-800 text-center font-mono font-bold"
            step="100"
          />
          <span className="text-neutral-400">to</span>
          <input
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-800 text-center font-mono font-bold"
            step="100"
          />
        </div>
        <button
          onClick={handleApplyPrice}
          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-xs font-bold transition-colors cursor-pointer"
        >
          Apply Price Filter
        </button>
      </div>

      {/* 5. Direct Local Seller Contact Box */}
      <div className="bg-gradient-to-br from-[#1c1917] to-[#292524] text-white p-4 rounded-xl shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#f15b28] flex items-center justify-center text-white">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">
              Direct Seller Contact
            </h4>
            <span className="text-[10px] text-neutral-300">Talk directly to bat crafter</span>
          </div>
        </div>

        <p className="text-[11px] text-neutral-300 leading-relaxed">
          Need a specific bat weight (e.g. exactly 957g or 1065g)? Message directly for live video call inspection.
        </p>

        <div className="space-y-1.5 pt-1">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20select%20a%207T7T%20bat%20with%20custom%20weight.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: 8669937070</span>
          </a>
          <a
            href={`tel:${SELLER_INFO.secondaryPhone}`}
            className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: 9619955576</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
