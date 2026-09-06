/**
 * ============================================================================
 * CATEGORY FILTER COMPONENT (components/marketplace/CategoryFilter.jsx)
 * ============================================================================
 * Purpose:
 *   Horizontal scrollable pill list displaying categories with dynamic
 *   document counts fetched via the MongoDB Aggregation Pipeline endpoint.
 * ============================================================================
 */

import React from 'react';
import { Layers, Smartphone, Laptop, Headphones, Watch } from 'lucide-react';

export const CategoryFilter = ({ categories = [], activeCategory = 'all', onSelectCategory }) => {
  // Map category names to icons for visual enhancement
  const getCategoryIcon = (catName) => {
    switch (catName.toLowerCase()) {
      case 'smartphones':
        return <Smartphone className="w-4 h-4" />;
      case 'laptops':
        return <Laptop className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'wearables':
        return <Watch className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Calculate total count across all categories
  const totalCount = categories.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2">
        
        {/* "All" Category Pill */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>All Products</span>
          {totalCount > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeCategory === 'all'
                  ? 'bg-brand-700 text-brand-100'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalCount}
            </span>
          )}
        </button>

        {/* Dynamic Category Pills populated from MongoDB Aggregation */}
        {categories.map((cat) => {
          const isSelected = activeCategory.toLowerCase() === cat.category.toLowerCase();

          return (
            <button
              key={cat.category}
              onClick={() => onSelectCategory(cat.category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {getCategoryIcon(cat.category)}
              <span>{cat.category}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-brand-700 text-brand-100'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default CategoryFilter;
