// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // Vite’s entry HTML
    "./public/index.html",         // if you have a public/ folder
    "./src/**/*.{js,jsx,ts,tsx}",  // all of your React components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          500: '#1a202c',
          700: '#2d3748',
        },
      },
    },
  },
  plugins: [],
}
