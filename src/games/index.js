// Placeholder pour les jeux en cours de développement
const placeholderGame = {
  mount: (container, options) => {
    container.innerHTML = `
      <div class="h-full flex items-center justify-center bg-gray-900 text-white">
        <div class="text-center">
          <div class="text-6xl mb-4">🎮</div>
          <h2 class="text-2xl font-bold mb-2">Jeu en développement</h2>
          <p class="text-gray-400">Ce jeu sera bientôt disponible!</p>
        </div>
      </div>
    `;
    return {
      unmount: () => { container.innerHTML = ''; },
      pause: () => console.log('Pause'),
      resume: () => console.log('Resume'),
      reset: () => console.log('Reset')
    };
  }
};

// Configuration des jeux
export const gameModules = {
  'candy-crush': () => Promise.resolve({ default: placeholderGame }),
  'collision': () => Promise.resolve({ default: placeholderGame }),
  '3d-land': () => Promise.resolve({ default: placeholderGame })
};

// Interface commune pour tous les jeux
export const gameInterface = {
  mount: (container, options) => ({}),
  unmount: () => {},
  pause: () => {},
  resume: () => {},
  reset: () => {}
};