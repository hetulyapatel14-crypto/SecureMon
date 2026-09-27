/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8FAFC', // Modern soft cool grey
          alt: '#F1F5F9',     // Slate 100
          paper: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1E293B', // Slate 800 (Softer than harsh black)
          muted: '#64748B',   // Slate 500
          light: '#94A3B8',   // Slate 400
        },
        // Playful Geometric Core Palette
        brand: {
          violet: '#8B5CF6',  // Vivid Violet (Primary)
          pink: '#F472B6',    // Hot Pink (Secondary pop)
          amber: '#FBBF24',   // Amber / Yellow (Tertiary optimism)
          mint: '#34D399',    // Emerald / Mint (Quaternary freshness)
          sky: '#38BDF8',     // Sky Blue
          red: '#EF4444',     // Crimson
        },
        pop: {
          border: '#1E293B',  // Solid chunky border color
          softBorder: '#CBD5E1',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          critical: '#DC2626',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'sticker': '18px',
        'sticker-lg': '24px',
        'pill': '9999px',
        'blob-1': '24px 8px 24px 8px',
        'blob-2': '8px 24px 8px 24px',
      },
      boxShadow: {
        'pop-xs': '2px 2px 0px #1E293B',
        'pop-sm': '3px 3px 0px #1E293B',
        'pop': '4px 4px 0px #1E293B',
        'pop-lg': '6px 6px 0px #1E293B',
        'pop-xl': '8px 8px 0px #1E293B',
        'pop-pink': '5px 5px 0px #F472B6',
        'pop-amber': '5px 5px 0px #FBBF24',
        'pop-violet': '5px 5px 0px #8B5CF6',
        'pop-mint': '5px 5px 0px #34D399',
      },
      transitionTimingFunction: {
        'bounce-pop': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
