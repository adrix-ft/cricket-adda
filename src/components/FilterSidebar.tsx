import React, { useState } from 'react';
import {
  RotateCcw,
  Scale,
  Phone,
  MessageCircle,
  Check,
  Layers,
  Crown,
  ShieldAlert,
  Feather,
  Target,
  Flame,
  CircleDot,
  Circle,
  Box,
  Sparkles,
  Sliders,
} from 'lucide-react';
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

  const models: {
    label: string;
    value: BatCategory;
    count: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { label: 'All Bats', value: 'All', count: '4', icon: Layers },
    { label: '7T7T Gold', value: '7T7T Gold Edition', count: '1', icon: Crown },
    { label: 'Black Monster', value: 'Black Monster', count: '1', icon: ShieldAlert },
    { label: 'Grey Edition', value: 'Grey Edition', count: '1', icon: Feather },
    { label: 'One Side Hero', value: 'One Side Hero', count: '1', icon: Target },
  ];

  const weightClasses: {
    label: string;
    value: BatWeightClass;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { label: 'All Weights', value: 'All', icon: Layers },
    { label: '< 980g (Light)', value: 'Under 980g', icon: Feather },
    { label: '1000g – 1035g', value: '1000g - 1035g', icon: Scale },
    { label: '1040g+ (Power)', value: '1040g+', icon: Flame },
  ];

  const ballTypes: {
    label: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { label: 'All', icon: Sparkles },
    { label: 'Hard Tennis', icon: CircleDot },
    { label: 'Light Tennis', icon: Circle },
    { label: 'Box Cricket', icon: Box },
  ];

  const handleApplyPrice = () => {
    const min = Math.max(400, Math.min(minInput, maxInput - 200));
    const max = Math.min(4500, Math.max(maxInput, minInput + 200));
    setMinInput(min);
    setMaxInput(max);
    onPriceChange(min, max);
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-3.5">
      {/* Header */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.75} />
          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Filters
          </span>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-[11px] font-semibold text-neutral-500 hover:text-[#f15b28] flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={1.75} />
            <span>Reset</span>
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
            const Icon = m.icon;
            return (
              <button
                key={m.value}
                onClick={() => onSelectModel(m.value)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-[#f15b28]' : 'text-neutral-400'
                    }`}
                    strokeWidth={1.75}
                  />
                  <span>{m.label}</span>
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isSelected ? 'text-white/70' : 'text-neutral-400'
                  }`}
                >
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
          Weight Class
        </span>
        <div className="space-y-1">
          {weightClasses.map((w) => {
            const isSelected = selectedWeightClass === w.value;
            const Icon = w.icon;
            return (
              <button
                key={w.value}
                onClick={() => onSelectWeightClass(w.value)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-[#f15b28]' : 'text-neutral-400'
                    }`}
                    strokeWidth={1.75}
                  />
                  <span>{w.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={2} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Ball */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Ball Suitability
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {ballTypes.map((b) => {
            const isSelected = selectedBallType === b.label;
            const Icon = b.icon;
            return (
              <button
                key={b.label}
                onClick={() => onSelectBallType(b.label)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-200/60'
                }`}
              >
                <Icon
                  className={`w-3 h-3 ${
                    isSelected ? 'text-[#f15b28]' : 'text-neutral-400'
                  }`}
                  strokeWidth={1.75}
                />
                <span className="truncate">{b.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Slider */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Price Range (₹)
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <input
            type="number"
            value={minInput}
            onChange={(e) => setMinInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 text-center text-xs font-semibold focus:outline-none focus:border-[#f15b28]"
            step="100"
          />
          <span className="text-neutral-400 font-sans">-</span>
          <input
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(Number(e.target.value))}
            className="w-full px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 text-center text-xs font-semibold focus:outline-none focus:border-[#f15b28]"
            step="100"
          />
          <button
            onClick={handleApplyPrice}
            className="w-8 h-8 shrink-0 bg-neutral-900 hover:bg-black text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors touch-manipulation"
            title="Apply Filter"
            aria-label="Apply price filter"
          >
            <Check className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* 5. Minimalist Workshop Contact Card */}
      <div className="p-3.5 rounded-2xl bg-neutral-900 text-white space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Bat Workshop
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <p className="text-[11px] text-neutral-300 leading-snug">
          Looking for a specific gram weight or live video call verification?
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <a
            href={`https://wa.me/${SELLER_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            title="WhatsApp Workshop"
          >
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Chat</span>
          </a>
          <a
            href={`tel:${SELLER_INFO.primaryPhone}`}
            className="py-1.5 px-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            title="Call Workshop"
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Call</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
