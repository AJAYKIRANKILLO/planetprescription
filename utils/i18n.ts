
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          greeting: "Hello, welcome to Planet Prescription!",
          user_dashboard_title: "User Dashboard",
          admin_dashboard_title: "Admin Dashboard"
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour, bienvenue sur Planet Prescription !",
          user_dashboard_title: "Tableau de bord utilisateur",
          admin_dashboard_title: "Tableau de bord administrateur"
        },
      },
      hi: {
        translation: {
            greeting: "नमस्ते, प्लैनेट प्रिस्क्रिप्शन में आपका स्वागत है!",
            user_dashboard_title: "उपयोगकर्ता डैशबोर्ड",
            admin_dashboard_title: "एडमिन डैशबोर्ड"
        }
      }
    },
  });

export default i18n;
