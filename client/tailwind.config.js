module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        fadeInDelay: 'fadeIn 1.5s ease-in',
        fadeInDelay2: 'fadeIn 2s ease-in',
        slideIn: 'slideIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
