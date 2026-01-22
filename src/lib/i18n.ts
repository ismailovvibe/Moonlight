import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/common.json';
import uz from '@/locales/uz/common.json';
import ru from '@/locales/ru/common.json';

const resources = {
  en: { common: en },
  uz: { common: uz },
  ru: { common: ru }
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
