<template>
 
    
  <NuxtPage />

     
  
</template>

<!-- <script setup lang="ts">
// Add 'as any' here
const { $auth } = useNuxtApp() as any

onMounted(() => {
  if ($auth) {
    // This will now work without the error
    console.log("🔥 Firebase is connected!", $auth)
  } else {
    console.error("❌ Firebase not found in Nuxt context.")
  }
})
</script> -->
<!-- <script setup lang="ts">

const { $auth } = useNuxtApp()

onMounted(() => {
  if ($auth) {
    console.log("🔥 Firebase is connected!", $auth.app.options.projectId)
  } else {
    console.error("❌ Firebase connection failed.")
  }
})

</script> -->