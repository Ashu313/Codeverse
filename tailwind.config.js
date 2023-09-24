 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-standard': '#22223B',
        'purple-dark': '#4A4E69',
        'orange-standard': '#EE9B00',
        'gray-standard': '#1F2833'
      }
    },
  },
  plugins: [],
}