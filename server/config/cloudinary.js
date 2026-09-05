/**
 * ============================================================================
 * CLOUDINARY CONFIGURATION MODULE (cloudinary.js)
 * ============================================================================
 * Purpose:
 *   Configures the official Cloudinary Node.js SDK (v2) for uploading, managing,
 *   and delivering optimized product media assets over a global CDN.
 *
 * Why Cloudinary?
 *   1. Automatic Optimization: Automatically optimizes image format (WebP/AVIF)
 *      and quality based on client device and browser support.
 *   2. Responsive Transformations: Allows on-the-fly resizing, cropping, and
 *      watermarking without storing multiple physical files.
 *   3. Global CDN: Delivers images rapidly worldwide with high availability and caching.
 *   4. Zero Local Storage Burden: Eliminates the need to store large media files
 *      on the application server filesystem, making the server stateless.
 * Digital Asset Architecture:
 *   - Serves as the dedicated DAM layer for high-resolution product photography.
 *   - Returns CDN URLs with on-the-fly transformations and automatic WebP/AVIF formatting.
 *   - Keeps MongoDB documents lightweight and query performant.
 * ============================================================================
 */

// Import Cloudinary v2 SDK
import { v2 as cloudinary } from 'cloudinary';

// Import dotenv to ensure environment variables are accessible even if invoked directly
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

/**
 * Configure Cloudinary with secure credentials loaded from environment variables.
 * These credentials authenticate our application with the Cloudinary REST API.
 */
cloudinary.config({
  // The unique Cloudinary cloud name associated with the account
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  
  // Public API key for authentication
  api_key: process.env.CLOUDINARY_API_KEY,
  
  // Private API secret used to sign API requests securely (never expose to frontend!)
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
  // Enforce secure HTTPS URLs for all generated image asset delivery links
  secure: true,
});

/**
 * Helper function: uploadImageToCloudinary
 * Uploads an image URL or local file path to a designated folder in Cloudinary.
 * Applies optimal quality and format transformation parameters.
 * 
 * @param {string} imageSource - Web URL or local path of the image to upload
 * @param {string} folderName - Subfolder in Cloudinary to organize assets (e.g., '1fi-marketplace/products')
 * @returns {Promise<{url: string, public_id: string}>} Cloudinary response containing secure URL and asset ID
 */
export const uploadImageToCloudinary = async (imageSource, folderName = '1fi-marketplace/products') => {
  try {
    // Call the Cloudinary uploader API with configuration options
    const result = await cloudinary.uploader.upload(imageSource, {
      // Group assets into a dedicated folder for clean organization
      folder: folderName,
      // Automatic quality optimization: balances visual fidelity with minimal byte size
      quality: 'auto',
      // Automatic format selection: serves WebP or AVIF if supported by client browser
      fetch_format: 'auto',
      // Allow Cloudinary to overwrite if asset with same public_id exists
      overwrite: true,
    });

    // Return an object containing the secure HTTPS delivery URL and public asset ID
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    // Log error details to aid debugging during upload failures
    console.error(`[Cloudinary Upload Error]: Failed for source "${imageSource}" - ${error.message}`);
    // Re-throw the error so calling script or controller can handle it gracefully
    throw error;
  }
};

// Export the configured Cloudinary instance as default export
export default cloudinary;
