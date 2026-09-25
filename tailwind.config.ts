import type { Config } from 'tailwindcss'

/** Cores vêm das variáveis CSS em src/styles/globals.css (canais RGB). */
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: token('night-950'),
          900: token('night-900'),
          800: token('night-800'),
        },
        crystal: {
          DEFAULT: token('crystal'),
          light: token('crystal-light'),
        },
        lilac: {
          DEFAULT: token('lilac'),
          light: token('lilac-light'),
        },
        sakura: {
          DEFAULT: token('sakura'),
          light: token('sakura-light'),
        },
        plum: {
          DEFAULT: token('plum'),
          light: token('plum-light'),
        },
        cream: token('cream'),
        ink: {
          DEFAULT: token('ink'),
          soft: token('ink-soft'),
        },
      },
      fontFamily: {
        logo: ['Righteous', 'Fredoka Variable', 'system-ui', 'sans-serif'],
        display: ['Fredoka Variable', 'Quicksand Variable', 'system-ui', 'sans-serif'],
        body: ['Quicksand Variable', 'Nunito', 'system-ui', 'sans-serif'],
        jp: ['"Hiragino Maru Gothic ProN"', '"Yu Gothic UI"', '"Meiryo"', '"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        'glow-crystal': '0 0 18px -2px rgb(var(--c-crystal) / 0.55), 0 0 42px -8px rgb(var(--c-crystal) / 0.35)',
        'glow-lilac': '0 0 18px -2px rgb(var(--c-lilac) / 0.5), 0 0 42px -8px rgb(var(--c-lilac) / 0.3)',
        'glow-sakura': '0 0 16px -2px rgb(var(--c-sakura) / 0.5), 0 0 36px -8px rgb(var(--c-sakura) / 0.3)',
        'glow-soft': '0 8px 32px -12px rgb(var(--c-night-950) / 0.9), 0 0 24px -10px rgb(var(--c-lilac) / 0.35)',
        'glow-strong':
          '0 12px 40px -12px rgb(var(--c-night-950) / 0.9), 0 0 28px -4px rgb(var(--c-lilac) / 0.55), 0 0 60px -12px rgb(var(--c-crystal) / 0.45)',
      },
      dropShadow: {
        'glow-crystal': ['0 0 6px rgb(var(--c-crystal) / 0.7)', '0 0 18px rgb(var(--c-crystal) / 0.4)'],
        'glow-lilac': ['0 0 6px rgb(var(--c-lilac) / 0.75)', '0 0 16px rgb(var(--c-lilac) / 0.4)'],
        'glow-sakura': ['0 0 5px rgb(var(--c-sakura) / 0.8)', '0 0 14px rgb(var(--c-sakura) / 0.4)'],
      },
      backgroundImage: {
        'night-sky':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgb(var(--c-night-800) / 0.9), transparent 70%), linear-gradient(180deg, rgb(var(--c-night-950)) 0%, rgb(var(--c-night-900)) 55%, rgb(var(--c-night-950)) 100%)',
        'crystal-lilac': 'linear-gradient(120deg, rgb(var(--c-crystal)) 0%, rgb(var(--c-lilac)) 100%)',
        'crystal-lilac-bright': 'linear-gradient(120deg, rgb(var(--c-crystal-light)) 0%, rgb(var(--c-lilac-light)) 100%)',
        'ice-lilac': 'linear-gradient(100deg, rgb(var(--c-ink)) 0%, rgb(var(--c-crystal-light)) 30%, rgb(var(--c-lilac-light)) 70%, rgb(var(--c-sakura-light)) 100%)',
        'heart-gradient': 'linear-gradient(135deg, rgb(var(--c-crystal-light)) 0%, rgb(var(--c-lilac-light)) 55%, rgb(var(--c-ink)) 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.85) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.08) rotate(8deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '50%': { transform: 'translate(8px, -16px)', opacity: '0.9' },
        },
        'petal-fall': {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: 'var(--petal-opacity, 0.7)' },
          '50%': { transform: 'translate3d(var(--petal-sway, 40px), 50vh, 0) rotate(180deg)' },
          '90%': { opacity: 'var(--petal-opacity, 0.7)' },
          '100%': { transform: 'translate3d(0, 110vh, 0) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-3%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        'petal-fall': 'petal-fall 24s linear infinite',
        shimmer: 'shimmer 8s linear infinite',
        marquee: 'marquee 40s linear infinite',
        wave: 'wave 12s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'spin-slower': 'spin-slow 60s linear infinite reverse',
      },
    },
  },
  plugins: [],
} satisfies Config
