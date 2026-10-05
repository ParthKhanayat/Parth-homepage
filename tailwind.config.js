/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['Bangers', 'cursive']
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      },
      colors: {
        'neon-green': '#39ff14',
        'hot-pink': '#ff69b4',
        'cartoon-yellow': '#ffde00',
        'cartoon-blue': '#00d2ff',
        'cartoon-purple': '#b533ff'
      }
    },
  },
  plugins: [],
}
