import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import en from "./lang/en.json";
import fr from "./lang/fr.json";
import de from "./lang/de.json";
import it from "./lang/it.json";
import {DEFAULT_LANG} from "./types/LanguageType";

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    de: {
        translation: de,
    },
    it: {
        translation: it,
    }
}

const language = localStorage.getItem('language');

if (!language) {
    localStorage.setItem('language', localStorage.getItem('defaultLanguage') ?? DEFAULT_LANG);
}

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || DEFAULT_LANG,
        fallbackLng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
