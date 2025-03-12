/** @type {import('tailwindcss').Config} */
export default {
  // Fichiers à analyser pour les classes Tailwind
  content: ['./index.html', './src/**/*.{js,jsx}'],
  
  // Activation du mode sombre
  darkMode: 'class',
  
  // Configuration du thème
  theme: {
    extend: {
      // Personnalisation des animations
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};