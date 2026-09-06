/**
 * ============================================================================
 * SKELETON LOADER COMPONENT (components/common/SkeletonLoader.jsx)
 * ============================================================================
 * Purpose:
 *   Provides shimmer animated placeholders while API requests are pending.
 *   Prevents Layout Cumulative Shift (CLS) and delivers a polished user experience.
 * ============================================================================
 */

import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm animate-pulse flex flex-col justify-between h-full">
      <div>
        {/* Image Placeholder */}
        <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="w-16 h-4 bg-slate-200 rounded"></div>
          <div className="w-20 h-4 bg-slate-200 rounded-full"></div>
        </div>
        {/* Title */}
        <div className="w-4/5 h-5 bg-slate-200 rounded mb-2"></div>
        <div className="w-3/5 h-4 bg-slate-200 rounded mb-4"></div>
      </div>

      {/* Pricing & EMI bar */}
      <div className="pt-3 border-t border-slate-100">
        <div className="w-24 h-4 bg-slate-200 rounded mb-2"></div>
        <div className="w-36 h-6 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Back button placeholder */}
      <div className="h-6 w-32 bg-slate-200 rounded-full mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full h-80 sm:h-96 lg:h-[460px] bg-slate-200 rounded-3xl"></div>
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
            <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
            <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>

        {/* Right Column: Details & EMI Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-8 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
          </div>

          <div className="h-12 w-48 bg-slate-200 rounded-2xl"></div>

          {/* Variants skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-200 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
              <div className="h-10 w-24 bg-slate-200 rounded-xl"></div>
            </div>
          </div>

          {/* EMI Plans skeleton */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="h-5 w-40 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 bg-slate-200 rounded-2xl"></div>
              <div className="h-24 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;


