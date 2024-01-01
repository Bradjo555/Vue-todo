/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',

  theme: {
    extend: {     
      fontFamily: {
        "Poppins" : "Poppins",
        "Syne" : "Syne",
        "Epilogue" : "Epilogue"
    },
    colors: {
      "background" : "rgba(12, 12, 12, 1)",
      "border" : "rgba(24, 24, 24, 1)",
      "border-highlight" : "rgba(44, 44, 44, 1)",
      "primary" : "#48bc84"
    }
  },
  },
  plugins: [],
}