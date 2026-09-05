/**
 * ============================================================================
 * VITE BUILD TOOL CONFIGURATION (vite.config.js)
 * ============================================================================
 * Purpose:
 *   Configures Vite for high-speed local development with Hot Module
 *   Replacement (HMR), React Fast Refresh via @vitejs/plugin-react,
 *   and reverse proxy support to the Express backend.
 *
 * Why Vite over Create React App?
 *   1. ESbuild Pre-bundling: Cold starts are under 300ms compared to CRA's 30+ seconds.
 *   2. Native ESM-based HMR: Only edited modules are invalidated, keeping state intact.
 *   3. Modern Build Pipeline: Uses Rollup for highly optimized production bundles.
 * Proxy Configuration:
 *   - Configures development proxy (/api -> http://127.0.0.1:5000) so frontend
 *     relative calls work seamlessly in local dev without CORS friction.
 * ============================================================================
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Register React plugin with Fast Refresh enabled
  plugins: [react()],

  server: {
    // Port for the client local dev server
    port: 5173,
    // Bind to 127.0.0.1 (localhost) for security compliance
    host: '127.0.0.1',
    // Automatically open browser on server startup (optional, set to false for headless)
    open: false,
    // Reverse proxy API calls to the Express backend running on port 5000
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    // Target modern ES2020 JavaScript for smaller, faster output bundles
    target: 'es2020',
    // Output folder for production build
    outDir: 'dist',
    // Generate source maps for easier production debugging
    sourcemap: true,
  },
});
