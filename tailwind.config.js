module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  variants: {
    textColor: ['visited'],
  },
  plugins: [],
  theme: {
    inset: {
      '1/2': '50%',
    },
  },
}
