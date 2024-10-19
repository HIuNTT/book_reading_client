import type { Config } from 'tailwindcss'
import tailwindScrollbar from 'tailwind-scrollbar'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff2f7f',
      },
    },
  },
  plugins: [tailwindScrollbar],
} satisfies Config
