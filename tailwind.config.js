module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px theme('colors.cyan.500'), 0 0 10px theme('colors.cyan.500'), 0 0 15px theme('colors.cyan.500')"
          },
          "100%": {
            boxShadow:
              "0 0 20px theme('colors.cyan.500'), 0 0 35px theme('colors.cyan.500'), 0 0 50px theme('colors.cyan.500')"
          }
        }
      },
      animation: {
        glow: "glow 0.3s ease-in-out"
      }
    }
  },
  plugins: []
};
