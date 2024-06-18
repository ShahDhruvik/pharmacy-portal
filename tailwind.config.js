import {
  BreakPoints,
  generateBreakPoints,
  generatePalette,
  PaletteColors,
  ThemeOperator,
} from './src/theme/theme-data'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: generatePalette(PaletteColors),
    screens: generateBreakPoints(ThemeOperator.TailwindOp, BreakPoints),
    boxShadow: {
      cardShadow:
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    extend: {
      spacing: {
        container: `max(
            1rem,
            calc((100vw - calc(1680px - 1rem * 2)) / 2)
            )`,
        'btw-container': `max(
              1rem,
              calc((100vw - calc(1680px - 0.5rem * 2)) / 2)
              )`,
      },
      animation: {
        loading: 'spin 1.3s linear infinite',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px,1fr))',
      },
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
}
