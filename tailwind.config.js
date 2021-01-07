const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      green: colors.green,
      red: colors.rose,
      teal: colors.teal,
      amber: colors.amber,
      white: colors.white,
    },
    fontFamily: {
      sans: ['-apple-system', 'ui-sans-serif'],
      serif: ['Georgia', 'ui-serif'],
    },
    container: {
      padding: '2rem',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  variants: {
    fill: [],
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
