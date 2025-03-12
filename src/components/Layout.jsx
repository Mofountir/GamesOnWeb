// Import des dépendances nécessaires
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sun, Moon, Gamepad } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useThemeStore } from '../store/useStore';

export const Layout = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const isGameRoute = location.pathname.startsWith('/game/');

  if (isGameRoute) {
    return (
      <div className="w-full h-screen">
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
          <div className="relative">
            <LanguageSelector />
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo simple */}
              <div className="flex items-center space-x-2">
                <Gamepad className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  GameOnWeb
                </span>
              </div>

              {/* Actions de navigation */}
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                  aria-label="Changer le thème"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};