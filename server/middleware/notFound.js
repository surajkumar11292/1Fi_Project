/**
 * ============================================================================
 * 404 NOT FOUND MIDDLEWARE (notFound.js)
 * ============================================================================
 * Purpose:
 *   Catches any HTTP requests that do not match any registered routes on the
 *   Express server and forwards a standardized 404 Not Found error to the central
 *   error-handling pipeline.
 *
 * Why an explicit 404 middleware?
 *   By default, Express returns a plain HTML or blank 404 response for unmatched routes.
 *   In a RESTful JSON API architecture, all responses (including errors) should be
 *   predictably formatted JSON objects so that frontend API clients can parse them cleanly.
 * Pipeline Positioning:
 *   - Placed immediately after all registered API routes so unmatched paths receive
 *     a consistent JSON 404 response rather than default Express HTML.
 * ============================================================================
 */

/**
 * notFound middleware:
 * Creates an Error object with the requested URL and forwards it with HTTP status 404.
 * 
 * @param {object} req - Express incoming request object
 * @param {object} res - Express outgoing response object
 * @param {function} next - Express next middleware callback function
 */
const notFound = (req, res, next) => {
  // Construct a descriptive error message stating the method and path that failed to match
  const error = new Error(`Resource Not Found - [${req.method}] ${req.originalUrl}`);

  // Explicitly set the HTTP response status code to 404 (Not Found)
  res.status(404);

  // Pass the error object to the next middleware in the chain (which will be errorHandler.js)
  next(error);
};

// Export notFound function as default export
export default notFound;
