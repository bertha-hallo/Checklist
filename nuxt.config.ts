
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
        fbApiKey: " ",
        fbAuthDomain:   " ",
        fbProjectId:   " ",
        fbstorageBucket:   " ",
        fbMessagingSenderId:    " ",
        fbAppId:    " ",
        fbmeasurementId:    " ",
      }
    }
   
})


 
