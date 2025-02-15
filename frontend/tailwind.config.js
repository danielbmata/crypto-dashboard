/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        dark: {
          DEFAULT: '#1a1a1a',
          'lighter': '#2d2d2d'
        }
      }
    },
  },
  plugins: [],
} 