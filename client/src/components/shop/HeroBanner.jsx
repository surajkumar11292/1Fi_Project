/**
 * ============================================================================
 * 1FI HERO BANNER COMPONENT (components/shop/HeroBanner.jsx)
 * ============================================================================
 * Purpose:
 *   Visual hero banner matching the exact typography, messaging, and graphics
 *   of the 1Fi fintech platform (from Screenshot 3 & 4 of 1fi.in & app.1fi.in).
 * ============================================================================
 */

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, ShoppingBag } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1F0E54] via-[#2E146E] to-[#471887] text-white p-6 sm:p-8 lg:p-10 shadow-xl mb-6 border border-purple-900/40">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Content */}
        <div className="max-w-xl text-left">
          
          {/* Authentic 1Fi Sparkle Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-200 mb-3.5">
            <span className="px-1.5 py-0.2 rounded-full bg-white text-brand-700 text-[10px] font-extrabold uppercase">
              New
            </span>
            <span>No-cost EMIs backed by mutual funds</span>
          </div>

          {/* Headline matching 1Fi platform */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug mb-2">
            Shop today. <span className="italic font-light text-slate-300">Pay later</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-brand-300">
              with zero interest.
            </span>
          </h1>

          {/* Subtext matching Screenshot 4 */}
          <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed mb-4">
            No credit score required. No interest. Fully backed by your investments.
          </p>

          {/* Value props pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Instant Disbursal</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>₹0 Down Payment</span>
            </div>
          </div>
        </div>

        {/* 1Fi Visual Icon on Right */}
        <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-tr from-amber-400/20 to-purple-400/20 border border-white/10 flex items-center justify-center relative p-4 shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-lg">
              <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
            </div>
            <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              0% Interest
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HeroBanner;
