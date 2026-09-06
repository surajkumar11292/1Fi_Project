/**
 * ============================================================================
 * USE PRODUCTS CUSTOM HOOK (hooks/useProducts.js)
 * ============================================================================
 * Purpose:
 *   Encapsulates all data-fetching state, pagination, and filter parameters
 *   for the product marketplace catalog.
 *   Interacts with `services/api.js` to retrieve live product lists and
 *   dynamic category counts from the Express/MongoDB backend.
 *
 * Why a dedicated custom hook?
 *   1. Separation of Concerns: Keeps UI presentation components clean and declarative.
 *   2. Reusability: Any component (Marketplace grid, featured carousel, etc.)
 *      can consume catalog data with a single hook call.
 * Architecture:
 *   - Fetches dynamic category list via MongoDB aggregation on mount.
 *   - Synchronizes query filters (search, category, sort, price, noCostOnly) to API queries.
 *   - Coordinates pagination, catalog collections, and loading states.
 * ============================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export const useProducts = (initialFilters = {}) => {
  // Array of fetched product documents
  const [products, setProducts] = useState([]);
  // Array of category summary objects ({ category, count }) from aggregation
  const [categories, setCategories] = useState([]);
  // Loading state indicator
  const [loading, setLoading] = useState(true);
  // Error state message if API fails
  const [error, setError] = useState(null);
  // Total count of matching products across all pages
  const [total, setTotal] = useState(0);
  // Total number of pages available
  const [totalPages, setTotalPages] = useState(1);

  // Active filter state parameters
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'newest',
    noCostOnly: false,
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12,
    ...initialFilters,
  });

  // Fetch categories once on mount using MongoDB aggregation pipeline
  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        if (isMounted && res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products whenever filters state changes
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build clean query params object
      const params = {
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort,
      };

      if (filters.search && filters.search.trim() !== '') {
        params.search = filters.search.trim();
      }

      if (filters.category && filters.category !== 'all') {
        params.category = filters.category;
      }

      if (filters.noCostOnly) {
        params.noCostOnly = 'true';
      }

      if (filters.minPrice) {
        params.minPrice = filters.minPrice;
      }

      if (filters.maxPrice) {
        params.maxPrice = filters.maxPrice;
      }

      const res = await fetchProducts(params);

      if (res.success) {
        setProducts(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * updateFilter:
   * Updates a single filter key (e.g. search, category) and resets to page 1.
   */
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to page 1 whenever a filter criterion changes
    }));
  }, []);

  /**
   * resetFilters:
   * Restores filters to default initial values.
   */
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      sort: 'newest',
      noCostOnly: false,
      minPrice: '',
      maxPrice: '',
      page: 1,
      limit: 12,
    });
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    total,
    totalPages,
    filters,
    updateFilter,
    resetFilters,
    refetch: loadProducts,
  };
};

export default useProducts;
