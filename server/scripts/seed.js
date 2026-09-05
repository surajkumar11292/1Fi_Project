/**
 * ============================================================================
 * DATABASE SEEDING ENGINE (seed.js)
 * ============================================================================
 * Purpose:
 *   Seeds the MongoDB Atlas database with rich product catalog data and uploads
 *   product photography assets to Cloudinary CDN.
 *   Calculates authentic fintech EMI repayment tiers (No-Cost EMI and standard
 *   interest options) dynamically for each product's base price.
 *
 * Why dynamic EMI generation?
 *   In real fintech platforms like 1Fi or Snapmint, EMI plans are derived from
 *   lender risk tables and product price thresholds. By programmatically generating
 *   3, 6, 9, 12, and 24-month tenures, we ensure accurate math without manual errors.
 * Seeding Mechanics:
 *   - Mathematical EMI calculation for 0% No-Cost and reducing-balance tenures.
 *   - High-resolution asset upload to Cloudinary CDN with fallback handling.
 *   - Materialized basePriceStored computation for indexed sorting.
 * ============================================================================
 */

// Import dotenv to access MONGO_URI and Cloudinary API credentials
import dotenv from 'dotenv';

// Import Mongoose to manage database connection and lifecycle
import mongoose from 'mongoose';

// Import custom database connection utility
import connectDB from '../config/db.js';

// Import the Product Mongoose Model
import Product from '../models/Product.js';

// Import the curated raw products dataset
import { rawProducts } from '../data/seedData.js';

// Import Cloudinary upload helper
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

/**
 * calculateEmiPlan:
 * Mathematical helper function to compute monthly installment for a given tenure and rate.
 * 
 * @param {number} principal - Product selling price in INR
 * @param {number} tenureMonths - Number of repayment months (e.g., 3, 6, 9, 12, 24)
 * @param {number} annualRate - Annual interest rate percentage (0 for No-Cost EMI)
 * @param {boolean} isNoCost - Flag designating whether merchant subsidizes interest
 * @returns {object} Formatted EmiPlan subdocument object
 */
const calculateEmiPlan = (principal, tenureMonths, annualRate, isNoCost = false) => {
  let monthlyInstallment = 0;

  if (annualRate === 0 || isNoCost) {
    // 0% No-Cost EMI: Simple division with rounding to nearest rupee
    monthlyInstallment = Math.round(principal / tenureMonths);
  } else {
    // Standard Reducing Balance Loan Formula
    const monthlyRate = annualRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyInstallment = Math.round((principal * monthlyRate * factor) / (factor - 1));
  }

  // Calculate processing fee: ₹0 for 3 & 6 months No-Cost, or nominal ₹199 for longer tenures
  const processingFee = isNoCost ? 0 : 199;

  // Calculate cashback incentive for select No-Cost EMI promotions (e.g. ₹500 on 6-month plans)
  const cashbackAmount = isNoCost && tenureMonths === 6 ? 500 : 0;

  return {
    tenureMonths,
    interestRate: annualRate,
    monthlyInstallment,
    downPayment: 0, // ₹0 down payment promotion
    processingFee,
    isNoCost,
    cashbackAmount,
    minTransactionAmount: 5000,
  };
};

/**
 * generateEmiPlansForProduct:
 * Generates a standard suite of 5 diverse EMI plans for a given product price:
 *   - 3 Months: 0% No-Cost EMI (Shortest tenure, highest installment)
 *   - 6 Months: 0% No-Cost EMI + ₹500 Cashback (Most popular 1Fi promotion)
 *   - 9 Months: 12% Low-interest financing
 *   - 12 Months: 14% Annual interest financing
 *   - 24 Months: 16% Extended financing (Lowest monthly installment)
 * 
 * @param {number} price - Lowest variant price in INR
 * @returns {Array<object>} Array of 5 configured EmiPlan objects
 */
const generateEmiPlansForProduct = (price) => {
  return [
    calculateEmiPlan(price, 3, 0, true),
    calculateEmiPlan(price, 6, 0, true),
    calculateEmiPlan(price, 9, 12, false),
    calculateEmiPlan(price, 12, 14, false),
    calculateEmiPlan(price, 24, 16, false),
  ];
};

/**
 * seedCatalog:
 * Main runner function that uploads media to Cloudinary and seeds MongoDB.
 */
const seedCatalog = async () => {
  try {
    console.log('====================================================');
    console.log(' [SEEDING] Starting 1Fi Marketplace Data Seeding');
    console.log('====================================================\n');

    // ----------------------------------------------------
    // STEP 1: Connect to MongoDB Atlas
    // ----------------------------------------------------
    console.log('[1/4] Connecting to MongoDB Atlas...');
    await connectDB();

    // ----------------------------------------------------
    // STEP 2: Clear existing products in DB
    // ----------------------------------------------------
    console.log('[2/4] Removing existing Product documents...');
    await Product.deleteMany({});
    console.log(' -> Product collection reset.');

    // ----------------------------------------------------
    // STEP 3: Process and Upload Media to Cloudinary
    // ----------------------------------------------------
    console.log('[3/4] Processing images and uploading to Cloudinary CDN...');

    const seededProducts = [];

    // Loop through each product definition sequentially to maintain rate limit compliance
    for (let i = 0; i < rawProducts.length; i++) {
      const p = rawProducts[i];
      console.log(`\n -> [${i + 1}/${rawProducts.length}] Processing "${p.title}"...`);

      const uploadedImages = [];

      // Iterate through source photography URLs for this product
      for (let j = 0; j < p.sourceImages.length; j++) {
        const sourceUrl = p.sourceImages[j];
        try {
          console.log(`    Uploading image ${j + 1}/${p.sourceImages.length} to Cloudinary...`);
          const uploadResult = await uploadImageToCloudinary(sourceUrl, '1fi-marketplace/products');

          uploadedImages.push({
            url: uploadResult.url,
            publicId: uploadResult.publicId,
            alt: `${p.title} view ${j + 1}`,
            isPrimary: j === 0, // First image is flagged as primary
          });
        } catch (uploadErr) {
          console.warn(`    Cloudinary upload failed for image ${j + 1}, using fallback source URL.`);
          // Fallback gracefully to direct source image if Cloudinary network request fails
          uploadedImages.push({
            url: sourceUrl,
            publicId: `fallback_${p.slug}_${j + 1}`,
            alt: `${p.title} view ${j + 1}`,
            isPrimary: j === 0,
          });
        }
      }

      // Attach uploaded images to each product variant
      const variantsWithImages = p.variants.map((variant) => ({
        ...variant,
        images: uploadedImages,
      }));

      // Calculate lowest price across all variants to establish base price
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));

      // Generate dynamic EMI plans based on the product's lowest price
      const emiPlans = generateEmiPlansForProduct(lowestPrice);

      // Assemble final product document for insertion
      const productDocument = {
        title: p.title,
        slug: p.slug,
        brand: p.brand,
        category: p.category,
        tagline: p.tagline,
        description: p.description,
        highlights: p.highlights,
        badge: p.badge,
        isFeatured: p.isFeatured,
        rating: p.rating,
        reviewCount: p.reviewCount,
        tags: p.tags,
        variants: variantsWithImages,
        emiPlans: emiPlans,
        basePriceStored: lowestPrice,
        isActive: true,
      };

      seededProducts.push(productDocument);
    }

    // ----------------------------------------------------
    // STEP 4: Insert Products into MongoDB Atlas
    // ----------------------------------------------------
    console.log('\n[4/4] Inserting products into MongoDB Atlas...');
    const inserted = await Product.insertMany(seededProducts);
    console.log(` -> Successfully inserted ${inserted.length} products!`);

    console.log('\n====================================================');
    console.log(' [SEEDING COMPLETE] Product Catalog is live in Atlas!');
    console.log('====================================================');

    // Display summary of created products for quick visual confirmation
    inserted.forEach((item, idx) => {
      console.log(` ${idx + 1}. [${item.category}] ${item.title}`);
      console.log(`    Starting Price: ₹${item.basePrice?.toLocaleString('en-IN') || 'N/A'}`);
      console.log(`    Starting EMI: ₹${item.startingEmi?.toLocaleString('en-IN') || 'N/A'}/month`);
      console.log(`    Variants: ${item.variants.length} | EMI Plans: ${item.emiPlans.length}`);
    });

    // Close Mongoose connection cleanly
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n[SEEDING ERROR]: Fatal error during seed execution:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Execute seeding runner
seedCatalog();
