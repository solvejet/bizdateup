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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
          DEFAULT: '#4C4F7F', // Lighter shade of the navy blue
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
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}