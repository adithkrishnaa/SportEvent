module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          "0%, 100%": {
            transform: "scale(0.95)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        bounceIn: "bounceIn 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
