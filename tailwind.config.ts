/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-in-from-right': 'slideIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { 
            opacity: '0',
          },
          '100%': { 
            opacity: '1',
          },
        },
        slideIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
