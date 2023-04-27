/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/**/*.scss",  "./app/**/*.{js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
          "--rounded-btn": "0.25rem",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
