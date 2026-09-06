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
    <div className="w-full flex justify-center mb-6">
      <div className="bg-[#F0EEF6] p-1.5 rounded-full border border-slate-200/60 inline-flex w-full sm:w-auto overflow-x-auto no-scrollbar shadow-inner">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 sm:flex-initial flex flex-col items-center justify-center px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 whitespace-nowrap relative ${
                isActive
                  ? 'bg-white text-brand-600 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 font-semibold'
              }`}
            >
              <div className="flex items-center gap-2">
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200/70">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Purple Underline Indicator Bar matching 1Fi screenshot */}
              {isActive && (
                <span className="w-6 h-0.5 rounded-full bg-brand-600 mt-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitcher;
