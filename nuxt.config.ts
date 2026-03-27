
import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  pages: true,
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()]
  },
    
    modules: ['@tailwindcss/vite'],

    css: ['~/assets/css/main.css'],
    

    runtimeConfig: {
      public: {
        fbApiKey: NUXT_PUBLIC_FIREBASE_API_KEY,
        fbAuthDomain: NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        fbProjectId:  NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        fbstorageBucket:  NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        fbMessagingSenderId:  NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        fbAppId:  NUXT_PUBLIC_FIREBASE_APP_ID,
        fbmeasurementId:  NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      }
    }
   
})


 
