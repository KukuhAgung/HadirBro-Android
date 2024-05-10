/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264790",
        secondary: "#CD9832",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
