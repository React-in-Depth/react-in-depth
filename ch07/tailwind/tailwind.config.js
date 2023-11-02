/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        hbounce: "hbounce .2s ease-in-out alternate infinite",
      },
      keyframes: {
        hbounce: {
          from: { left: "0" },
          to: { left: "10px" },
        },
      },
    },
  },
  plugins: [],
};
