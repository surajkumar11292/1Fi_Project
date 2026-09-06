/**
 * ============================================================================
 * 1FI PILL SEARCH BAR (components/marketplace/SearchBar.jsx)
 * ============================================================================
 * Purpose:
 *   Rounded-full pill search bar matching the search input in app.1fi.in/shop
 *   (Screenshot 4). Provides smooth debounced search across titles, brands, and categories.
 * ============================================================================
 */

import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search online stores, products, brands...',
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-4">
      {/* Search Lens Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
      </div>

      {/* Rounded-full Pill Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full pl-11 sm:pl-12 pr-10 py-3.5 rounded-full bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
      />

      {/* Clear Button */}
      {value && value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <X className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
