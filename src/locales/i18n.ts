import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en/translation.json';
import hi from './hi/translation.json';

const getSavedLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  return language || 'en';
};

getSavedLanguage().then((lang) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: lang,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;
