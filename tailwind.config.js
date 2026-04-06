/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Britanica', 'system-ui', 'sans-serif'],
        display: ['Britanica', 'system-ui', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#2563eb',
        'neon-purple': '#7c3aed',
      }
    },
  },
  plugins: [],
}
