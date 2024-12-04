// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
        "3xl": "6rem",
        "4xl": "8rem",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      // Device-specific breakpoints
      'mobile': {'max': '639px'},
      'tablet': {'min': '640px', 'max': '1023px'},
      'laptop': {'min': '1024px', 'max': '1279px'},
      'desktop': {'min': '1280px', 'max': '1535px'},
      'tv': {'min': '1536px'},
      // Interaction breakpoints
      'touch': { 'raw': '(hover: none)' },
      'stylus': { 'raw': '(hover: none) and (pointer: coarse)' },
      'mouse': { 'raw': '(hover: hover) and (pointer: fine)' },
      // Orientation breakpoints
      'portrait': { 'raw': '(orientation: portrait)' },
      'landscape': { 'raw': '(orientation: landscape)' },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#242552',
          foreground: "hsl(var(--primary-foreground))",
          50: '#E9E9EF',
          100: '#D2D3DF',
          200: '#A5A7BF',
          300: '#797B9F',
          400: '#4C4F7F',
          500: '#242552',
          600: '#1D1E42',
          700: '#161731',
          800: '#0F1021',
          900: '#080910',
        },
        secondary: {
          DEFAULT: '#4C4F7F',
          foreground: "hsl(var(--secondary-foreground))",
          50: '#ECECF2',
          100: '#D9DAE5',
          200: '#B3B5CB',
          300: '#8D90B1',
          400: '#676B97',
          500: '#4C4F7F',
          600: '#3D3F66',
          700: '#2E2F4C',
          800: '#1F2033',
          900: '#0F1019',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Add spacing utilities for safe areas
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Add height and width utilities for common device sizes
      height: {
        screen: ['100vh /* fallback */', '100dvh'],
        'screen-small': ['100vh /* fallback */', '100svh'],
        'screen-large': ['100vh /* fallback */', '100lvh'],
      },
      width: {
        screen: ['100vw /* fallback */', '100dvw'],
      },
      // Add font sizes for different devices
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'xs-tablet': ['0.8125rem', { lineHeight: '1.125rem' }],
        'sm-tablet': ['0.9375rem', { lineHeight: '1.375rem' }],
        'base-tablet': ['1.0625rem', { lineHeight: '1.625rem' }],
        'xs-desktop': ['0.875rem', { lineHeight: '1.25rem' }],
        'sm-desktop': ['1rem', { lineHeight: '1.5rem' }],
        'base-desktop': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      // Add max-width utilities for containers
      maxWidth: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        'screen-xs': '320px',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        'screen-3xl': '1920px',
        'screen-4xl': '2560px',
      },
      animation: {
        'marquee-left': 'marquee-left 40s linear infinite',
        'marquee-right': 'marquee-right 40s linear infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}