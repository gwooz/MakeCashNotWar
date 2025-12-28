/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        accent: "#06b6d4",
        glow: "#a5f3fc"
      }
    }
  },
  plugins: []
};
