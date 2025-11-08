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
        'cryo-bg': '#0C0F13',
        'cryo-electric-blue': '#4DE1FF',
        'cryo-turquoise': '#00BFA6',
        'cryo-ice-lime': '#C9FFD9',
        'cryo-text': '#E6EAF0',
        'cryo-steel': '#3A424D',
      },
      fontFamily: {
        'mono': ['IBM Plex Mono', 'monospace'],
        'mono-title': ['Orbitron', 'Space Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'cryo-pulse': 'cryo-pulse 3s ease-in-out infinite',
        'cryo-glow': 'cryo-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'cryo-pulse': {
          '0%, 100%': { 
            opacity: '0.6',
            boxShadow: '0 0 10px rgba(77, 225, 255, 0.3)',
          },
          '50%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(77, 225, 255, 0.6), 0 0 30px rgba(77, 225, 255, 0.4)',
          },
        },
        'cryo-glow': {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(77, 225, 255, 0.5), 0 0 10px rgba(77, 225, 255, 0.3)',
          },
          '50%': { 
            textShadow: '0 0 10px rgba(77, 225, 255, 0.8), 0 0 20px rgba(77, 225, 255, 0.5), 0 0 30px rgba(77, 225, 255, 0.3)',
          },
        },
      },
    },
  },
  plugins: [],
}
