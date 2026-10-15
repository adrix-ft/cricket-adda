import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { BatRange, BatSize, SortOption, WillowType } from '../types/bat';

interface FilterSidebarProps {
  selectedSizes: BatSize[];
  onToggleSize: (size: BatSize) => void;
  selectedWillowTypes: WillowType[];
  onToggleWillow: (willow: WillowType) => void;
  selectedRanges: BatRange[];
  onToggleRange: (range: BatRange) => void;
  priceRange: [number, number];
  onPriceChange: (min: number, max: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedSizes,
  onToggleSize,
  selectedWillowTypes,
  onToggleWillow,
  selectedRanges,
  onToggleRange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onResetFilters,
  activeFilterCount,
}) => {
  // Accordion state
  const [openSections, setOpenSections] = useState({
    size: true,
    willow: true,
    range: true,
    price: true,
    sort: true,
  });

  // Local draft price inputs
  const [minInput, setMinInput] = useState<number>(priceRange[0]);
  const [maxInput, setMaxInput] = useState<number>(priceRange[1]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApplyPrice = () => {
    const min = Math.max(2555, Math.min(minInput, maxInput - 500));
    const max = Math.min(129999, Math.max(maxInput, minInput + 500));
    setMinInput(min);
    setMaxInput(max);
    onPriceChange(min, max);
  };

  const allSizes: BatSize[] = ['1', '2', '3', '4', '5', '6', 'Harrow', 'Mens', 'Compact'];

  const willowOptions: { type: WillowType; count: number }[] = [
    { type: 'English Willow', count: 104 },
    { type: 'Kashmir Willow', count: 65 },
    { type: 'Incredible Willow', count: 3 },
  ];

  const rangeOptions: BatRange[] = [
    'INTENSE',
    'CONDOR',
    'SPLIIT',
    'XLITE',
    'BLAK',
    'BLU',
    'WILDFIRE',
    'ROAR',
    'CYNOS',
    'THUMPA',
    'SUPERNATURAL',
  ];

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'position', label: 'Position' },
    { id: 'name-asc', label: 'Product Name A-Z' },
    { id: 'price-high-low', label: 'Price - High to Low' },
    { id: 'price-low-high', label: 'Price - Low to High' },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 font-sans text-[#24201e] space-y-5">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <h2 className="text-base font-bold tracking-tight text-[#18181b]">
          Sort and Filter
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-[#f15b28] hover:text-[#c93c0d] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Size Accordion */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-neutral-900 cursor-pointer"
        >
          <span>Size</span>
          {openSections.size ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {openSections.size && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {allSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => onToggleSize(size)}
                  className={`py-2 px-2 text-xs font-semibold rounded border text-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#f15b28] text-white border-[#f15b28] shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Willow Type Accordion */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          onClick={() => toggleSection('willow')}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-neutral-900 cursor-pointer"
        >
          <span>Willow Type</span>
          {openSections.willow ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {openSections.willow && (
          <div className="mt-2 space-y-2.5">
            {willowOptions.map((opt) => {
              const isChecked = selectedWillowTypes.includes(opt.type);
              return (
                <label
                  key={opt.type}
                  className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleWillow(opt.type)}
                    className="w-4 h-4 rounded text-[#f15b28] border-neutral-300 focus:ring-[#f15b28] cursor-pointer accent-[#f15b28]"
                  />
                  <span>{opt.type}</span>
                  <span className="text-neutral-400 font-normal">({opt.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Range Accordion */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          onClick={() => toggleSection('range')}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-neutral-900 cursor-pointer"
        >
          <span>Range</span>
          {openSections.range ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {openSections.range && (
          <div className="mt-2 max-h-52 overflow-y-auto pr-1 space-y-2">
            {rangeOptions.map((rng) => {
              const isChecked = selectedRanges.includes(rng);
              return (
                <label
                  key={rng}
                  className="flex items-center gap-2.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleRange(rng)}
                    className="w-4 h-4 rounded text-[#f15b28] border-neutral-300 focus:ring-[#f15b28] cursor-pointer accent-[#f15b28]"
                  />
                  <span>{rng}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Price Range Accordion with dual inputs and Apply */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-neutral-900 cursor-pointer"
        >
          <span>Price Range</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            {/* Slider track visual */}
            <div className="px-1">
              <input
                type="range"
                min="2555"
                max="129999"
                step="500"
                value={maxInput}
                onChange={(e) => setMaxInput(Number(e.target.value))}
                className="w-full accent-[#f15b28] cursor-pointer"
              />
            </div>

            {/* Min and Max input fields matching screenshot format */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={minInput}
                  onChange={(e) => setMinInput(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded text-neutral-800 focus:outline-none focus:border-[#f15b28] font-mono"
                />
              </div>
              <span className="text-neutral-400 font-bold">-</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={maxInput}
                  onChange={(e) => setMaxInput(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded text-neutral-800 focus:outline-none focus:border-[#f15b28] font-mono"
                />
              </div>
            </div>

            {/* Orange Apply Button */}
            <button
              onClick={handleApplyPrice}
              className="w-full py-2 bg-[#f15b28] hover:bg-[#c93c0d] text-white text-xs font-bold rounded transition-colors cursor-pointer uppercase tracking-wider"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* 5. Sort By Radio Accordion */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection('sort')}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-neutral-900 cursor-pointer"
        >
          <span>Sort By</span>
          {openSections.sort ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {openSections.sort && (
          <div className="mt-2 space-y-2.5">
            {sortOptions.map((opt) => {
              const isSelected = sortBy === opt.id;
              return (
                <label
                  key={opt.id}
                  onClick={() => onSortChange(opt.id)}
                  className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer select-none"
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#f15b28]'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#f15b28]" />
                    )}
                  </span>
                  <span className={isSelected ? 'font-bold text-neutral-900' : ''}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
