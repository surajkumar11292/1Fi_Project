/**
 * ============================================================================
 * 1FI MOBILE FLOATING DOCK (components/common/MobileBottomNav.jsx)
 * ============================================================================
 * Purpose:
 *   Replicates the exact floating white bottom navigation dock from the official
 *   1Fi mobile app (as seen in Screenshot 4 & 5 from app.1fi.in/shop).
 *
 * Visual Features:
 *   - Floating rounded-full pill dock container with white background
 *   - 5 standard 1Fi tabs: Home, Shop (Active), EMI Dues, Limit, Profile
 *   - Active tab highlighted in 1Fi purple (#6C2BD9) with top indicator line
 *   - Subtle elevation drop shadow
 * ============================================================================
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Receipt, BarChart3, User } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();

  // Tabs matching app.1fi.in/shop screenshot
  const navTabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'shop', label: 'Shop', icon: Store, path: '/', isMain: true },
    { id: 'dues', label: 'EMI Dues', icon: Receipt, path: '/#dues' },
    { id: 'limit', label: 'Limit', icon: BarChart3, path: '/#limit' },
    { id: 'profile', label: 'Profile', icon: User, path: '/#profile' },
  ];

  // Shop is active when on main catalog or product detail page
  const isShopActive = location.pathname === '/' || location.pathname.startsWith('/product');

  // When browsing a specific product, hide generic navigation to prioritize checkout CTA
  if (location.pathname.startsWith('/product')) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-4 right-4 z-50 md:hidden flex justify-center pointer-events-none">
      <nav
        aria-label="1Fi Mobile Dock"
        className="w-full max-w-sm bg-white/95 backdrop-blur-lg rounded-full border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-2 pointer-events-auto flex items-center justify-between"
      >
        {navTabs.map((tab) => {
          const IconComponent = tab.icon;
          const active = tab.id === 'shop' ? isShopActive : false;

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                active ? 'text-brand-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Active Tab Indicator Bar on top */}
              {active && (
                <span className="absolute -top-2 w-5 h-0.5 rounded-full bg-brand-600"></span>
              )}

              <IconComponent className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'text-brand-600 font-bold' : 'text-slate-500'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
