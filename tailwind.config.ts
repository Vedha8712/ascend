import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3d11',
          900: '#7c2d12',
        },
      },
      boxShadow: {
        ember: '0 10px 30px rgba(249,115,22,0.18)',
      },
      backgroundImage: {
        emberGlow: 'radial-gradient(circle at top, rgba(251,146,60,0.22), transparent 45%)',
      },
    },
  },
  plugins: [],
};

export default config;
