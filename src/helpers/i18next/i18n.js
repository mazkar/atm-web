import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import translateEng from "./locales/en.json";
import translateIndo from "./locales/id.json";

i18n.use(initReactI18next)
  .use(XHR)
  .use(LanguageDetector)
  .init({
    react: {
      useSuspense: false
    },
    debug: false,
    // lng: "id",
    // fallbackLng: "id",
    keySeparator: false,

    interpolation: {
      escapeValue: false
    },

    resources: {
      en: {
        translations: translateEng
      },
      id: {
        translations: translateIndo
      }
    },

    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
