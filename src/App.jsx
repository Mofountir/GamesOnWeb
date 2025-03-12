// Import des dépendances nécessaires
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import des composants
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { GameHub } from './pages/GameHub';
import { Game } from './pages/Game';

// Import du store d'authentification
import { useAuthStore } from './store/useStore';

// Composant pour protéger les routes qui nécessitent une authentification
const ProtectedRoute = ({ children }) => {
  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Redirige vers la page de connexion si non authentifié
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Composant principal de l'application
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Page de connexion */}
          <Route path="/" element={<Login />} />

          {/* Page d'accueil des jeux (protégée) */}
          <Route
            path="/hub"
            element={
              <ProtectedRoute>
                <GameHub />
              </ProtectedRoute>
            }
          />

          {/* Page de jeu individuel (protégée) */}
          <Route
            path="/game/:id"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;