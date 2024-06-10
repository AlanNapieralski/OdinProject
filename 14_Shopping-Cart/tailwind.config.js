/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3c6e71',
        secondary: '#284b63',
        black: '#353535',
        light: '#d9d9d9'
      }
    },
    
  },
  plugins: [],
}

