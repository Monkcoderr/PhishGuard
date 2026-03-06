/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { 
          dark: '#111111', 
          DEFAULT: '#1A1A1A', 
          light: '#262626' 
        },
        danger: { 
          50: 'rgba(255,59,48,0.05)', 
          100: 'rgba(255,59,48,0.1)', 
          200: 'rgba(255,59,48,0.2)', 
          400: '#FF6961', 
          500: '#FF3B30', 
          600: '#DC2626' 
        },
        safe: { 
          50: 'rgba(52,199,89,0.05)', 
          100: 'rgba(52,199,89,0.1)', 
          400: '#6EE7A0', 
          500: '#34C759' 
        },
        warning: { 
          50: 'rgba(255,159,10,0.05)', 
          100: 'rgba(255,159,10,0.1)', 
          400: '#FBBF24', 
          500: '#FF9F0A' 
        },
        action: { 
          50: 'rgba(6,182,212,0.05)', 
          100: 'rgba(6,182,212,0.1)', 
          400: '#22D3EE', 
          500: '#06B6D4', 
          600: '#0891B2' 
        },
        glass: { 
          white: 'rgba(255,255,255,0.7)', 
          border: 'rgba(255,255,255,0.8)',
          dark: 'rgba(17,17,17,0.6)', 
          'dark-border': 'rgba(255,255,255,0.08)' 
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glass: '0 20px 50px rgba(0,0,0,0.05)',
        'glass-lg': '0 25px 60px rgba(0,0,0,0.08)',
        'glow-action': '0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)',
        'glow-danger': '0 0 30px rgba(255,59,48,0.3), 0 0 60px rgba(255,59,48,0.1)',
        elevated: '0 1px 3px rgba(0,0,0,0.04), 0 20px 50px rgba(0,0,0,0.03)',
      },
      animation: {
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
