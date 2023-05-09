/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        dark: {
          700: "#1e1e1e",
          900: "#171717",
          600: "#2D2D2D",
        },
        primary: "#A9EE00",
      },
    },
  },
  plugins: [],
};
