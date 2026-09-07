/**
 * ============================================================================
 * VARIANT SELECTOR COMPONENT (components/product/VariantSelector.jsx)
 * ============================================================================
 * Purpose:
 *   Allows customers to choose between available product configurations
 *   (e.g., colorway, RAM, internal storage capacity).
 *   Dynamically triggers updates to selling price, MRP, and monthly EMI.
 * ============================================================================
 */

import React from 'react';
import { Check } from 'lucide-react';

export const VariantSelector = ({ variants = [], selectedVariant, onSelectVariant }) => {
  if (!variants || variants.length <= 1) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select Configuration & Variant
        </label>
        {selectedVariant && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of stock'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant && selectedVariant.sku === variant.sku;

          return (
            <button
              key={variant.sku}
              type="button"
              onClick={() => onSelectVariant(variant)}
              className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {variant.name}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    SKU: {variant.sku}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-slate-900 block">
                  ₹{variant.price.toLocaleString('en-IN')}
                </span>
                {variant.mrp > variant.price && (
                  <span className="text-[10px] text-slate-400 line-through block">
                    ₹{variant.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
