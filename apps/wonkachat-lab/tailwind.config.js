/**
 * Tailwind config for wonkachat-motion-lab.
 *
 * Reconciled from two real WonkaChat configs, which diverge:
 *  - WonkaChat/client/tailwind.config.cjs        (product app — semantic CSS-var colors,
 *    Inter Display / GT Sectra / Cascadia Mono fonts, slide/accordion keyframes)
 *  - WonkaChat/packages/client/tailwind.config.js (shared component lib — colors generated
 *    programmatically via createTailwindColors(), no fontFamily/keyframes of its own)
 *
 * The component lib's colors are produced by a themeable token generator we don't have
 * a build step for here, so this file keeps the semantic CSS custom properties from
 * client/tailwind.config.cjs (surface-*, text-*, border-*, wonka-*, brand-*) since those
 * are the concrete var names referenced throughout ported component markup. See README.md
 * "Tailwind reconciliation notes" for the full discrepancy list.
 */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    fontFamily: {
      sans: ['Inter Display', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['GT Sectra', 'ui-serif', 'Georgia', 'serif'],
      mono: ['Cascadia Mono', 'Roboto Mono', 'ui-monospace', 'monospace'],
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-in-left': 'slide-in-left 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-out-left': 'slide-out-left 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-out-right': 'slide-out-right 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      colors: {
        gray: {
          20: '#ececf1',
          50: '#f7f7f8',
          100: '#ececec',
          200: '#e3e3e3',
          300: '#cdcdcd',
          400: '#999696',
          500: '#595959',
          600: '#424242',
          700: '#2f2f2f',
          800: '#212121',
          850: '#171717',
          900: '#0d0d0d',
        },
        green: {
          50: '#f1f9f7',
          100: '#def2ed',
          200: '#a6e5d6',
          300: '#6dc8b9',
          400: '#41a79d',
          500: '#10a37f',
          550: '#349072',
          600: '#126e6b',
          700: '#0a4f53',
          800: '#06373e',
          900: '#031f29',
        },
        wonka: {
          blue: 'var(--color-blue-600)',
          'blue-light': 'var(--color-blue-400)',
          'blue-dark': 'var(--color-blue-900)',
          green: 'var(--color-green-700)',
          ink: 'var(--color-black)',
          paper: 'var(--color-white)',
        },
        /**
         * Ported from client/src/wonka-design-system.css's `--ds-color-brand-*-rgb`
         * (via client/tailwind.config.cjs's `brand` scale) — the composer border/
         * shadow and ConnectAppsMenu's selection/focus-ring colors. Not
         * re-defined per theme in the source, so kept as static `rgb()` triples
         * (with Tailwind's `<alpha-value>` slot for `/opacity` modifiers) rather
         * than routed through a CSS custom property, since the source itself
         * never varies these by light/dark.
         */
        brand: {
          400: 'rgb(117 163 253 / <alpha-value>)',
          500: 'rgb(77 134 245 / <alpha-value>)',
          600: 'rgb(47 109 224 / <alpha-value>)',
          700: 'rgb(30 84 194 / <alpha-value>)',
          800: 'rgb(18 62 154 / <alpha-value>)',
          950: 'rgb(5 28 72 / <alpha-value>)',
        },
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-secondary-alt': 'var(--text-secondary-alt)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-warning': 'var(--text-warning)',
        'ring-primary': 'var(--ring-primary)',
        'header-primary': 'var(--header-primary)',
        'header-hover': 'var(--header-hover)',
        'header-button-hover': 'var(--header-button-hover)',
        'surface-active': 'var(--surface-active)',
        'surface-active-alt': 'var(--surface-active-alt)',
        'surface-hover': 'var(--surface-hover)',
        'surface-hover-alt': 'var(--surface-hover-alt)',
        'surface-primary': 'var(--surface-primary)',
        'surface-primary-alt': 'var(--surface-primary-alt)',
        'surface-primary-contrast': 'var(--surface-primary-contrast)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-secondary-alt': 'var(--surface-secondary-alt)',
        'surface-tertiary': 'var(--surface-tertiary)',
        'surface-tertiary-alt': 'var(--surface-tertiary-alt)',
        'surface-dialog': 'var(--surface-dialog)',
        'surface-submit': 'var(--surface-submit)',
        'surface-submit-hover': 'var(--surface-submit-hover)',
        'surface-destructive': 'var(--surface-destructive)',
        'surface-destructive-hover': 'var(--surface-destructive-hover)',
        'surface-chat': 'var(--surface-chat)',
        'border-light': 'var(--border-light)',
        'border-medium': 'var(--border-medium)',
        'border-medium-alt': 'var(--border-medium-alt)',
        'border-heavy': 'var(--border-heavy)',
        'border-xheavy': 'var(--border-xheavy)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ['switch-unchecked']: 'hsl(var(--switch-unchecked))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        /** `client/tailwind.config.cjs`'s `shadow-brand`/`shadow-brand-subtle`,
         * used by ChatForm.tsx's composer border. Static (see `brand` colors
         * above for why), rather than the source's `--ds-component-brand-shadow`
         * custom property. */
        brand: '0 2px 16px rgb(47 109 224 / 0.15)',
        'brand-subtle': '0 0 10px rgb(47 109 224 / 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-radix')],
};
