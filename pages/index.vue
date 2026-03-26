<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        
        <div class="space-y-4">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          
          <button 
            @click="handleLogin" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            Login
          </button>
        </div>
  
        <p v-if="error" class="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100">
          {{ error }}
        </p>
        <p class="mt-8 pt-6 text-center text-sm text-gray-500 border-t border-gray-100">
  Don't have an account? 
  <NuxtLink 
    to="/signup" 
    class="ml-1 inline-flex items-center font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 group"
  >
    <span>Sign up here</span>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7" />
    </svg>
  </NuxtLink>
</p>
      </div>
      
    </div>
    
  </template>
  
   
  
  <script setup>
  import { signInWithEmailAndPassword } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  
  const { $auth } = useNuxtApp()
  
  const handleLogin = async () => {
    error.value = null 
    
    // Optional: Client-side check before hitting the server
    if (!email.value || !password.value) {
      error.value = 'Please fill in both email and password.'
      return
    }
  
    try {
      await signInWithEmailAndPassword($auth, email.value, password.value)
      navigateTo('/checklist')
    } catch (err) {
      // Log the code to the console so you can see exactly what Firebase sends
      console.log("Firebase Error Code:", err.code)
  
      if (err.code === 'auth/user-not-found') {
        error.value = 'This email is not registered. Please check the spelling or sign up.'
      } else if (err.code === 'auth/wrong-password') {
        error.value = 'The password you entered is incorrect.'
      } else if (err.code === 'auth/invalid-email') {
        error.value = 'The email address format is invalid.'
      } else if (err.code === 'auth/invalid-credential') {
        // This is a fallback. If protection is still ON, it hits here.
        // If protection is OFF, it usually means the password or email is wrong.
        error.value = 'Incorrect credentials. Please check your email and password.'
      } else if (err.code === 'auth/too-many-requests') {
        error.value = 'Too many failed attempts. Try again in a few minutes.'
      } else {
        error.value = 'An unexpected error occurred. Please try again.'
      }
    }
  }
  </script>
  
  
  <style>
  /* Global transitions for smooth UI */
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
  </style>

 