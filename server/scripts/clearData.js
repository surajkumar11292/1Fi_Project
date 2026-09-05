/**
 * ============================================================================
 * DATABASE & CLOUDINARY CLEANUP SCRIPT (clearData.js)
 * ============================================================================
 * Purpose:
 *   Wipes all existing product data from the MongoDB Atlas database and removes
 *   all uploaded image assets from Cloudinary.
 *   Ensures a 100% clean slate before running new seed migrations or testing.
 *
 * Why is this script necessary?
 *   1. Eliminates duplicate or stale records that could skew API tests.
 *   2. Prevents orphaned image assets in Cloudinary from consuming account quota.
 *   3. Guarantees deterministic database state for reproducible demonstrations.
 * Operational Details:
 *   - Programmatically clears MongoDB collections and Cloudinary asset folder
 *     for staging resets and deterministic integration testing baselines.
 * ============================================================================
 */

// Import dotenv to load environment variables (.env) such as MONGO_URI and Cloudinary keys
import dotenv from 'dotenv';

// Import Mongoose to manage connection and execute drop/delete operations on MongoDB
import mongoose from 'mongoose';

// Import our custom database connection function
import connectDB from '../config/db.js';

// Import our configured Cloudinary instance
import cloudinary from '../config/cloudinary.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

/**
 * clearDatabaseAndMedia:
 * Main runner function that orchestrates cleanup of both MongoDB and Cloudinary.
 */
const clearDatabaseAndMedia = async () => {
  try {
    console.log('====================================================');
    console.log(' [CLEANUP] Starting Complete Data & Media Purge');
    console.log('====================================================');

    // ----------------------------------------------------
    // STEP 1: Connect to MongoDB Atlas
    // ----------------------------------------------------
    console.log('\n[1/3] Connecting to MongoDB Atlas...');
    await connectDB();

    // ----------------------------------------------------
    // STEP 2: Clear MongoDB Collections
    // ----------------------------------------------------
    console.log('\n[2/3] Purging MongoDB Collections...');
    
    // Retrieve all existing collections in the current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Log the collections found in the database
    console.log(`Found ${collections.length} collection(s) in database "${mongoose.connection.db.databaseName}":`);
    collections.forEach((c) => console.log(` - ${c.name}`));

    // Iterate through each collection and drop its contents
    for (const col of collections) {
      // Drop the collection completely, clearing both documents and temporary indexes
      await mongoose.connection.db.dropCollection(col.name);
      console.log(` -> Successfully dropped collection: "${col.name}"`);
    }

    console.log('MongoDB collections purged successfully.');

    // ----------------------------------------------------
    // STEP 3: Clear Cloudinary Media Assets
    // ----------------------------------------------------
    console.log('\n[3/3] Purging Cloudinary Media Assets in folder "1fi-marketplace"...');

    try {
      // Use Cloudinary's API to delete all resources with the prefix '1fi-marketplace'
      const cloudinaryResult = await cloudinary.api.delete_resources_by_prefix('1fi-marketplace', {
        // resource_type 'image' targets all uploaded product pictures
        resource_type: 'image',
      });

      console.log('Cloudinary resources deleted:', cloudinaryResult);

      // Attempt to delete empty folders under '1fi-marketplace'
      try {
        await cloudinary.api.delete_folder('1fi-marketplace/products');
        await cloudinary.api.delete_folder('1fi-marketplace');
        console.log('Cloudinary folders removed successfully.');
      } catch (folderErr) {
        // Folder might not be empty or might not exist yet; non-fatal
        console.log(`Cloudinary folder cleanup notice: ${folderErr.message}`);
      }

    } catch (cloudErr) {
      // If Cloudinary delete fails (e.g. folder doesn't exist yet), log warning and continue
      console.warn(`[Cloudinary Notice]: ${cloudErr.message || 'No assets found to delete.'}`);
    }

    console.log('\n====================================================');
    console.log(' [CLEANUP SUCCESS] System is clean and ready for seeding!');
    console.log('====================================================');

    // Close MongoDB connection gracefully before process exit
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    // Log unexpected errors during cleanup
    console.error('\n[CLEANUP ERROR]: Purge operation failed:', error);
    
    // Ensure connection is closed even on failure
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

// Execute the cleanup runner
clearDatabaseAndMedia();
