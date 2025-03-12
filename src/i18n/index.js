import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fr, en, es, it, ar } from './locales';

const resources = { fr, en, es, it, ar };

const i18nConfig = {
  resources,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig);

export default i18n;