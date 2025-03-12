import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// Liste des langues supportées
const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'ar', name: 'العربية' }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Gestion de la fermeture du menu au clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) &&
          menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Récupère le nom de la langue actuelle
  const getCurrentLanguage = () => 
    SUPPORTED_LANGUAGES.find(lang => lang.code === i18n.language)?.name || 'Langue';

  // Gestion du changement de langue
  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Bouton principal */}
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-md"
        aria-label="Sélectionner la langue"
        aria-expanded={isOpen}
      >
        <Globe size={20} className="text-purple-600 dark:text-purple-400" />
        <span className="text-purple-700 dark:text-purple-300">{getCurrentLanguage()}</span>
      </button>
      
      {/* Menu déroulant */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-[9999] border border-purple-100 dark:border-purple-900"
        >
          {SUPPORTED_LANGUAGES.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full px-4 py-2 text-left hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors ${
                i18n.language === code 
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};