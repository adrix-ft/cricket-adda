import React, { useState } from 'react';
import { RotateCcw, Scale, Phone, MessageCircle, Check } from 'lucide-react';
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
  onResetFilters,
  activeFilterCount,
}) => {
  const [minInput, setMinInput] = useState<number>(priceRange[0]);
  const [maxInput, setMaxInput] = useState<number>(priceRange[1]);

  const models: { label: string; value: BatCategory; count: string; symbol: string }[] = [
    { label: 'All', value: 'All', count: '4', symbol: '✦' },
    { label: '7T7T Gold', value: '7T7T Gold Edition', count: '1', symbol: '👑' },
    { label: 'Black Monster', value: 'Black Monster', count: '1', symbol: '🖤' },
    { label: 'Grey Edition', value: 'Grey Edition', count: '1', symbol: '⚡' },
    { label: 'One Side Hero', value: 'One Side Hero', count: '1', symbol: '🎯' },
  ];

  const weightClasses: { label: string; value: BatWeightClass; icon: string }[] = [
    { label: 'All Weights', value: 'All', icon: '✦' },
    { label: '< 980g (Light)', value: 'Under 980g', icon: '⚡' },
    { label: '1000g – 1035g', value: '1000g - 1035g', icon: '⚖️' },
    { label: '1040g+ (Power)', value: '1040g+', icon: '💥' },
  ];

  const ballTypes = [
    { label: 'All', icon: '✦' },
    { label: 'Hard Tennis', icon: '🎾' },
    { label: 'Light Tennis', icon: '🏏' },
    { label: 'Box Cricket', icon: '📦' },
  ];

  const handleApplyPrice = () => {
    const min = Math.max(400, Math.min(minInput, maxInput - 200));
    const max = Math.min(4500, Math.max(maxInput, minInput + 200));
    setMinInput(min);
    setMaxInput(max);
    onPriceChange(min, max);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      {/* Header */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 flex items-center justify-between">
        <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Filter
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="w-6 h-6 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 1. Model Selection */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Model
        </span>
        <div className="space-y-1">
          {models.map((m) => {
            const isSelected = selectedModel === m.value;
            return (
              <button
                key={m.value}
                onClick={() => onSelectModel(m.value)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[11px] opacity-75">{m.symbol}</span>
                  <span>{m.label}</span>
                </span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-white/60' : 'text-neutral-400'}`}>
                  {m.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weight */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Weight
        </span>
        <div className="space-y-1">
          {weightClasses.map((w) => {
            const isSelected = selectedWeightClass === w.value;
            return (
              <button
                key={w.value}
                onClick={() => onSelectWeightClass(w.value)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[11px]">{w.icon}</span>
                  <span>{w.label}</span>
                </span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Ball */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Ball
        </span>
        <div className="grid grid-cols-2 gap-1">
          {ballTypes.map((b) => {
            const isSelected = selectedBallType === b.label;
            return (
              <button
                key={b.label}
                onClick={() => onSelectBallType(b.label)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                <span className="text-[10px]">{b.icon}</span>
                <span className="truncate">{b.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Slider */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Price (₹)
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <input
            type="number"
            value={minInput}
            onChange={(e) => setMinInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 text-center text-[16px] sm:text-xs font-bold focus:outline-none focus:border-[#f15b28]"
            step="100"
          />
          <span className="text-neutral-400">-</span>
          <input
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 text-center text-[16px] sm:text-xs font-bold focus:outline-none focus:border-[#f15b28]"
            step="100"
          />
          <button
            onClick={handleApplyPrice}
            className="w-8 h-8 shrink-0 bg-neutral-900 hover:bg-black text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors touch-manipulation"
            title="Apply"
            aria-label="Apply price filter"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Minimalist Workshop Contact Card */}
      <div className="p-3.5 rounded-2xl bg-neutral-900 text-white space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Workshop
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <p className="text-[11px] text-neutral-300">
          Want a specific weight or video call verification?
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            title="WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat</span>
          </a>
          <a
            href={`tel:${SELLER_INFO.primaryPhone}`}
            className="py-1.5 px-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            title="Call"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
