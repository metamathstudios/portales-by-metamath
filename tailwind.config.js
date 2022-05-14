module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#141414',
        'button-grey': '#1E1E1E',
        'button-blue': '#325BCE',
        'secondary-grey': '#565656',
      },
      fontFamily: {
        'lalezar': ["'Lalezar'", 'cursive']
      }
    },
  },
  plugins: [],
}
