/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'main-1': '#0D1B2A',
        'main-2': '#1B263B',
        'main-3': '#415A77',
        'main-4': '#778DA9',
        'text-color': '#E0E1DD',
      },
    },
  },
  plugins: [],
}

