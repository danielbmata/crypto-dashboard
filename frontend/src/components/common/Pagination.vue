<template>
  <div class="flex items-center justify-between px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="onPrevious"
        :disabled="currentPage === 1"
        class="btn-pagination mobile"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        Anterior
      </button>
      <button
        @click="onNext"
        :disabled="currentPage === totalPages"
        class="btn-pagination mobile"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        Próxima
      </button>
    </div>
    
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Mostrando
          <span class="font-medium">{{ startItem }}</span>
          a
          <span class="font-medium">{{ endItem }}</span>
          de
          <span class="font-medium">{{ totalItems }}</span>
          resultados
        </p>
      </div>
      
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            @click="onPrevious"
            :disabled="currentPage === 1"
            class="btn-pagination"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            <span class="sr-only">Anterior</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <template v-for="(page, index) in pageNumbers" :key="index">
            <button
              v-if="page !== '...'"
              @click="() => onPageChange(Number(page))"
              class="btn-pagination"
              :class="{ 'bg-primary text-white': page === currentPage }"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              ...
            </span>
          </template>
          
          <button
            @click="onNext"
            :disabled="currentPage === totalPages"
            class="btn-pagination"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            <span class="sr-only">Próxima</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  pageNumbers: (number | string)[]
  itemsPerPage: number
  totalItems: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const startItem = computed(() => ((props.currentPage - 1) * props.itemsPerPage) + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))

const onPageChange = (page: number) => {
  emit('page-change', page)
}

const onPrevious = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const onNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}
</script>

<style scoped>
.btn-pagination {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-semibold 
         text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700
         hover:bg-gray-50 dark:hover:bg-dark-lighter focus:z-20 focus:outline-offset-0
         transition-colors duration-200;
}

.btn-pagination.mobile {
  @apply relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold 
         text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700
         hover:bg-gray-50 dark:hover:bg-dark-lighter;
}
</style> 