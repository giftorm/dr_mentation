/** https://io.google/2022/faq/
    https://tailwindcss.com/docs/whitespace

*/


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1abc9c',
        primarytint: '#1abc900',
        secondary: '#2c3e50',
        background: '#121212',
        backgroundtint: '#100000',
        text: '#ecf0f1',
        accent: '#e67e22',
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Raleway', 'sans-serif'],
          header: ['Quantico', 'sans-serif'],
          markdown: ['Helvetica Neue', 'Helvetica'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl-i': ' inset 0 0 7px 1px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

