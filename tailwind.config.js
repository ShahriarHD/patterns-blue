
const defaultTheme = require('tailwindcss/defaultTheme');

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
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
