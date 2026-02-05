/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014", // Example color
        secondary: "#151312", // Example color
        light: {
          100: "#d5c6ff",
          200: "#a5aee6",
          300: "#7b8dff",
        },
        dark: {
          100: "#151312",
          200: "#030014",
          300: "#000000",
        },
        accent: "#ffcc00", // Example color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
