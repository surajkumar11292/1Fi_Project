/**
 * ============================================================================
 * 1FI AUTHENTIC NAVBAR (components/common/Navbar.jsx)
 * ============================================================================
 * Purpose:
 *   Desktop & Tablet navigation header matching the authentic 1Fi visual design
 *   (as seen in 1fi.in screenshot):
 *     - Crisp white background with soft border and shadow
 *     - Signature 1Fi purple rounded logo icon
 *     - Clean typography in Plus Jakarta Sans
 *     - Credit limit trust status & interactive wishlist badge
 * ============================================================================
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShieldCheck, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';

export const Navbar = () => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  // Helper function to check if the current link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo matching 1Fi Website */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              {/* Official 1Fi Purple Square Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-md shadow-brand-600/25 group-hover:scale-105 transition-transform">
                <span>1Fi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  1Fi <span className="text-brand-600 font-semibold text-xs sm:text-sm">Marketplace</span>
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 hidden sm:block font-medium">
                  NO-COST EMI FINANCING
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  isActive('/')
                    ? 'text-brand-600 font-bold bg-brand-50'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Shop
              </Link>
              <Link
                to="/wishlist"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/wishlist')
                    ? 'text-brand-600 font-bold bg-brand-50'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Saved Items</span>
                {wishlistCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <a
                href="#how-it-works"
                className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-50 transition-all text-slate-500"
              >
                How It Works
              </a>
              <a
                href="#calculator"
                className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-50 transition-all text-slate-500"
              >
                Calculator
              </a>
            </nav>
          </div>

          {/* Right Action Items: Credit Limit Status & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Fintech Pre-Approved Credit Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-medium">Credit Limit:</span>
                <span className="font-bold text-emerald-700">₹1,50,000</span>
              </div>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Wishlist Heart Icon */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-600 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* "Shop Now" Action Pill Button matching 1Fi Website */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/20 transition-all hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
