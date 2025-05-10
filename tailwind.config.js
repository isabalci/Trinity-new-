/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tradingview-blue': '#2962FF',
        'tradingview-green': '#089981',
        'tradingview-red': '#F23645',
        'tradingview-dark': '#131722',
        'tradingview-light': '#D1D4DC',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
} 