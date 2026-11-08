/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parisian: {
          blue: '#1E3A8A',
          blueHover: '#172554',
          sky: '#38BDF8',
          red: '#E11D48',
          redHover: '#BE123C',
          cream: '#FDFBF7',
          gold: '#EAB308',
          warmGray: '#F3EFEA',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'card': '0 20px 40px -15px rgba(30, 58, 138, 0.08)',
        'glow': '0 0 25px -5px rgba(225, 29, 72, 0.25)',
      }
    },
  },
  plugins: [],
}
