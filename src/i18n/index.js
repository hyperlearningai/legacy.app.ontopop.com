import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    resources: {
      en: { translation: en },
    },
    nonExplicitWhitelist: true,
    fallbackLng: 'en', // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
