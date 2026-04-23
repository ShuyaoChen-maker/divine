/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D1B4E',
          light: '#4A3460',
          dark: '#1A1128',
        },
        accent: {
          DEFAULT: '#8B7AA0',
          hover: '#C4A7D7',
        },
        background: {
          DEFAULT: '#0F0A1A',
          elevated: '#1A1128',
          hover: '#251A38',
        },
        text: {
          primary: '#E8E0F0',
          secondary: '#A99BC0',
          muted: '#6B5B80',
        },
        gold: '#D4AF37',
        starlight: '#E6D5F2',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'SimSun', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}