/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cashly-inspired Electric Purple & Lavender Design System
        purple: {
          950: '#150A2A',
          900: '#2A1054',
          850: '#3D1577',
          800: '#531DA1',
          750: '#6222BD',
          700: '#6D28D9',
          650: '#752DE0',
          600: '#7C3AED', // Primary vibrant purple
          500: '#8B5CF6',
          400: '#A855F7',
          300: '#C084FC',
          200: '#DDD6FE',
          100: '#EDE9FE',
          50: '#F5F3FF',
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F4EFFF',
          200: '#ECE4FE',
          300: '#DFD3FD',
          400: '#C4B5FD',
        },
        smartBg: '#F5F3FF',
        smartCard: '#FFFFFF',
        smartBorder: '#E6E0FA',
        smartText: {
          primary: '#1E1B4B',
          secondary: '#64748B',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(124, 58, 237, 0.06)',
        'card-hover': '0 10px 30px rgba(124, 58, 237, 0.12)',
        'purple-btn': '0 8px 25px rgba(124, 58, 237, 0.35)',
        'purple-glow': '0 0 30px rgba(124, 58, 237, 0.4)',
        'scanner-float': '0 10px 25px rgba(124, 58, 237, 0.45)',
        'dock': '0 -4px 25px rgba(124, 58, 237, 0.08)',
      }
    },
  },
  plugins: [],
}
