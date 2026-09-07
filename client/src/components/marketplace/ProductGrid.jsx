/**
 * ============================================================================
 * PRODUCT GRID COMPONENT (components/marketplace/ProductGrid.jsx)
 * ============================================================================
 * Purpose:
 *   Renders the responsive grid container for marketplace product cards.
 *   Manages skeleton loading states, empty search/filter results,
 *   and pagination controls.
 * ============================================================================
 */

import React from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../common/SkeletonLoader';
import { SearchX, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  total = 0,
  page = 1,
  totalPages = 1,
  onPageChange,
  onResetFilters,
}) => {
  // 1. Loading State: Display skeleton cards
  if (loading) {
    return <ProductGridSkeleton count={6} />;
  }

  // 2. Error State: Display retry banner
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center my-8">
        <p className="text-red-700 font-semibold mb-3">{error}</p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Loading Catalog</span>
        </button>
      </div>
    );
  }

  // 3. Empty State: No matching products found
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-sm max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No matching products</h3>
        <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
          We couldn't find any electronics matching your filters. Try adjusting your search query or clear active filters.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 shadow-md shadow-brand-600/20 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  // 4. Populated Grid State
  return (
    <div>
      {/* Product Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product._id || product.slug} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-4">
          <span className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-900">{products.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{total}</span> items
          </span>

          <div className="flex items-center gap-2">
            {/* Previous Page Button */}
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous Page"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Indicators */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = page === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next Page"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
