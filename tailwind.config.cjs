/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{html,js,ts,svelte}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#212034',
        secondary: '#2c2e3e',
        accent: '#50faab',
      }
    },
  },
  plugins: [],
}
