/**
 * ============================================================================
 * SHOP PAGE VIEW (pages/ShopPage.jsx)
 * ============================================================================
 * Purpose:
 *   Main landing view for the 1Fi ecommerce shop.
 *   Implements the 3-tab architecture specified in the assignment PDF:
 *     - Tab 1: Top Brands (Placeholder view)
 *     - Tab 2: Nearby Stores (Placeholder view)
 *     - Tab 3: 1Fi Marketplace (Active product catalog with dynamic API data)
 *
 * State Management:
 *   - Active tab state ('marketplace', 'top-brands', 'nearby-stores')
 *   - Search input state with `useDebounce` hook to optimize network bandwidth
 *   - `useProducts` hook managing catalog array, category aggregation, and pagination
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/shop/HeroBanner';
import TabSwitcher from '../components/shop/TabSwitcher';
import TopBrandsTab from '../components/shop/TopBrandsTab';
import NearbyStoresTab from '../components/shop/NearbyStoresTab';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryFilter from '../components/marketplace/CategoryFilter';
import SortDropdown from '../components/marketplace/SortDropdown';
import ProductGrid from '../components/marketplace/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

export const ShopPage = () => {
  // Active navigation tab (defaults to 'marketplace' per assignment core deliverable)
  const [activeTab, setActiveTab] = useState('marketplace');

  // Search input local text state
  const [searchInput, setSearchInput] = useState('');

  // Debounce the search input by 350ms to prevent rapid redundant API calls
  const debouncedSearch = useDebounce(searchInput, 350);

  // Consume our comprehensive custom products catalog hook
  const {
    products,
    categories,
    loading,
    error,
    total,
    totalPages,
    filters,
    updateFilter,
    resetFilters,
  } = useProducts();

  // Sync debounced search value with the products query filter
  useEffect(() => {
    updateFilter('search', debouncedSearch);
  }, [debouncedSearch, updateFilter]);

  // Handler to clear search bar
  const handleClearSearch = () => {
    setSearchInput('');
    updateFilter('search', '');
  };

  const handlePriceChange = ({ min, max }) => {
    updateFilter('minPrice', min);
    updateFilter('maxPrice', max);
  };

  const handleClearPrice = () => {
    updateFilter('minPrice', '');
    updateFilter('maxPrice', '');
  };

  // Full reset handler (clears search, category, sorting, price range)
  const handleFullReset = () => {
    setSearchInput('');
    resetFilters();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1Fi Purple Gradient Hero Banner */}
      <HeroBanner />

      {/* 3-Tab Segmented Switcher (Top Brands | Nearby Stores | 1Fi Marketplace) */}
      <TabSwitcher
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      {/* ==================================================================== */}
      {/* TAB CONTENT RENDERING                                                */}
      {/* ==================================================================== */}

      {/* Tab 1: Top Brands Placeholder */}
      {activeTab === 'top-brands' && (
        <TopBrandsTab onSwitchToMarketplace={() => setActiveTab('marketplace')} />
      )}

      {/* Tab 2: Nearby Stores Placeholder */}
      {activeTab === 'nearby-stores' && (
        <NearbyStoresTab onSwitchToMarketplace={() => setActiveTab('marketplace')} />
      )}

      {/* Tab 3: 1Fi Marketplace (Core Assignment Deliverable) */}
      {activeTab === 'marketplace' && (
        <div className="animate-fade-in">
          
          {/* Search Bar & Quick Discovery */}
          <div className="mb-4">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onClear={handleClearSearch}
            />
          </div>

          {/* Dynamic Category Pill Bar with MongoDB Aggregation Counts */}
          <div className="mb-2">
            <CategoryFilter
              categories={categories}
              activeCategory={filters.category}
              onSelectCategory={(cat) => updateFilter('category', cat)}
            />
          </div>

          {/* Sort Controls, Price Range & 0% No-Cost EMI Filter Switch */}
          <SortDropdown
            sort={filters.sort}
            onSortChange={(val) => updateFilter('sort', val)}
            noCostOnly={filters.noCostOnly}
            onToggleNoCost={(val) => updateFilter('noCostOnly', val)}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onPriceChange={handlePriceChange}
            onClearPrice={handleClearPrice}
          />

          {/* Catalog Grid with Skeletons, Empty State & Pagination */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            total={total}
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(p) => updateFilter('page', p)}
            onResetFilters={handleFullReset}
          />

        </div>
      )}

    </div>
  );
};

export default ShopPage;
