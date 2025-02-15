<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-200">
    <nav class="bg-white dark:bg-dark-lighter shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-8" />
            <span class="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Crypto Dashboard
            </span>
          </div>
          
          <!-- Dark Mode Toggle -->
          <div class="flex items-center">
            <button 
              @click="toggleDarkMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-dark text-gray-700 dark:text-gray-300"
            >
              <svg 
                v-if="isDarkMode"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
              <svg 
                v-else
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  // Verifica preferência salva ou preferência do sistema
  const savedTheme = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  }
})
</script> 