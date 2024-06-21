/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./*.{html,js}",
    "./dist/*.{html,js}",
    "./js/*.js",
    "!./js/web3.min.js",
  ],
  theme: {
    colors: {
      main: "#364659",
      secondary: "#fffcf9",
      blue: "#DAECFC",
      orange: "#FCECDA",
      error: "#ff7272",
    },
  },
  plugins: [],
};
