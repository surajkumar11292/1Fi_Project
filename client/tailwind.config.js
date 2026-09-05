/**
 * ============================================================================
 * TAILWIND CSS CONFIGURATION (tailwind.config.js)
 * ============================================================================
 * Purpose:
 *   Extends Tailwind CSS utility classes with the authentic 1Fi Fintech Design System:
 *     - Font: Plus Jakarta Sans (matching 1fi.in & app.1fi.in)
 *     - Primary Purple: #6C2BD9 / #7C3AED (1Fi brand identity)
 *     - Deep Purple Banner: #24126A / #3B1578 / #4C1D95
 *     - Light Purple Tints: #FAF8FF / #F4F0FF / #ECE5FF
 *     - Clean White Surfaces: #FFFFFF with soft shadows
 * ============================================================================
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // 1Fi Brand Purple Spectrum
        brand: {
          50: '#FAF8FF',
          100: '#F4F0FF',
          200: '#E8DEFF',
          300: '#D5C4FE',
          400: '#B89CFD',
          500: '#9466FA',
          600: '#6C2BD9', // 1Fi Official Core Purple
          700: '#5B21B6',
          800: '#4C1D95', // Deep Banner Purple
          900: '#2E1065',
          950: '#1D0846',
        },
        // Fintech Accent Colors
        fintech: {
          green: '#10B981',
          greenBg: '#ECFDF5',
          amber: '#F59E0B',
          amberBg: '#FFFBEB',
          blue: '#2563EB',
          blueBg: '#EFF6FF',
        },
        surface: {
          card: '#FFFFFF',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          subtle: '#F1F5F9',
        },
      },
      fontFamily: {
        // Authentic 1Fi Typography: Plus Jakarta Sans
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 28px -6px rgba(108, 43, 217, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'dock': '0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 1px 4px 0 rgba(0, 0, 0, 0.02)',
        'purple-glow': '0 0 24px -2px rgba(108, 43, 217, 0.35)',
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  plugins: [],
};
