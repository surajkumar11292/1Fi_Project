/**
 * ============================================================================
 * 1FI TOP BRANDS TAB (components/shop/TopBrandsTab.jsx)
 * ============================================================================
 * Purpose:
 *   Replicates the exact Top Brands view from app.1fi.in/shop (Screenshot 4).
 *   Renders authentic brand partner cards (Air India, Apple Premium Reseller,
 *   Samsung, Sony, Croma, Nike) with brand colored square logos and No-Cost EMI
 *   tenure terms.
 * ============================================================================
 */

import React from 'react';
import { ArrowRight, Sparkles, Store } from 'lucide-react';

export const TopBrandsTab = ({ onSwitchToMarketplace }) => {
  // Brand list replicating Screenshot 4 from app.1fi.in/shop
  const brands = [
    {
      id: 'air-india',
      name: 'Air India',
      offer: 'No-cost EMIs upto 18 months',
      bgColor: 'bg-[#D71921]',
      textColor: 'text-white',
      logoText: 'AIR INDIA',
      isTextLogo: true,
    },
    {
      id: 'apple',
      name: 'Apple Premium Reseller',
      offer: 'No-cost EMIs upto 24 months',
      bgColor: 'bg-black',
      textColor: 'text-white',
      symbol: '',
    },
    {
      id: 'samsung',
      name: 'Samsung Flagship Stores',
      offer: 'No-cost EMIs upto 18 months',
      bgColor: 'bg-[#034EA2]',
      textColor: 'text-white',
      logoText: 'SAMSUNG',
      isTextLogo: true,
    },
    {
      id: 'sony',
      name: 'Sony Center',
      offer: 'No-cost EMIs upto 12 months',
      bgColor: 'bg-[#111111]',
      textColor: 'text-white',
      logoText: 'SONY',
      isTextLogo: true,
    },
    {
      id: 'croma',
      name: 'Croma Retail',
      offer: 'No-cost EMIs upto 12 months',
      bgColor: 'bg-[#003838]',
      textColor: 'text-[#00E5D2]',
      logoText: 'croma',
      isTextLogo: true,
    },
    {
      id: 'nike',
      name: 'Nike India',
      offer: 'No-cost EMIs upto 6 months',
      bgColor: 'bg-black',
      textColor: 'text-white',
      symbol: '✔',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-2 animate-fade-in">
      
      {/* Informational Callout to 1Fi Marketplace */}
      <div className="bg-purple-50/70 border border-purple-100 rounded-3xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/20">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Explore 1Fi Marketplace</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant digital checkout on smartphones, laptops, audio & wearables.
            </p>
          </div>
        </div>

        <button
          onClick={onSwitchToMarketplace}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all hover:scale-105 flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <span>Open Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Section Title matching 1Fi Screenshot */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Top Brands
        </h3>
        <span className="text-xs text-slate-400 font-medium">
          6 Partners Available
        </span>
      </div>

      {/* List of Brand Cards matching Screenshot 4 */}
      <div className="space-y-3.5">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={onSwitchToMarketplace}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-card-hover hover:border-brand-200 transition-all duration-200 p-4 sm:p-4.5 flex items-center gap-4 cursor-pointer group"
          >
            {/* Brand Square Logo Container */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${brand.bgColor} ${brand.textColor} flex items-center justify-center font-black text-xs select-none shadow-sm flex-shrink-0 transition-transform group-hover:scale-105`}
            >
              {brand.isTextLogo ? (
                <span className="tracking-tighter uppercase font-extrabold text-[11px] text-center px-1">
                  {brand.logoText}
                </span>
              ) : (
                <span className="text-2xl">{brand.symbol}</span>
              )}
            </div>

            {/* Brand Title & Offer Subtext */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-brand-600 transition-colors truncate">
                {brand.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                {brand.offer}
              </p>
            </div>

            {/* Right Arrow indicator */}
            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-brand-50 group-hover:text-brand-600 text-slate-400 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TopBrandsTab;
