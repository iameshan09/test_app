/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minWidth: {
        '72': '18rem',
      },
      width: {
        '7.5': '12.5rem',
        '58': '58rem',
      },
      colors: {
        '#1c2323': '#1c2323',
        '#34343c': '#34343c',
        '#3b3b44': '#3b3b44',
        '#3c7bb3': '#3c7bb3',
        '#fbdc83': '#fbdc83',
        '#ea9683': '#ea9683',
      },
      fontSize: {
        'xxs': '.7rem',
        'xxxs': '.5rem',
      },
      maxWidth: {
        '7.5': '7.5rem',
      },
    },
  },
  plugins: [],
};
