/**
 * ============================================================================
 * 1FI PRODUCT DETAIL PAGE VIEW (pages/ProductDetailPage.jsx)
 * ============================================================================
 * Purpose:
 *   Authentic 1Fi product view matching fintech visual guidelines:
 *     - Crisp white surfaces, Plus Jakarta Sans typography
 *     - Interactive variant configuration (colorways/storage)
 *     - Reactive EMI calculation engine updating installments live
 *     - Clean responsive checkout CTA with ProceedModal simulation
 *     - Mobile-friendly layout avoiding viewport overlapping
 * ============================================================================
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Star,
  ShieldCheck,
  Zap,
  Percent,
  Truck,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { useWishlist } from '../hooks/useWishlist';
import ImageGallery from '../components/product/ImageGallery';
import VariantSelector from '../components/product/VariantSelector';
import EmiPlanList from '../components/product/EmiPlanList';
import ProceedModal from '../components/product/ProceedModal';
import { ProductDetailSkeleton } from '../components/common/SkeletonLoader';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Consume our product detail hook
  const {
    product,
    loading,
    error,
    selectedVariant,
    selectedEmiPlan,
    activeImageIndex,
    setActiveImageIndex,
    handleVariantChange,
    handleEmiPlanSelect,
    currentPrice,
    currentMrp,
    dynamicMonthlyInstallment,
  } = useProduct(slug);

  // Modal open state for checkout simulation
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Loading Skeleton State
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // 2. Error / Not Found State
  if (error || !product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          The requested product could not be located or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-md shadow-brand-600/20"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    );
  }

  // Check wishlist status
  const isSaved = isWishlisted(product._id || product.slug);

  // Active variant images
  const activeImages =
    selectedVariant && selectedVariant.images && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product.variants[0]?.images || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12">
      
      {/* Navigation Breadcrumb & Wishlist Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
            isSaved
              ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500 shadow-2xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
          <span>{isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery (5 cols on lg) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ImageGallery
              images={activeImages}
              activeIndex={activeImageIndex}
              onSelectIndex={setActiveImageIndex}
              title={product.title}
            />

            {/* Fintech Trust & Security Badges below image */}
            <div className="mt-5 p-4 rounded-3xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Truck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="text-[11px] font-medium">Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] font-medium">100% Genuine Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-[11px] font-medium">Instant Pre-approval</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <RotateCcw className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-[11px] font-medium">7-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Info, Variants, EMI & Action (7 cols on lg) */}
        <div className="lg:col-span-7">
          
          {/* Brand & Promotional Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
              {product.brand}
            </span>

            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Title & Tagline */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
            {product.title}
          </h1>

          {product.tagline && (
            <p className="text-xs sm:text-sm text-slate-500 mb-3 leading-relaxed">
              {product.tagline}
            </p>
          )}

          {/* Customer Reviews & Ratings */}
          <div className="flex items-center gap-2 text-xs mb-5">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-slate-800 font-bold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">
              {product.reviewCount.toLocaleString('en-IN')} verified customer reviews
            </span>
          </div>

          {/* Upfront Price Display */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#FAF9FD] border border-purple-100/80 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>

              {currentMrp > currentPrice && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{currentMrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {Math.round(((currentMrp - currentPrice) / currentMrp) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-[11px] text-slate-500 mt-1">
              Inclusive of all taxes. Free shipping across India.
            </p>
          </div>

          {/* Variant Selector (Colors / Storage) */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={handleVariantChange}
          />

          {/* Key Specifications / Bullet Points */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-6 p-5 rounded-3xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Key Features & Highlights
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Selectable EMI Plans & Financing Breakdown */}
          <EmiPlanList
            emiPlans={product.emiPlans}
            selectedPlan={selectedEmiPlan}
            onSelectPlan={handleEmiPlanSelect}
            currentPrice={currentPrice}
          />

          {/* Desktop Inline Action Button */}
          <div className="hidden lg:block mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/30 flex items-center justify-between transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="text-left">
                <span className="text-xs text-purple-200 block uppercase tracking-wider font-semibold">
                  {selectedEmiPlan ? `${selectedEmiPlan.tenureMonths} Months Financing Plan` : 'Instant Checkout'}
                </span>
                <span className="text-xl font-black">
                  Pay ₹{dynamicMonthlyInstallment.toLocaleString('en-IN')}/month
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-bold">
                <span>Proceed to EMI Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Mobile Floating Bottom Bar - positioned nicely above the bottom dock */}
          <div className="lg:hidden fixed bottom-18 left-3 right-3 z-40">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 text-white font-extrabold shadow-[0_8px_30px_rgba(108,43,217,0.4)] flex items-center justify-between border border-purple-400/30"
            >
              <div className="text-left">
                <span className="text-[10px] text-purple-200 uppercase tracking-wider block font-bold">
                  {selectedEmiPlan?.tenureMonths || 6} Months EMI Plan
                </span>
                <span className="text-sm font-black">
                  Pay ₹{dynamicMonthlyInstallment.toLocaleString('en-IN')}/month
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl text-xs font-bold">
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Full Rich Product Description */}
          <div className="mt-8 pt-8 border-t border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              About the {product.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>

      </div>

      {/* Checkout & EMI Authorization Modal */}
      <ProceedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        variant={selectedVariant}
        emiPlan={selectedEmiPlan}
        currentPrice={currentPrice}
        installmentAmount={dynamicMonthlyInstallment}
      />

    </div>
  );
};

export default ProductDetailPage;
