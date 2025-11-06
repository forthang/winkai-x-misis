/**
 * Tailwind CSS configuration
 *
 * The `primary` colour and gradient are customised to follow the
 * requirements.  Dark mode is enabled via the `class` strategy so
 * that it can be toggled manually by adding a `dark` class to the
 * `html` element【523031736702918†L293-L361】.
 */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF841C',
          light: '#FFAE52',
          dark: '#CC6A16',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #FF841C 0%, #FFAE52 100%)',
      },
    },
  },
  plugins: [],
};