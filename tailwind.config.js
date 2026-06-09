/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        space:  ['"Space Grotesk"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono:   ['"DM Mono"', 'monospace'],
      },
      colors: {
        purple:  { DEFAULT: '#A855F7', dark: '#7C3AED', light: '#C084FC' },
        cyan:    { DEFAULT: '#22D3EE', dark: '#06B6D4', light: '#67E8F9' },
        pink:    { DEFAULT: '#F472B6', dark: '#EC4899', light: '#F9A8D4' },
        lime:    { DEFAULT: '#A3E635', dark: '#84CC16', light: '#BEF264' },
        orange:  { DEFAULT: '#FB923C', dark: '#F97316', light: '#FDBA74' },
        canvas:  '#FFF0F8',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatEmoji: {
          '0%':   { transform: 'translateY(0) rotate(0deg)',           opacity: '0.9' },
          '20%':  { transform: 'translateY(-22vh) translateX(14px) rotate(40deg)',  opacity: '0.75' },
          '40%':  { transform: 'translateY(-44vh) translateX(-10px) rotate(80deg)', opacity: '0.55' },
          '65%':  { transform: 'translateY(-66vh) translateX(18px) rotate(120deg)', opacity: '0.3' },
          '100%': { transform: 'translateY(-108vh) translateX(5px) rotate(180deg)', opacity: '0' },
        },
        blobFloat: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
        neonPulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        spin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        filmScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        filmFloat: {
          '0%, 100%': { transform: 'perspective(1200px) rotateX(20deg) rotateY(-6deg) translateY(0px)' },
          '50%':      { transform: 'perspective(1200px) rotateX(17deg) rotateY(-4deg) translateY(-12px)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(168,85,247,0.4)' },
          '33%':      { borderColor: 'rgba(34,211,238,0.5)' },
          '66%':      { borderColor: 'rgba(244,114,182,0.4)' },
        },
      },
      animation: {
        fadeUp:       'fadeUp 0.7s ease-out forwards',
        fadeIn:       'fadeIn 0.6s ease-out forwards',
        slideInLeft:  'slideInLeft 0.7s ease-out forwards',
        slideInRight: 'slideInRight 0.7s ease-out forwards',
        slideInUp:    'slideInUp 0.6s ease-out forwards',
        floatEmoji:   'floatEmoji 12s linear infinite',
        blobFloat:    'blobFloat 10s ease-in-out infinite',
        neonPulse:    'neonPulse 2s ease-in-out infinite',
        shimmer:      'shimmer 4s linear infinite',
        spin:         'spin 8s linear infinite',
        filmScroll:   'filmScroll 22s linear infinite',
        filmFloat:    'filmFloat 6s ease-in-out infinite',
        borderGlow:   'borderGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
