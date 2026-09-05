/**
 * ============================================================================
 * PRODUCT ROUTING MODULE (productRoutes.js)
 * ============================================================================
 * Purpose:
 *   Registers HTTP route paths and delegates incoming requests to corresponding
 *   methods in `productController.js`.
 *
 * Route Mapping:
 *   - GET  /api/products                 -> getProducts (with filters, search, pagination)
 *   - GET  /api/products/meta/categories -> getCategories (MongoDB aggregation)
 *   - POST /api/products/calculate-emi   -> calculateEmi (Fintech EMI engine)
 *   - GET  /api/products/:slug           -> getProductBySlug (Dynamic product detail)
 * Route Ordering Strategy:
 *   - Specific endpoints (`/meta/categories`, `/calculate-emi`) must be registered
 *     prior to dynamic slug parameter routes (`/:slug`) to prevent parameter collision.
 * ============================================================================
 */

// Import express router factory to declare modular, mountable route handlers
import express from 'express';

// Import controller handler methods
import {
  getProducts,
  getProductBySlug,
  getCategories,
  calculateEmi,
} from '../controllers/productController.js';

// Create a new Express Router instance
const router = express.Router();

/**
 * Route: /api/products
 * GET: Fetches paginated, filtered, and sorted list of products
 */
router.route('/').get(getProducts);

/**
 * Route: /api/products/meta/categories
 * GET: Runs MongoDB aggregation pipeline to return categories with item counts
 * (Placed before /:slug so "meta" is not parsed as a slug)
 */
router.route('/meta/categories').get(getCategories);

/**
 * Route: /api/products/calculate-emi
 * POST: Dynamic calculation of monthly installments given principal, tenure, and rate
 * (Placed before /:slug so "calculate-emi" is not parsed as a slug)
 */
router.route('/calculate-emi').post(calculateEmi);

/**
 * Route: /api/products/:slug
 * GET: Fetches full product details by its unique slug identifier
 */
router.route('/:slug').get(getProductBySlug);

// Export router to be mounted in server.js under '/api/products'
export default router;
