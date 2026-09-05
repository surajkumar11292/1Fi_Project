/**
 * ============================================================================
 * PRODUCT CONTROLLER (productController.js)
 * ============================================================================
 * Purpose:
 *   Contains business logic and database access methods for all product-related
 *   REST API endpoints. Handles filtering, searching, sorting, pagination,
 *   aggregation pipelines, single-product lookups, and dynamic EMI calculation.
 *
 * Query Composition Features:
 *   - Flexible text & regex search across title, brand, category, tags.
 *   - Efficient indexed sorting and range filtering on basePriceStored.
 *   - MongoDB aggregation pipeline for dynamic category document counts.
 *   - Financial mathematical model for 0% and reducing-balance EMI installments.
 * ============================================================================
 */

// Import express-async-handler to eliminate repetitive try-catch blocks
import asyncHandler from 'express-async-handler';

// Import Product Mongoose Model
import Product from '../models/Product.js';

/**
 * @desc    Fetch all products with filtering, search, sorting, and pagination
 * @route   GET /api/products
 * @access  Public
 * 
 * Query Parameters Supported:
 *   - search: Search keyword matched against title, brand, category, tags
 *   - category: Filter by exact category (e.g. "Smartphones", "Laptops")
 *   - brand: Filter by brand name (e.g. "Apple", "Samsung")
 *   - minPrice: Filter items with base price >= minPrice
 *   - maxPrice: Filter items with base price <= maxPrice
 *   - noCostOnly: Filter products offering at least one 0% No-Cost EMI plan ("true")
 *   - sort: Sort order ("price-asc", "price-desc", "rating", "newest")
 *   - page: Page number for pagination (defaults to 1)
 *   - limit: Number of items per page (defaults to 12)
 */
export const getProducts = asyncHandler(async (req, res) => {
  // Destructure query parameters with fallback defaults
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    noCostOnly,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  // Initialize empty MongoDB query filter object
  const queryFilter = { isActive: true };

  // --------------------------------------------------------------------------
  // 1. Full-Text / Keyword Search Filter
  // --------------------------------------------------------------------------
  if (search && search.trim() !== '') {
    const trimmedSearch = search.trim();
    // Use MongoDB regex search across title, brand, and category for flexible matching
    queryFilter.$or = [
      { title: { $regex: trimmedSearch, $options: 'i' } },
      { brand: { $regex: trimmedSearch, $options: 'i' } },
      { category: { $regex: trimmedSearch, $options: 'i' } },
      { tags: { $in: [new RegExp(trimmedSearch, 'i')] } },
    ];
  }

  // --------------------------------------------------------------------------
  // 2. Category Filter
  // --------------------------------------------------------------------------
  if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
    queryFilter.category = category.trim();
  }

  // --------------------------------------------------------------------------
  // 3. Brand Filter
  // --------------------------------------------------------------------------
  if (brand && brand.trim() !== '' && brand.toLowerCase() !== 'all') {
    queryFilter.brand = brand.trim();
  }

  // --------------------------------------------------------------------------
  // 4. Price Range Filter (matches on indexed basePriceStored)
  // --------------------------------------------------------------------------
  if (minPrice || maxPrice) {
    queryFilter.basePriceStored = {};
    if (minPrice) {
      queryFilter.basePriceStored.$gte = Number(minPrice);
    }
    if (maxPrice) {
      queryFilter.basePriceStored.$lte = Number(maxPrice);
    }
  }

  // --------------------------------------------------------------------------
  // 5. No-Cost EMI Promotion Filter
  // --------------------------------------------------------------------------
  if (noCostOnly === 'true') {
    // Filter products having at least one EMI plan with isNoCost === true
    queryFilter['emiPlans.isNoCost'] = true;
  }

  // --------------------------------------------------------------------------
  // 6. Sorting Order
  // --------------------------------------------------------------------------
  let sortOption = { createdAt: -1 }; // Default: Newest first

  if (sort === 'price-asc') {
    sortOption = { basePriceStored: 1, _id: 1 };
  } else if (sort === 'price-desc') {
    sortOption = { basePriceStored: -1, _id: 1 };
  } else if (sort === 'rating') {
    sortOption = { rating: -1, reviewCount: -1 };
  } else if (sort === 'newest') {
    sortOption = { createdAt: -1 };
  }

  // --------------------------------------------------------------------------
  // 7. Pagination Execution
  // --------------------------------------------------------------------------
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));
  const skipCount = (pageNum - 1) * limitNum;

  // Execute count query to calculate total available items matching the filter
  const totalProducts = await Product.countDocuments(queryFilter);

  // Execute database query with filter, sort, pagination, and projection
  const products = await Product.find(queryFilter)
    .sort(sortOption)
    .skip(skipCount)
    .limit(limitNum);

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / limitNum);

  // Return standardized response containing data array and pagination metadata
  res.status(200).json({
    success: true,
    count: products.length,
    total: totalProducts,
    page: pageNum,
    totalPages: totalPages,
    data: products,
  });
});

/**
 * @desc    Fetch single product by its URL-friendly slug
 * @route   GET /api/products/:slug
 * @access  Public
 */
export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Find product by slug and ensure it is active
  const product = await Product.findOne({ slug: slug.toLowerCase(), isActive: true });

  // If product does not exist, throw 404 error
  if (!product) {
    res.status(404);
    throw new Error(`Product not found with slug: "${slug}"`);
  }

  // Return product document with virtual fields populated
  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Fetch distinct product categories with document counts using MongoDB Aggregation
 * @route   GET /api/products/meta/categories
 * @access  Public
 * 
 * Demonstrates MongoDB Aggregation Pipeline:
 *   Stage 1: $match - Filter active products only
 *   Stage 2: $group - Group by category and compute counts & minimum starting price
 *   Stage 3: $sort - Order categories alphabetically
 */
export const getCategories = asyncHandler(async (req, res) => {
  // Execute aggregation pipeline on Product collection
  const categories = await Product.aggregate([
    // Stage 1: Only include active catalog items
    {
      $match: { isActive: true },
    },
    // Stage 2: Group by category name and calculate document counts
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    // Stage 3: Project clean output shape
    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
      },
    },
    // Stage 4: Sort alphabetically
    {
      $sort: { category: 1 },
    },
  ]);

  // Return list of categories with item counts
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

/**
 * @desc    Fintech EMI Calculator Utility Endpoint
 * @route   POST /api/products/calculate-emi
 * @access  Public
 * 
 * Body Parameters:
 *   - principal: Loan principal / item price in INR (required)
 *   - tenureMonths: Duration in months (e.g. 3, 6, 9, 12, 18, 24)
 *   - annualRate: Annual interest rate percentage (0 for No-Cost EMI)
 *   - downPayment: Optional upfront cash down payment
 */
export const calculateEmi = asyncHandler(async (req, res) => {
  const { principal, tenureMonths, annualRate = 0, downPayment = 0 } = req.body;

  // Validate required inputs
  if (!principal || principal <= 0) {
    res.status(400);
    throw new Error('Valid principal loan amount is required.');
  }

  const VALID_TENURES = [3, 6, 9, 12, 18, 24];
  if (!tenureMonths || !VALID_TENURES.includes(Number(tenureMonths))) {
    res.status(400);
    throw new Error('Invalid tenure. Permitted financing tenures are 3, 6, 9, 12, 18, or 24 months.');
  }

  // Calculate net financed amount after deducting down payment
  const netLoanAmount = Math.max(0, Number(principal) - Number(downPayment));

  let monthlyInstallment = 0;
  let totalPayable = 0;
  let totalInterest = 0;

  if (Number(annualRate) === 0) {
    // 0% No-Cost EMI: Principal divided equally across tenure months
    monthlyInstallment = Math.round(netLoanAmount / tenureMonths);
    totalPayable = monthlyInstallment * tenureMonths;
    totalInterest = 0;
  } else {
    // Reducing Balance Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = Number(annualRate) / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyInstallment = Math.round((netLoanAmount * monthlyRate * factor) / (factor - 1));
    totalPayable = monthlyInstallment * tenureMonths;
    totalInterest = totalPayable - netLoanAmount;
  }

  // Return calculated EMI financing breakdown
  res.status(200).json({
    success: true,
    data: {
      principal: Number(principal),
      downPayment: Number(downPayment),
      netLoanAmount,
      tenureMonths: Number(tenureMonths),
      annualRate: Number(annualRate),
      monthlyInstallment,
      totalPayable,
      totalInterest,
      isNoCost: Number(annualRate) === 0,
    },
  });
});
