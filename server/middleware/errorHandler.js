/**
 * ============================================================================
 * CENTRALIZED ERROR HANDLER MIDDLEWARE (errorHandler.js)
 * ============================================================================
 * Purpose:
 *   Intercepts all errors thrown across route controllers and middleware.
 *   Sanitizes error responses, normalizes specific database errors (Mongoose
 *   CastError, ValidationError, duplicate key), and ensures consistent JSON formatting.
 *
 * Why Centralized Error Handling?
 *   1. Don't Repeat Yourself (DRY): Avoids repetitive try/catch blocks sending
 *      manual `res.status(500).json(...)` across dozens of controllers.
 *   2. Security Protection: Stack traces and internal database schemas are never
 *      exposed to external clients in production (`NODE_ENV === 'production'`).
 *   3. Client Consistency: Frontend clients (Axios) receive a deterministic schema:
 *      `{ success: false, message: "...", stack?: "..." }`.
 * Error Handling Architecture:
 *   - 4-parameter signature `(err, req, res, next)` flags this as a terminal Express error handler.
 *   - Translates Mongoose errors (CastError, ValidationError, duplicate key) into clean HTTP responses.
 *   - Prevents stack trace leakage in production.
 * ============================================================================
 */

/**
 * errorHandler:
 * Custom Express error-handling middleware.
 * 
 * @param {Error} err - Error object thrown by preceding middleware or controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function (unused here since this is the terminal handler)
 */
const errorHandler = (err, req, res, next) => {
  // If status code is already 200 (OK) when an error was thrown, default to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // --------------------------------------------------------------------------
  // Handle Mongoose Specific Errors
  // --------------------------------------------------------------------------

  // 1. CastError: Thrown when an invalid MongoDB ObjectId is supplied in params
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found: The requested ID format is invalid.';
  }

  // 2. ValidationError: Thrown when Mongoose schema validation constraints fail
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Collect all field validation error messages and join into a clean readable string
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // 3. Duplicate Key Error (code 11000): Thrown when unique index constraint is violated (e.g. slug)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: A record with that ${field} already exists.`;
  }

  // Log the error to server console for developer diagnostic review
  console.error(`[API Error]: ${statusCode} - ${message}`);

  // Send standardized JSON response to the client
  res.status(statusCode).json({
    success: false,
    message: message,
    // Only include stack trace during development to assist debugging; hide in production for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Export errorHandler as default export
export default errorHandler;
