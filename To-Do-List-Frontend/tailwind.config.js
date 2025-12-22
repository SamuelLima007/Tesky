/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: 'oklch(0.99 0 0)',
        primary: 'oklch(0.55 0.15 240)',
        secondary: 'oklch(0.96 0.01 240)',
        accent: 'oklch(0.94 0.05 220)',
        foreground: 'oklch(0.2 0 0)',
      },
    },
  },
  plugins: [],
};
