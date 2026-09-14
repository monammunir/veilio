/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#060709',
        foreground: '#F5F5F2',
        accent: {
          cyan: '#00f2fe',
          blue: '#38bdf8',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
          purple: '#a855f7'
        },
        muted: {
          DEFAULT: 'rgba(245, 245, 242, 0.65)',
          foreground: '#8E929B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'radial-glow-cyan': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.15) 0%, transparent 65%)',
        'radial-glow-blue': 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
