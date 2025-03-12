// Import de Zustand pour la gestion d'état
import { create } from 'zustand';

// Store pour la gestion du thème
const createThemeStore = (set) => ({
  // État initial
  isDarkMode: false,
  
  // Action pour basculer le thème
  toggleTheme: () => set((state) => ({ 
    isDarkMode: !state.isDarkMode 
  })),
});

// Store pour la gestion de l'authentification
const createAuthStore = (set) => ({
  // État initial
  isAuthenticated: false,
  user: null,

  // Action de connexion
  login: (username) => set({
    isAuthenticated: true,
    user: {
      username,
      // Génération d'un avatar avec DiceBear
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    },
  }),

  // Action de déconnexion
  logout: () => set({ 
    isAuthenticated: false, 
    user: null 
  }),
});

// Export des stores
export const useThemeStore = create(createThemeStore);
export const useAuthStore = create(createAuthStore);