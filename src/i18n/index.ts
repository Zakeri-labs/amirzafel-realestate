import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en";
import fa from "./fa";
import ar from "./ar";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fa: { translation: fa },
        ar: { translation: ar },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "fa", "ar"],
      interpolation: { escapeValue: false },
      detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
    });
}

export default i18n;
export const RTL_LANGS = ["fa", "ar"];
export const isRTL = (lng: string) => RTL_LANGS.includes(lng);
