/**
 * ============================================================================
 * 1FI PRODUCT CARD COMPONENT (components/marketplace/ProductCard.jsx)
 * ============================================================================
 * Purpose:
 *   Renders an individual product in the 1Fi Marketplace catalog grid.
 *   Styled with 1Fi fintech aesthetics: clean white card, soft rounded-3xl borders,
 *   brand purple interactive accents, and high-visibility No-Cost EMI values.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Sparkles, Percent, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';

export const ProductCard = ({ product }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) return null;

  const {
    _id,
    title,
    slug,
    brand,
    category,
    badge,
    rating = 4.5,
    reviewCount = 0,
    basePrice = 0,
    baseMrp = 0,
    discountPercentage = 0,
    startingEmi = 0,
    primaryImage,
    emiPlans = [],
  } = product;

  // Compute discount percentage dynamically if baseMrp > basePrice
  const discountPct =
    discountPercentage > 0
      ? discountPercentage
      : baseMrp > basePrice
      ? Math.round(((baseMrp - basePrice) / baseMrp) * 100)
      : 0;

  // Check if any plan offers 0% No-Cost EMI
  const hasNoCostEmi = emiPlans.some((plan) => plan.isNoCost);

  // Check if saved in user's wishlist
  const isSaved = isWishlisted(_id || slug);

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Header: Badge & Wishlist Button */}
      <div className="relative p-4 pb-0 flex items-start justify-between z-10">
        {/* Promotional Badge */}
        {badge ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-brand-600" />
            {badge}
          </span>
        ) : (
          <span className="text-[10px] font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {brand}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isSaved ? 'fill-rose-500 scale-110' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${slug}`} className="block px-6 py-3">
        <div className="w-full h-44 sm:h-48 flex items-center justify-center bg-[#FAF9FD] rounded-2xl overflow-hidden p-2">
          <img
            src={primaryImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600'}
            alt={title}
            loading="lazy"
            className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Details & EMI Section */}
      <div className="p-4 sm:p-5 pt-1 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-slate-400 font-medium text-[11px]">{category}</span>
            <div className="flex items-center gap-1 text-slate-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/50 text-[11px]">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${slug}`} className="block mb-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              ₹{basePrice.toLocaleString('en-IN')}
            </span>
            {baseMrp > basePrice && discountPct > 0 && (
              <>
                <span className="text-xs text-slate-400 line-through">
                  ₹{baseMrp.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  {discountPct}% off
                </span>
              </>
            )}
          </div>
        </div>

        {/* 1Fi Fintech EMI Highlights Box */}
        <div className="pt-3 border-t border-slate-100 mt-1">
          <div className="bg-[#FAF8FF] border border-purple-100 rounded-2xl p-2.5 mb-3 flex items-center justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                Starting EMI
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-base font-extrabold text-brand-600">
                  ₹{startingEmi.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">/month</span>
              </div>
            </div>

            {hasNoCostEmi && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <Percent className="w-2.5 h-2.5 text-emerald-600" />
                0% EMI
              </span>
            )}
          </div>

          {/* Action CTA Button */}
          <Link
            to={`/product/${slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-600/20 transition-all duration-200 hover:scale-[1.01]"
          >
            <span>View EMI Plans</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
