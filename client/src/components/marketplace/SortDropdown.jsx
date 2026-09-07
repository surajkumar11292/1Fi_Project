/**
 * ============================================================================
 * SORT DROPDOWN & FILTER CONTROLS (components/marketplace/SortDropdown.jsx)
 * ============================================================================
 * Purpose:
 *   Provides sorting options (Price Low-High, Price High-Low, Rating, Newest)
 *   and a fintech-specific "No-Cost EMI Only" toggle switch.
 * ============================================================================
 */

import React from 'react';
import { ArrowUpDown, Percent } from 'lucide-react';
import PriceRangeSlider from './PriceRangeSlider';

export const SortDropdown = ({
  sort,
  onSortChange,
  noCostOnly,
  onToggleNoCost,
  minPrice,
  maxPrice,
  onPriceChange,
  onClearPrice,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-slate-200/80 mb-6">
      
      {/* Filters Group: 0% EMI & Price Range */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 0% No-Cost EMI Quick Filter Toggle */}
        <button
          type="button"
          onClick={() => onToggleNoCost(!noCostOnly)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            noCostOnly
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div
            className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] font-bold ${
              noCostOnly ? 'bg-emerald-600 text-white' : 'border border-slate-400'
            }`}
          >
            {noCostOnly ? '✓' : ''}
          </div>
          <Percent className="w-3.5 h-3.5 text-emerald-600" />
          <span>0% No-Cost EMI Only</span>
        </button>

        {/* Price Range Slider & Presets Popover */}
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={onPriceChange}
          onClear={onClearPrice}
        />
      </div>

      {/* Sort Select Menu */}
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-medium hidden sm:inline">Sort by:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort products by"
          className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 cursor-pointer shadow-sm"
        >
          <option value="newest">Featured & Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

    </div>
  );
};

export default SortDropdown;
