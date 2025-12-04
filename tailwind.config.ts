import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New elegant cream/beige palette
        'cream': {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#F8F0E3',
          300: '#F2E6D0',
          400: '#E8D5B5',
          500: '#DFC49B',
          600: '#C9A96E',
          DEFAULT: '#F5EDE0',
        },
        'sand': {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5EDE0',
          300: '#ECDCC5',
          400: '#DFCAA8',
          500: '#D2B88B',
          DEFAULT: '#E8DCC8',
        },
        'charcoal': {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#4A4A4A',
          600: '#333333',
          700: '#262626',
          800: '#1A1A1A',
          900: '#0D0D0D',
          DEFAULT: '#2C2C2C',
        },
        // Existing colors - refined
        'brass-gold': '#C9A227',
        'antique-gold': '#AA8F4E',
        'deep-maroon': '#800000',
        'sacred-saffron': '#FF9933',
        'bodhi-green': '#2E8B57',
        'sandstone-beige': '#F5F5DC',
        'terracotta': '#C67D4D',
        primary: {
          DEFAULT: '#C9A227',
          dark: '#9A7B1E',
          light: '#E3C654',
        },
        secondary: {
          DEFAULT: '#2C2C2C',
          dark: '#1A1A1A',
          light: '#4A4A4A',
        },
        accent: {
          DEFAULT: '#C67D4D',
          dark: '#A66640',
          light: '#D89B6D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(201, 162, 39, 0.12)',
        'elegant-lg': '0 10px 40px rgba(201, 162, 39, 0.18)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
