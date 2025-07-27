import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        secondary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          500: "#3B82F6",
          600: "#2563EB",
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
        gymfit: {
          red: "#EF4444",
          blue: "#3B82F6",
          darkBg: "rgba(0, 0, 0, 0.7)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        handwriting: ["Kalam", "cursive"],
      },
      backgroundImage: {
        "gym-blur":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ccircle cx='200' cy='200' r='50' fill='%23555' filter='url(%23blur)'/%3E%3Ccircle cx='800' cy='400' r='80' fill='%23444' filter='url(%23blur)'/%3E%3Ccircle cx='600' cy='600' r='60' fill='%23666' filter='url(%23blur)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
