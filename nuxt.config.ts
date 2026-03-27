
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
        fbApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        fbAuthDomain:  process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        fbProjectId:   process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        fbstorageBucket:   process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        fbMessagingSenderId:   process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        fbAppId:   process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
        fbmeasurementId:   process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      }
    }
   
})


 
