/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          violet: "#8B5CF6",
        },
        accent: {
          cyan: "#06B6D4",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          clay: "var(--surface-clay)",
          highlight: "var(--surface-highlight)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          soft: "var(--border-soft)",
          strong: "var(--border-strong)",
        },
        success: {
          bg: "var(--success-bg)",
          text: "var(--success-text)",
          accent: "var(--success-accent)",
        },
        warning: {
          bg: "var(--warning-bg)",
          text: "var(--warning-text)",
          accent: "var(--warning-accent)",
        },
        danger: {
          bg: "var(--danger-bg)",
          text: "var(--danger-text)",
          accent: "var(--danger-accent)",
        },
        info: {
          bg: "var(--info-bg)",
          text: "var(--info-text)",
          accent: "var(--info-accent)",
        },
      },
      boxShadow: {
        'clay-light': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'clay-light-sm': '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff',
        'clay-light-hover': '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
        'clay-dark': '8px 8px 16px #070b13, -8px -8px 16px #15213b',
        'clay-dark-sm': '4px 4px 8px #070b13, -4px -4px 8px #15213b',
        'clay-dark-hover': '10px 10px 20px #070b13, -10px -10px 20px #15213b',
        'inner-light': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
        'inner-dark': 'inset 4px 4px 8px #070b13, inset -4px -4px 8px #15213b',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
