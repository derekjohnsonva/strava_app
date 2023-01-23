/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
    colors: {
      'background': '#3C3836',
      'orange': '#D65D0E',
      'green': '#98971A',
      'blue': '#458588',
      'red': '#CC241D',
      'purple': '#B16286',
      'grey-light': '#A89984',
    },
    extend: {},
  },
  plugins: [],
}
