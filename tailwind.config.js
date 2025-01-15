/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#2C3E50',
        cyan: '#1ABC9C',
        lavender: '#D7BDE2',
        sunset: '#E74C3C',
        golden: '#F1C40F',
      },
    },
  },
  plugins: [],
}
