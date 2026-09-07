/**
 * ============================================================================
 * USE WISHLIST CUSTOM HOOK (hooks/useWishlist.js)
 * ============================================================================
 * Purpose:
 *   Manages the user's saved wishlist items in browser `localStorage`.
 *   Enables users to bookmark items from product cards or details and view
 *   them persistently across sessions without requiring mandatory account login.
 *
 * Why localStorage for Wishlist?
 *   In fintech ecommerce, reducing friction in early discovery increases
 *   conversion. Permitting guest users to save items locally keeps high-intent
 *   products readily available before credit eligibility evaluation.
 * Cross-Tab Synchronization:
 *   - Listens to window storage events to propagate additions/deletions across open tabs.
 *   - Persists state changes atomically to browser localStorage.
 * ============================================================================
 */

import { useState, useEffect, useCallback } from 'react';

// Storage key used in localStorage
const WISHLIST_STORAGE_KEY = '1fi_marketplace_wishlist';

export const useWishlist = () => {
  // Initialize state by reading from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to read wishlist from localStorage:', error);
      return [];
    }
  });

  // Sync state changes to localStorage whenever wishlist updates
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlist]);

  // Listen for storage events from other browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === WISHLIST_STORAGE_KEY) {
        try {
          setWishlist(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error('Error syncing wishlist across tabs:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * isWishlisted:
   * Checks if a product with the specified ID or slug exists in the wishlist.
   * 
   * @param {string} idOrSlug - Product _id or slug
   * @returns {boolean} True if product is saved
   */
  const isWishlisted = useCallback(
    (idOrSlug) => {
      return wishlist.some((item) => item._id === idOrSlug || item.slug === idOrSlug);
    },
    [wishlist]
  );

  /**
   * toggleWishlist:
   * Adds or removes a product from the wishlist.
   * 
   * @param {object} product - Full product object
   */
  const toggleWishlist = useCallback((product) => {
    if (!product || (!product._id && !product.slug)) return;

    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some(
        (item) => item._id === product._id || item.slug === product.slug
      );

      if (exists) {
        // Remove item from wishlist
        return prevWishlist.filter(
          (item) => item._id !== product._id && item.slug !== product.slug
        );
      } else {
        // Add minimal product representation to keep localStorage payload compact
        const compactItem = {
          _id: product._id,
          title: product.title,
          slug: product.slug,
          brand: product.brand,
          category: product.category,
          basePrice: product.basePrice,
          baseMrp: product.baseMrp,
          startingEmi: product.startingEmi,
          primaryImage: product.primaryImage,
          badge: product.badge,
        };
        return [...prevWishlist, compactItem];
      }
    });
  }, []);

  /**
   * clearWishlist:
   * Removes all items from the wishlist.
   */
  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return {
    wishlist,
    wishlistCount: wishlist.length,
    isWishlisted,
    toggleWishlist,
    clearWishlist,
  };
};

export default useWishlist;
