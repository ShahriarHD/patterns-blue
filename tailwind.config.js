
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: '600px',
      desktop: '900px',
    },
    fontFamily: {
      display: ['Noto Serif', ...defaultTheme.fontFamily.serif],
      body: [...defaultTheme.fontFamily.sans],
    },
    colors: {
      gray: {
        100: "#fefefe",
        200: "#e9e9e9",
        300: "#d2d2d2",
        400: "#bababa",
        500: "#9f9f9f",
        600: "#808080",
        700: "#5f5f5f",
        800: "#3d3d3d",
        900: "#1d1d1d",
      },
      blue: {
        100: "#bddcf7",
        200: "#99c9f0",
        300: "#75b6e6",
        400: "#51a1d7",
        500: "#2f8cc2",
        600: "#0f75a8",
        700: "#005e89",
        800: "#054767",
        900: "#0e3045",
      },
      'black-alpha': {
        100: 'rgba(0,0,0,0.1)',
        200: 'rgba(0,0,0,0.2)',
        300: 'rgba(0,0,0,0.3)',
        400: 'rgba(0,0,0,0.4)',
        500: 'rgba(0,0,0,0.5)',
        600: 'rgba(0,0,0,0.6)',
        700: 'rgba(0,0,0,0.7)',
        800: 'rgba(0,0,0,0.8)',
        900: 'rgba(0,0,0,0.9)',
      },
      'white-alpha': {
        100: 'rgba(255,255,255,0.1)',
        200: 'rgba(255,255,255,0.2)',
        300: 'rgba(255,255,255,0.3)',
        400: 'rgba(255,255,255,0.4)',
        500: 'rgba(255,255,255,0.5)',
        600: 'rgba(255,255,255,0.6)',
        700: 'rgba(255,255,255,0.7)',
        800: 'rgba(255,255,255,0.8)',
        900: 'rgba(255,255,255,0.9)',
      },
      accent: colors.amber,
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      current: 'currentColor',
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
