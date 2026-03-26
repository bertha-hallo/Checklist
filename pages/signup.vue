<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h1>
          <p class="text-slate-500 mt-2 text-sm">Join the checklist community today</p>
        </div>
  
        <div class="space-y-5">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="name@example.com" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">Password</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Min. 6 characters" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
  
          <button 
            @click="handleSignUp" 
            class="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-100 transition-all transform active:scale-[0.98]"
          >
            Get Started
          </button>
  
          <p class="text-center text-sm text-slate-600 pt-2">
            Already have an account? 
            <NuxtLink to="/" class="text-green-600 font-bold hover:text-green-800 transition-colors">Login here</NuxtLink>
          </p>
        </div>
  
        <transition name="fade">
          <p v-if="error" class="mt-6 text-sm text-red-600 bg-red-50 p-4 rounded-lg border border-red-100 flex items-center">
            <span class="mr-2">⚠️</span> {{ error }}
          </p>
        </transition>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  
  const { $auth } = useNuxtApp()
  
  const handleSignUp = async () => {
    try {
      error.value = null
      await createUserWithEmailAndPassword($auth, email.value, password.value)
      navigateTo('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        error.value = "This email is already registered."
      } else if (err.code === 'auth/weak-password') {
        error.value = "Password must be at least 6 characters."
      } else {
        error.value = "Registration failed. Please try again."
      }
    }
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>