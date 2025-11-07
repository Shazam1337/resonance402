/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wave-acid-yellow': '#C3FF1F',
        'wave-cyan': '#00FFE1',
        'wave-gray': '#C0C0C0',
        'wave-dark-gray': '#202020',
        'wave-light-yellow': '#E3FF69',
        'wave-black': '#000000',
      },
      fontFamily: {
        'mono': ['IBM Plex Mono', 'monospace'],
        'mono-title': ['Space Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'glitch': 'glitch 0.3s',
        'wave': 'wave 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-neon': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px #C3FF1F',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 40px #C3FF1F, 0 0 60px #C3FF1F',
          },
        },
      },
    },
  },
  plugins: [],
}
