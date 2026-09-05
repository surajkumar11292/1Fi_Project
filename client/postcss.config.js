/**
 * ============================================================================
 * POSTCSS CONFIGURATION (postcss.config.js)
 * ============================================================================
 * Purpose:
 *   Configures PostCSS processing pipeline with Tailwind CSS and Autoprefixer.
 *   Tailwind parses utility classes, and Autoprefixer appends vendor prefixes
 *   (-webkit-, -moz-) to CSS rules according to CanIUse browser data.
 * ============================================================================
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
