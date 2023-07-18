// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  

  theme: {
    extend: {},
  },
  plugins: [],
});

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#2980b9",
        secondary: "#ffc107",
        danger: "#dc3545",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
