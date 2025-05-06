// Configuration des jeux
const createIframeGame = (url) => ({
  mount: (container) => {
    // Nettoyer le conteneur avant d'ajouter l'iframe
    container.innerHTML = '';
    
    // Création de l'iframe pour le jeu
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    // Ajout des attributs de sécurité pour l'iframe
    iframe.setAttribute('allow', 'autoplay; fullscreen');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
    
    // Gestion des erreurs de chargement
    iframe.onerror = () => {
      container.innerHTML = `
        <div class="h-full flex items-center justify-center bg-gray-900 text-white">
          <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold mb-2">Erreur de chargement</h2>
            <p class="text-gray-400">Impossible de charger le jeu. Veuillez réessayer plus tard.</p>
            <a href="${url}" target="_blank" class="mt-4 inline-block px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
              Ouvrir dans un nouvel onglet
            </a>
          </div>
        </div>
      `;
    };

    // Empêcher l'iframe de capturer le focus
    iframe.addEventListener('load', () => {
      iframe.contentWindow.addEventListener('focus', (e) => {
        e.preventDefault();
        window.focus();
      });
    });

    // Ajouter un overlay transparent pour capturer les événements clavier
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1';
    overlay.style.pointerEvents = 'none';
    
    container.style.position = 'relative';
    container.appendChild(iframe);
    container.appendChild(overlay);

    return {
      unmount: () => {
        container.removeChild(iframe);
        container.removeChild(overlay);
      },
      pause: () => {
        try {
          iframe.contentWindow.postMessage({ type: 'PAUSE_GAME' }, '*');
        } catch {
          console.log('Pause - Non supporté');
        }
      },
      resume: () => {
        try {
          iframe.contentWindow.postMessage({ type: 'RESUME_GAME' }, '*');
        } catch {
          console.log('Resume - Non supporté');
        }
      },
      reset: () => {
        try {
          iframe.contentWindow.postMessage({ type: 'RESET_GAME' }, '*');
        } catch {
          // Recharge l'iframe en modifiant son URL
          const currentSrc = iframe.src;
          iframe.src = '';
          setTimeout(() => { iframe.src = currentSrc; }, 0);
        }
      }
    };
  }
});

// Configuration des jeux avec leurs URLs de déploiement
export const gameModules = {
  'collision': () => Promise.resolve({ 
    default: createIframeGame('https://walgrim-dev.github.io/obstacle-game-js/') 
  }),
  '3d-land': () => Promise.resolve({ 
    default: createIframeGame('https://babylon-game-umber.vercel.app/') 
  }),
  'goomba-challenge': () => Promise.resolve({ 
    default: createIframeGame('https://walgrim-dev.github.io/goomba-challenge/') 
  }),
}

// Jeu placeholder pour les jeux non encore développés
const placeholderGame = {
  mount: (container) => {
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

