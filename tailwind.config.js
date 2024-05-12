/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264790",
        secondary: "#FCBE45",
        primaryvariant: "#305DC1",
        bordersecondary: "#CD9832",
        check1: "#3FD945",
        check2: "#FCBE45",
        check3: "#FC5050",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
