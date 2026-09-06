/**
 * ============================================================================
 * 1FI NEARBY STORES TAB (components/shop/NearbyStoresTab.jsx)
 * ============================================================================
 * Purpose:
 *   Replicates the exact Nearby Stores view from app.1fi.in/shop (Screenshot 5).
 *   Features location selector pill ("Bengaluru Urban ⌄"), distance tags ("1715 KM"),
 *   and verified physical merchant store cards.
 * ============================================================================
 */

import React, { useState } from 'react';
import { ChevronDown, MapPin, Search, ArrowRight, Store } from 'lucide-react';

export const NearbyStoresTab = ({ onSwitchToMarketplace }) => {
  const [selectedCity, setSelectedCity] = useState('Bengaluru Urban');
  const [storeSearch, setStoreSearch] = useState('');

  // Stores list replicating Screenshot 5 from app.1fi.in/shop
  const stores = [
    {
      id: 'tripbouquet',
      name: 'TripBouquet',
      distance: '1715 KM',
      address: '241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018',
      initials: 'TB',
      bgColor: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      id: 'chargeronwheels',
      name: 'Charger On Wheels',
      distance: '1716 KM',
      address: 'Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101',
      initials: 'CW',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'vijaysales',
      name: 'Vijay Sales Electronics',
      distance: '2.4 KM',
      address: 'Indiranagar 100ft Road, Bengaluru, Karnataka, 560038',
      initials: 'VS',
      bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'reliancedigital',
      name: 'Reliance Digital Megastore',
      distance: '4.1 KM',
      address: 'Nexus Mall, Koramangala, Bengaluru, Karnataka, 560095',
      initials: 'RD',
      bgColor: 'bg-purple-50 text-brand-700 border-brand-200',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-2 animate-fade-in">
      
      {/* Search Stores Input Field */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={storeSearch}
          onChange={(e) => setStoreSearch(e.target.value)}
          placeholder="Search stores..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200/90 text-slate-800 placeholder-slate-400 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
        />
      </div>

      {/* Header Row: Section Title & Location Dropdown matching Screenshot 5 */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Nearby Stores
        </h3>

        {/* Location Selector Pill */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 text-brand-700 text-xs font-bold cursor-pointer hover:bg-purple-100 transition-colors">
          <span>{selectedCity}</span>
          <ChevronDown className="w-3.5 h-3.5 text-brand-600" />
        </div>
      </div>

      {/* List of Store Cards matching Screenshot 5 */}
      <div className="space-y-3.5 mb-6">
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={onSwitchToMarketplace}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-card-hover hover:border-brand-200 transition-all p-4 flex items-start gap-4 cursor-pointer group"
          >
            {/* Store Avatar Logo */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${store.bgColor} border flex items-center justify-center font-black text-sm sm:text-base flex-shrink-0`}
            >
              <span>{store.initials}</span>
            </div>

            {/* Store Information */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-brand-600 transition-colors truncate">
                  {store.name}
                </h4>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  {store.distance}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {store.address}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Direct link back to Marketplace */}
      <div className="text-center p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
        <p className="text-xs text-slate-600 mb-3">
          Want 100% online doorstep delivery with 0% No-Cost EMI?
        </p>
        <button
          onClick={onSwitchToMarketplace}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all"
        >
          <span>Shop Online on 1Fi Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default NearbyStoresTab;
