/**
 * ============================================================================
 * MAIN SERVER ENTRY POINT (server.js)
 * ============================================================================
 * Purpose:
 *   Initializes the Express.js application, configures security & logging middleware,
 *   connects to MongoDB Atlas, mounts API routes, and binds the HTTP server listener.
 *
 * Architecture Highlights:
 *   - ES Modules (`import/export`) for modern JavaScript syntax.
 *   - CORS protection restricting cross-origin access to trusted frontend clients.
 *   - Morgan dev logger for request tracing and performance debugging.
 *   - Centralized error and 404 middleware pipeline.
 *   - Listens on 127.0.0.1 (localhost) for secure local development.
 *
 * Middleware Architecture:
 *   - Security & Parsing: CORS with allowed origins, express.json with 1mb limit
 *   - Observability: Morgan request logger for operational tracing
 *   - Routing: Health check, product catalog, and EMI calculations
 *   - Error Handling: Centralized notFound and errorHandler pipeline
 * ============================================================================
 */

// Import core Node.js path module for working with directory paths
import path from 'path';

// Import dotenv to load variables from .env file into Node's process.env
import dotenv from 'dotenv';

// Import Express web application framework
import express from 'express';

// Import Cross-Origin Resource Sharing (CORS) middleware
import cors from 'cors';

// Import Morgan HTTP request logger middleware
import morgan from 'morgan';

// Import database connection configuration
import connectDB from './config/db.js';

// Import product route definitions
import productRoutes from './routes/productRoutes.js';

// Import custom 404 and global error handling middleware
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables immediately before initializing dependencies
dotenv.config();

// Initialize MongoDB Atlas connection
connectDB();

// Create an Express application instance
const app = express();

// Set active port from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Determine environment mode
const NODE_ENV = process.env.NODE_ENV || 'development';

// ----------------------------------------------------------------------------
// MIDDLEWARE CONFIGURATION
// ----------------------------------------------------------------------------

// 1. CORS Configuration: Restrict API access to frontend origin
const allowedOrigins = [
  'http://localhost:5173', // Vite default development port
  'http://localhost:3000', // Alternative React port
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,  // Custom domain if configured in .env
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman) in development
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 2. Body Parser: Enables Express to parse incoming JSON payloads up to 1MB
app.use(express.json({ limit: '1mb' }));

// 3. URL-Encoded Body Parser: Parses form data and query strings up to 1MB
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. HTTP Security Headers: Basic defensive headers
app.use((req, res, next) => {
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking by denying framing
  res.setHeader('X-Frame-Options', 'DENY');
  // Pass control to next middleware
  next();
});

// 5. Morgan Logger: Logs HTTP method, URL, status code, and response time in development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ----------------------------------------------------------------------------
// API ROUTES
// ----------------------------------------------------------------------------

// Root endpoint for platform health checks (Render, Railway, Uptime monitors)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: '1Fi Marketplace API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint for uptime monitoring and load balancers
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: '1Fi Marketplace API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Mount product catalog and fintech EMI routes
app.use('/api/products', productRoutes);

// ----------------------------------------------------------------------------
// ERROR HANDLING PIPELINE
// ----------------------------------------------------------------------------

// Fallback for any unmatched route paths (404)
app.use(notFound);

// Centralized error handling middleware (catches all thrown exceptions)
app.use(errorHandler);

// ----------------------------------------------------------------------------
// SERVER INITIALIZATION
// ----------------------------------------------------------------------------

// Bind HTTP listener to localhost (127.0.0.1) for secure development
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(` 1Fi Marketplace API Server Running!`);
  console.log(` Environment : ${NODE_ENV}`);
  console.log(` Local URL   : http://127.0.0.1:${PORT}`);
  console.log(` Health Check: http://127.0.0.1:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

// Handle server startup errors (e.g. port already in use)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[Server Error]: Port ${PORT} is already in use by another active process.`);
    console.error(`If a previous instance is still running, terminate it or run 'kill $(lsof -t -i:${PORT})' / taskkill.\n`);
  } else {
    console.error(`[Server Initialization Error]: ${err.message}`);
  }
  process.exit(1);
});

// Graceful shutdown handling for SIGINT (Ctrl+C) and SIGTERM
process.on('SIGINT', () => {
  console.log('\n[Server Shutdown]: Received SIGINT. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('[Server Closed]: All connections terminated.');
    process.exit(0);
  });
});

export default app;
