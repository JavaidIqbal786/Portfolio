/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ── Colors (matching CSS custom properties) ─────────── */
      colors: {
        primary: '#0a0e17',
        secondary: '#0d1117',
        card: '#161b22',
        border: '#30363d',
        accent: {
          green: '#00ff88',
          blue: '#00b4d8',
          purple: '#bd93f9',
          orange: '#ff9500',
        },
        text: {
          primary: '#e6edf3',
          muted: '#8b949e',
        },
      },

      /* ── Fonts ───────────────────────────────────────────── */
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      /* ── Box Shadows (glows) ─────────────────────────────── */
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-green-lg': '0 0 40px rgba(0, 255, 136, 0.4)',
        'glow-blue': '0 0 20px rgba(0, 180, 216, 0.3)',
        'glow-purple': '0 0 20px rgba(189, 147, 249, 0.3)',
      },

      /* ── Animations ──────────────────────────────────────── */
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 255, 136, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 255, 136, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },

      /* ── Backdrop Blur ───────────────────────────────────── */
      backdropBlur: {
        xs: '2px',
      },

      /* ── Border Radius ───────────────────────────────────── */
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

