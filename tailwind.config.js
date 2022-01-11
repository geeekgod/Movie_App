module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "back-g": "#0b6583",
        "search-bar": "rgba(255, 255, 255, 0.7)",
        "card-cont": "#073a4b",
      },
      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [],
};
