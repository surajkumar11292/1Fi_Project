/**
 * ============================================================================
 * WISHLIST PAGE VIEW (pages/WishlistPage.jsx)
 * ============================================================================
 * Purpose:
 *   Displays customer's bookmarked products saved in browser `localStorage`.
 *   Enables users to review desired electronics and jump straight into EMI
 *   financing flows.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ShoppingBag, Percent } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();

  // 1. Empty State
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-purple-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Explore the 1Fi Marketplace to discover flagship smartphones, laptops, and audio gear eligible for 0% No-Cost EMI.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition-all hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore 1Fi Marketplace</span>
        </Link>
      </div>
    );
  }

  // 2. Populated State
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header Row */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Saved Products
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for easy EMI checkout
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Grid of Saved Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id || item.slug}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all p-4 flex flex-col justify-between"
          >
            <div>
              {/* Image & Remove Row */}
              <div className="relative mb-3">
                <Link to={`/product/${item.slug}`}>
                  <div className="w-full h-44 bg-slate-50/60 rounded-xl flex items-center justify-center p-3">
                    <img
                      src={item.primaryImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400'}
                      alt={item.title}
                      className="max-h-36 object-contain"
                    />
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove item"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-500 shadow-sm border border-slate-200/60 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wide">
                {item.brand}
              </span>
              <Link to={`/product/${item.slug}`}>
                <h3 className="font-bold text-slate-900 text-sm hover:text-brand-600 transition-colors line-clamp-2 mt-0.5 mb-2">
                  {item.title}
                </h3>
              </Link>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-base font-extrabold text-slate-900">
                  ₹{item.basePrice?.toLocaleString('en-IN')}
                </span>
                {item.baseMrp > item.basePrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{item.baseMrp?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* EMI Banner & Action Button */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-3 text-slate-600">
                <span>EMI from:</span>
                <span className="font-extrabold text-brand-700">
                  ₹{item.startingEmi?.toLocaleString('en-IN')}/mo
                </span>
              </div>

              <Link
                to={`/product/${item.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Select EMI Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default WishlistPage;
