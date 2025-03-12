// Configuration des animations
export const ANIMATION_CONFIG = {
  // Animation de type ressort pour les transitions fluides
  spring: {
    type: 'spring',
    stiffness: 300,  // Raideur du ressort
    damping: 30,     // Amortissement
  },
  
  // Animation de fondu pour les apparitions/disparitions
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

// Liste des langues supportées par l'application
export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'ar', name: 'العربية' }
];

// Configuration des contrôles de jeu
export const GAME_CONTROLS = {
  PAUSE: 'p',      // Touche pour mettre en pause
  MENU: 'm',       // Touche pour ouvrir le menu
  HOME: 'h',       // Touche pour retourner à l'accueil
  RESTART: 'r',    // Touche pour recommencer
};

// États du jeu
export const GAME_STATES = {
  PLAYING: 'playing',   // Le jeu est en cours
  PAUSED: 'paused',     // Le jeu est en pause
  MENU: 'menu',         // Le menu est ouvert
  GAME_OVER: 'gameOver' // La partie est terminée
};