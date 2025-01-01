import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en';
import { fa } from './locales/fa';

const LANGUAGE_KEY = 'app_language';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa'],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_KEY,
      caches: ['localStorage']
    },
    react: { useSuspense: false }
  });

export default i18n;
