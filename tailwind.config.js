/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2D5D',
          dark:    '#152348',
          light:   '#253576',
        },
      },
    },
  },
  plugins: [],
}

