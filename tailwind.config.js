/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors:{
        orangeBg:"#EB7705"
      },
      backgroundImage: {
        'custom-img': "url('/src/Assets/img_1.png')"
      }
    },
  },
  plugins: [],
}
