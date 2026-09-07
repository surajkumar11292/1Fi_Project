import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

/**
 * PriceRangeSlider Component
 * Allows filtering products by price thresholds using quick preset pills or custom inputs.
 */
export const PriceRangeSlider = ({
  minPrice = '',
  maxPrice = '',
  onPriceChange,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localMin, setLocalMin] = useState(minPrice || '');
  const [localMax, setLocalMax] = useState(maxPrice || '');

  // Synchronize incoming prop values
  useEffect(() => {
    setLocalMin(minPrice || '');
    setLocalMax(maxPrice || '');
  }, [minPrice, maxPrice]);

  const presets = [
    { label: 'Under ₹50,000', min: '', max: '50000' },
    { label: '₹50k – ₹1,00,000', min: '50000', max: '100000' },
    { label: '₹1L – ₹2,00,000', min: '100000', max: '200000' },
    { label: 'Above ₹2,00,000', min: '200000', max: '' },
  ];

  const handleApply = (e) => {
    e?.preventDefault();
    onPriceChange({ min: localMin, max: localMax });
    setIsOpen(false);
  };

  const handlePresetClick = (preset) => {
    setLocalMin(preset.min);
    setLocalMax(preset.max);
    onPriceChange({ min: preset.min, max: preset.max });
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalMin('');
    setLocalMax('');
    onClear();
    setIsOpen(false);
  };

  const hasActivePriceFilter = Boolean(minPrice || maxPrice);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
          hasActivePriceFilter
            ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-sm'
            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
        }`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
        <span>
          {hasActivePriceFilter
            ? `Price: ₹${minPrice ? Number(minPrice).toLocaleString('en-IN') : '0'} - ₹${
                maxPrice ? Number(maxPrice).toLocaleString('en-IN') : 'Any'
              }`
            : 'Price Filter'}
        </span>
        {hasActivePriceFilter && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="ml-1 p-0.5 hover:bg-brand-100 rounded-full text-brand-700"
            title="Clear price filter"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-30 animate-fade-in">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Filter by Price (INR)</span>
              {hasActivePriceFilter && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-semibold text-brand-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {presets.map((p, idx) => {
                const isActive = minPrice === p.min && maxPrice === p.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetClick(p)}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-left truncate transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white border-brand-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Min / Max Inputs */}
            <form onSubmit={handleApply} className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="₹ Min"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <span className="text-slate-300 mt-4">-</span>
                <div className="flex-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="₹ Max"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceRangeSlider;
