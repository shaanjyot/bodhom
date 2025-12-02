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
        'brass-gold': '#B8860B',
        'deep-maroon': '#800000',
        'sacred-saffron': '#FF9933',
        'bodhi-green': '#2E8B57',
        'sandstone-beige': '#F5F5DC',
        primary: {
          DEFAULT: '#B8860B',
          dark: '#8B6914',
          light: '#D4AF37',
        },
        secondary: {
          DEFAULT: '#800000',
          dark: '#5C0000',
          light: '#A00000',
        },
        accent: {
          DEFAULT: '#FF9933',
          dark: '#CC7700',
          light: '#FFB366',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(184, 134, 11, 0.15)',
        'elegant-lg': '0 10px 40px rgba(184, 134, 11, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config

