/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Sora', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          pink: '#ec4899',
          purple: '#a855f7',
          blue: '#0ea5e9',
        },
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(14,165,233,0.25), transparent 50%)',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
        glass: '0 25px 60px rgba(15, 23, 42, 0.20)',
        card: '0 15px 35px rgba(99, 102, 241, 0.15)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.85 },
        },
        'fade-slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float-slow 6s ease-in-out infinite',
        pulseSoft: 'pulse-soft 2.5s ease-in-out infinite',
        fadeSlideUp: 'fade-slide-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

