/**
 * ============================================================================
 * DATABASE CONFIGURATION MODULE (db.js)
 * ============================================================================
 * Purpose:
 *   Establishes and manages a resilient connection to MongoDB Atlas using Mongoose.
 *   Provides connection logging, event listeners, and graceful error handling.
 *
 * Why Mongoose?
 *   Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 *   It provides schema-based validation, middleware, virtuals, and strong typing
 *   to ensure our product, variant, and EMI data adheres to a consistent structure.
 *
 * Architectural Notes:
 *   - Database connection logic is isolated from Express routing for modular lifecycle management.
 *   - Connection pool listeners handle reconnects and disconnect warnings gracefully.
 * ============================================================================
 */

// Import Mongoose library to manage MongoDB schemas, models, and connection pool
import mongoose from 'mongoose';

/**
 * connectDB:
 * Asynchronous function that initiates connection to MongoDB Atlas.
 * Reads MONGO_URI from process.env (loaded via dotenv in server.js).
 * 
 * @returns {Promise<void>} Resolves when connection succeeds, or exits process on failure
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB Atlas cluster using the connection URI
    // The URI contains credentials, host cluster address, database name (onefi_db), and query params
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // autoIndex is enabled by default in development to create indexes for search & slugs
      autoIndex: true,
      // Maximum number of connections in the connection pool for handling concurrent requests
      maxPoolSize: 10,
      // Time in milliseconds before a socket times out due to inactivity
      serverSelectionTimeoutMS: 5000,
      // Keep alive prevents stale connection drops in long-running node instances
      socketTimeoutMS: 45000,
    });

    // Log the successful connection along with the connected host name for debugging
    console.log(`[MongoDB Connected]: Host -> ${conn.connection.host} | DB -> ${conn.connection.name}`);

    // Register event listener for runtime connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error(`[MongoDB Runtime Error]: ${err.message}`);
    });

    // Register event listener for unexpected disconnections
    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB Disconnected]: Lost connection to MongoDB Atlas. Retrying...');
    });

  } catch (error) {
    // If the initial connection fails, log detailed error information for troubleshooting
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    
    // Exit the Node.js runtime with status code 1 (failure)
    // In production container environments (Docker/Kubernetes), this triggers a pod restart
    process.exit(1);
  }
};

// Export connectDB as the default export so server.js and seed scripts can invoke it
export default connectDB;
