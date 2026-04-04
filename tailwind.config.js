/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './shared/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        board: {
          light: '#F0D9B5',
          dark: '#B58863',
        },
        brand: {
          primary: '#1B4F72',
          accent: '#2ECC71',
          danger: '#E74C3C',
        },
      },
    },
  },
  plugins: [],
}