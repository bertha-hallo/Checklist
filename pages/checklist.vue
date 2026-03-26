<script setup lang="ts">
const { items, newItemText, loading, addItem, toggleItem, deleteItem } =
  useChecklist();
</script>

<template>
  <ClientOnly>
    <main class="list min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div class="w-full max-w-md">

        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight">Shared Checklist</h1>
          <p class="text-zinc-400 text-sm mt-1">
            Updates appear instantly for everyone 
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
          </p>
        </div>

        <div class="flex gap-2 mb-6">
          <input
            v-model="newItemText"
            @keydown.enter="addItem"
            type="text"
            placeholder="Add a new item..."
            class="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            @click="addItem"
            class="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
          >
            Add
          </button>
        </div>

        <div v-if="loading" class="text-zinc-500 text-sm text-center py-8">
          Connecting to live checklist...
        </div>

        <div
          v-else-if="items.length === 0"
          class="text-zinc-600 text-sm text-center py-8 border border-dashed border-zinc-800 rounded-lg"
        >
          No items yet. Add something above!
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 group transition-all"
            :class="{ 'opacity-50': item.completed }"
          >
            <button
              @click="toggleItem(item)"
              class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
              :class="item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-600 hover:border-emerald-500'"
            >
              <svg v-if="item.completed" class="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="flex-1 flex flex-col justify-center">
              <span
                class="text-sm transition-all"
                :class="item.completed ? 'line-through text-zinc-500' : 'text-zinc-100'"
              >
                {{ item.text }}
              </span>
              <span class="text-[10px] text-zinc-500 mt-0.5 italic flex items-center gap-1">
                <svg class="w-2.5 h-2.5 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                {{ item.userEmail || 'System' }}
              </span>
            </div>

            <button
              @click="deleteItem(item.id)"
              class="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all text-xs"
            >
              ✕
            </button>
          </li>
        </ul>

        <p v-if="items.length > 0" class="text-zinc-600 text-xs text-center mt-4">
          {{ items.filter(i => i.completed).length }} / {{ items.length }} completed
        </p>

      </div>
    </main>
  </ClientOnly>
</template>
 
<style scoped>
/* 1. Base Smoothness */
.list {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* 2. List Item Animations (Vue Transition Group) */
/* Note: To use these, wrap your <li> in <transition-group name="list"> */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateX(20px);
}

/* 3. Custom Checkbox Bounce */
button:active svg {
  transform: scale(0.8);
}

button svg {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 4. Glassmorphism & Backdrop Effects */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 5. Custom Input Focus Glow */
input:focus {
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.1);
}

/* 6. Sophisticated Scrollbar (for long lists) */
ul::-webkit-scrollbar {
  width: 4px;
}

ul::-webkit-scrollbar-track {
  background: transparent;
}

ul::-webkit-scrollbar-thumb {
  background: #27272a; /* zinc-800 */
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb:hover {
  background: #3f3f46; /* zinc-700 */
}

/* 7. Animated Background Gradient */
.list::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% -10%,
    rgba(16, 185, 129, 0.08) 0%,
    transparent 40%
  );
  pointer-events: none;
  z-index: 0;
}

/* 8. Text Strikethrough Animation */
.line-through {
  position: relative;
  text-decoration: none; /* We build our own for better control */
  opacity: 0.5;
}

.line-through::after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform-origin: left;
  animation: strike 0.3s ease-out forwards;
}

@keyframes strike {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
</style>