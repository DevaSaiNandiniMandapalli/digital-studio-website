/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080B12',
        ink2: '#101722',
        card: '#121D2B',
        paper: '#F5F5F2',
        muted: '#A5ADBA',
        lime: '#B7F45A',
        sky: '#72C9FF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      maxWidth: { shell: '1440px' },
    },
  },
  plugins: [],
};
