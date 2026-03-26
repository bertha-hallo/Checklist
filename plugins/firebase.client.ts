
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'

 
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey:   config.public.fbApiKey as string,
    authDomain: config.public.fbAuthDomain as string,
    projectId: config.public.fbProjectId as string,
    storageBucket:config.public.fbstorageBucket as string,
    messagingSenderId: config.public.fbMessagingSenderId as string,
    appId: config.public.fbAppId as string,
    measurementId:config.public.fbmeasurementId as string,
    
  }
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize services
  const db = getFirestore(app)
  const auth = getAuth(app)

  // signInAnonymously(auth);

  return {
    provide: {
      fireApp: app,
      db: db,
      auth: auth,
    }
  }
})