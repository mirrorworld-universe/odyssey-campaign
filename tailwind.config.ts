import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      width: {
        view: "1232px"
      },
      maxWidth: {
        view: "1232px"
      },
      fontSize: {
        ten: "10px",
        title1: ["20px", { fontWeight: 600, lineHeight: "1.4" }],
        title2: ["16px", { fontWeight: 600, lineHeight: "1.5" }],
        title3: ["14px", { fontWeight: 600, lineHeight: "1.57" }],
        title4: ["12px", { fontWeight: 600, lineHeight: "1.5" }],

        body1: ["20px", { lineHeight: "1.4", fontWeight: 400 }],
        body2: ["16px", { lineHeight: "1.5", fontWeight: 400 }],
        body3: ["14px", { lineHeight: "1.57", fontWeight: 400 }],
        body4: ["12px", { lineHeight: "1.5", fontWeight: 400 }],

        headline0: ["48px", { fontWeight: 800, lineHeight: "1.41" }],
        headline1: ["40px", { fontWeight: 800, lineHeight: "1.4" }],
        headline2: ["32px", { fontWeight: 800, lineHeight: "1.37" }],
        headline3: ["28px", { fontWeight: 800, lineHeight: "1.42" }],
        headline4: ["24px", { fontWeight: 800, lineHeight: "1.41" }],
        headline5: ["20px", { fontWeight: 800, lineHeight: "1.4" }]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "hsl(var(--primary-blue))",
          "blue-hover": "hsl(var(--primary-blue-hover))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        bg: {
          bg1: "hsl(var(--bg1))",
          popup: "hsl(var(--bg-popup))",
          tag: "hsl(var(--bg-tag))",
          mask: "hsl(var(--bg-mask))"
        },
        tertary: "hsl(var(--tertary))",
        disable: "hsl(var(--disable))",
        link: "hsl(var(--link))",

        icon: "hsl(var(--icon))",
        line: "hsl(var(--line))",
        "gold-yellow": "hsl(var(--gold-yellow))",
        error: "hsl(var(--error))",
        success: "hsl(var(--success))"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        loading: {
          "0%": {
            transform: "scale3d(1, 1, 1)"
          },
          "25%": {
            transform: "scale3d(1, 1, 1)"
          },
          "50%": {
            transform: "scale3d(1.5, 1.5, 1.5)"
          },
          "75%": {
            transform: "scale3d(1, 1, 1)"
          },
          "100%": {
            transform: "scale3d(1, 1, 1)"
          }
        },
        "loading-before": {
          "0%": {
            transform: "scale3d(1, 1, 1)"
          },
          "25%": {
            transform: "scale3d(1.5, 1.5, 1.5)"
          },
          "50%": {
            transform: "scale3d(1.1, 1.1, 1.1)"
          },
          "75%": {
            transform: "scale3d(1, 1, 1)"
          },
          "100%": {
            transform: "scale3d(1, 1, 1)"
          }
        },
        "loading-after": {
          "0%": {
            transform: "scale3d(1, 1, 1)"
          },
          "25%": {
            transform: "scale3d(1, 1, 1)"
          },
          "50%": {
            transform: "scale3d(1.1, 1.1, 1.1)"
          },
          "75%": {
            transform: "scale3d(1.5, 1.5, 1.5)"
          },
          "100%": {
            transform: "scale3d(1, 1, 1)"
          }
        },
        "fade-in": {
          from: {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        },
        "fade-out": {
          from: {
            opacity: "1"
          },
          to: {
            opacity: "0"
          }
        },
        marquee: {
          "0%": {
            transform: "translateX(0%)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        },
        "spin-light": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "25%": {
            transform: "rotate(90deg)"
          },
          "100%": {
            transform: "rotate(90deg)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        loading: "loading 1s linear infinite",
        "loading-before": "loading-before 1s linear infinite",
        "loading-after": "loading-after 1s linear infinite",
        "fade-in": "fade-in .3s linear",
        "fade-out": "fade-out .3s linear",
        marquee: "marquee 24s linear infinite",
        "spin-light": "spin-light 2s ease-out infinite"
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        orbitron: ["var(--font-orbitron)"]
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".text-shadow-text": {
          textShadow:
            "8px -8px 0 #25A3ED, 8px -8px 0 #25A3ED, -8px 8px 0 #25A3ED, 8px 8px 0 #25A3ED"
          // textShadow: "8px -8px 0 #25A3ED, 8px -8px 0 #25A3ED, -8px 8px 0 #25A3ED, 8px 8px 0 #25A3ED",
        },
        ".background-highlight": {
          background:
            "linear-gradient(80deg, #000 -8.56%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(76deg, rgba(251, 176, 66, 0.00) 0%, rgba(251, 176, 66, 0.70) 165.97%), transparent 0px -38.301px / 112.36% 125.941% no-repeat"
        }
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ]
} satisfies Config;

export default config;
