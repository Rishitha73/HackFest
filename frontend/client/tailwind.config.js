/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#FFFFFF',
        'secondary-bg': '#F5F5F5',
        'text-primary': '#000000',
        'text-secondary': '#333333',
        'accent': '#666666',
        'disabled': '#999999',
        'border': '#EEEEEE',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
