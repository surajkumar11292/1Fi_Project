/**
 * ============================================================================
 * 1FI TAB SWITCHER COMPONENT (components/shop/TabSwitcher.jsx)
 * ============================================================================
 * Purpose:
 *   Replicates the exact pill-segmented switcher from app.1fi.in/shop (Screenshot 4 & 5):
 *     - Rounded-full pill background
 *     - Active tab has white background, purple text (#6C2BD9), and purple underline indicator
 *     - Coordinates between Top Brands, Nearby Stores, and 1Fi Marketplace
 * ============================================================================
 */

import React from 'react';
import { ShoppingBag, Store, MapPin } from 'lucide-react';

export const TabSwitcher = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: ShoppingBag,
      isCore: true,
      badge: 'Live',
    },
    {
      id: 'top-brands',
      label: 'Top Brands',
      icon: Store,
      isCore: false,
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      icon: MapPin,
      isCore: false,
    },
  ];

  return (
    <div className="w-full flex justify-center mb-6 px-2 sm:px-0">
      <div className="bg-[#F0EEF6] p-1 sm:p-1.5 rounded-full border border-slate-200/60 grid grid-cols-3 w-full max-w-md sm:max-w-[700px] shadow-inner">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-1 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 relative ${
                isActive
                  ? 'bg-white text-brand-600 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 font-semibold'
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 w-full">
                <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span className="text-[11px] sm:text-xs md:text-sm truncate sm:overflow-visible sm:whitespace-nowrap">
                  {tab.id === 'marketplace' ? (
                    <>
                      <span className="hidden sm:inline">1Fi </span>Marketplace
                    </>
                  ) : (
                    tab.label
                  )}
                </span>
                {tab.badge && (
                  <span className="hidden md:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200/70 shrink-0">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Purple Underline Indicator Bar matching 1Fi screenshot */}
              {isActive && (
                <span className="w-4 sm:w-6 h-0.5 rounded-full bg-brand-600 mt-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitcher;
