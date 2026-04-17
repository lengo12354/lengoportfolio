/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arp', 'system-ui', 'sans-serif'],
        display: ['Arp', 'system-ui', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#2563eb',
        'neon-purple': '#7c3aed',
      }
    },
  },
  plugins: [],
}
