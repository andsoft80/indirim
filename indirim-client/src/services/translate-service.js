import i18n from "i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import translationEN from '../locales/en.json';
import translationRU from '../locales/ru.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
	resources: {
	  en: {
		translation: translationEN
	  },
	  ru: {
		translation: translationRU
	  }
	},
	lng: "ru",
	fallbackLng: "en",
	
	interpolation: {
	  escapeValue: false
	},
	react: {
	  wait: true,
	},
  });

export default i18n;
