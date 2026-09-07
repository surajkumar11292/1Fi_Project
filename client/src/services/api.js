/**
 * ============================================================================
 * API SERVICE LAYER (services/api.js)
 * ============================================================================
 * Purpose:
 *   Encapsulates all HTTP network communication between the React frontend
 *   and the Express REST backend using Axios.
 *   Provides request/response interceptors, standardized error extraction,
 *   and strongly typed endpoint caller functions.
 *
 * Why an Axios Service Layer?
 *   1. Decoupled Logic: Components don't have hardcoded URLs or raw fetch calls.
 *   2. Centralized Interceptors: Request headers, tokens, or global error handling
 *      are handled in one single place.
 *   3. Cleaner Testing: Mocking the API service in unit tests is trivial.
 * Configuration:
 *   - Base URL defaults to VITE_API_BASE_URL env or '/api' proxy.
 *   - Global response interceptors extract server error messages cleanly.
 * ============================================================================
 */

// Import Axios HTTP client library
import axios from 'axios';

// Normalize Base URL to ensure consistent /api routing across environments
const getBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || '/api').trim();
  if (envUrl === '/api') return '/api';
  return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/+$/, '')}/api`;
};

/**
 * Create a pre-configured Axios instance.
 */
const apiClient = axios.create({
  // Base URL for all relative request paths
  baseURL: getBaseUrl(),
  // Timeout in milliseconds before request fails (10 seconds)
  timeout: 10000,
  // Standard headers sent with every request
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor:
 * Intercepts every outgoing request before it is sent across the network.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Can attach authorization tokens here in authenticated flows
    return config;
  },
  (error) => {
    // Handle request creation errors
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * Intercepts every incoming response from the server before reaching the calling component.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return successful response data payload directly
    return response;
  },
  (error) => {
    // Extract meaningful server error message or fallback to network error
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred. Please try again.';

    console.error(`[API Client Error]: ${errorMessage}`);

    // Return rejected promise with enhanced message for component catch blocks
    return Promise.reject(new Error(errorMessage));
  }
);

// ----------------------------------------------------------------------------
// API CALLER FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * fetchProducts:
 * Retrieves paginated and filtered product catalog list from the backend.
 * 
 * @param {object} params - Query filters (search, category, sort, page, limit, noCostOnly, etc.)
 * @returns {Promise<object>} API response containing data array and pagination metadata
 */
export const fetchProducts = async (params = {}) => {
  // Pass query parameters object to Axios (auto-serialized into query string)
  const response = await apiClient.get('/products', { params });
  return response.data;
};

/**
 * fetchProductBySlug:
 * Retrieves complete product details (variants, EMI plans, highlights) by slug.
 * 
 * @param {string} slug - Unique URL-friendly slug (e.g., 'apple-iphone-15-pro-max')
 * @returns {Promise<object>} API response containing single product document
 */
export const fetchProductBySlug = async (slug) => {
  const response = await apiClient.get(`/products/${slug}`);
  return response.data;
};

/**
 * fetchCategories:
 * Retrieves distinct product categories with document counts via MongoDB aggregation.
 * 
 * @returns {Promise<object>} Array of category objects with { category, count }
 */
export const fetchCategories = async () => {
  const response = await apiClient.get('/products/meta/categories');
  return response.data;
};

/**
 * calculateEmiQuote:
 * Computes dynamic monthly installment breakdown for custom principal, tenure, and rate.
 * 
 * @param {object} payload - { principal, tenureMonths, annualRate, downPayment }
 * @returns {Promise<object>} Computed EMI breakdown data
 */
export const calculateEmiQuote = async (payload) => {
  const response = await apiClient.post('/products/calculate-emi', payload);
  return response.data;
};

// Export the underlying Axios client for edge cases
export default apiClient;
