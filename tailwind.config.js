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
        orangeBg:"#EB7705",
        lightGreen:"#e9fa9c"
      },
      backgroundImage: {
        'custom-img': "url('/src/Assets/img_1.png')",
        'custom-img2': "url('/src/Assets/img_5.png')",
        'brain-img': "url('/src/Assets/img_3.png')",
      }
    },
  },
  plugins: [],
}
