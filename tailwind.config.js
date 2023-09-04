/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ED8223',
      },
      fontFamily: {
        'skylar': ['Skylar Sans', 'sans-serif']
      }
    }
  },
  plugins: [],
}

