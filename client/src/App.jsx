/**
 * ============================================================================
 * MAIN APPLICATION ROUTER (App.jsx)
 * ============================================================================
 * Purpose:
 *   Configures client-side routing, persistent layout structure (Navbar,
 *   Footer, Mobile Bottom Navigation), and route-change scroll behavior.
 *
 * Route Mapping:
 *   - `/`              -> ShopPage (3 tabs: Top Brands, Nearby Stores, 1Fi Marketplace)
 *   - `/product/:slug` -> ProductDetailPage (Specifications, variants, EMI selector)
 *   - `/wishlist`      -> WishlistPage (Saved products)
 *   - `*`              -> 404 Fallback page
 * ============================================================================
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileBottomNav from './components/common/MobileBottomNav';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import './App.css';

/**
 * ScrollToTop:
 * Automatically resets viewport scroll position to the top on every route transition.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * NotFoundPage:
 * Fallback component for undefined URLs.
 */
function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-2">404</h2>
      <p className="text-sm text-slate-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors shadow-md"
      >
        <span>Return to Shop</span>
      </Link>
    </div>
  );
}

export function App() {
  return (
    <div className="app-viewport-container flex flex-col min-h-screen bg-surface-bg">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          {/* Shop view with 3-tab architecture */}
          <Route path="/" element={<ShopPage />} />

          {/* Dynamic Product Detail page */}
          <Route path="/product/:slug" element={<ProductDetailPage />} />

          {/* User Wishlist page */}
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Desktop & Tablet Footer */}
      <Footer />

      {/* Mobile-first bottom navigation bar (matches 1Fi screenshots) */}
      <MobileBottomNav />
    </div>
  );
}

export default App;
