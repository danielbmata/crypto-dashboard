<template>
  <div class="bg-white dark:bg-dark-lighter rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-dark-lighter">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Cripto
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Preço
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              24h %
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Volume
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-dark divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-if="loading" v-for="i in itemsPerPage" :key="i" class="animate-pulse">
            <td colspan="4" class="px-6 py-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </td>
          </tr>
          <tr 
            v-else 
            v-for="crypto in paginatedCryptos" 
            :key="crypto.id" 
            class="hover:bg-gray-50 dark:hover:bg-dark-lighter cursor-pointer transition-colors duration-200"
            @click="selectCrypto(crypto)"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="crypto.image" :alt="crypto.name" class="h-8 w-8 rounded-full">
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ crypto.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ crypto.symbol.toUpperCase() }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-100">
                ${{ crypto.current_price.toLocaleString() }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                crypto.price_change_percentage_24h > 0 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              ]">
                {{ crypto.price_change_percentage_24h.toFixed(2) }}%
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              ${{ crypto.total_volume.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Paginação -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-numbers="pageNumbers"
      :items-per-page="itemsPerPage"
      :total-items="cryptos.length"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCryptoStore } from '@/store/useCryptoStore'
import Pagination from '@/components/common/Pagination.vue'
import type { Crypto } from '@/types'

const store = useCryptoStore()

const cryptos = computed(() => store.cryptos)
const paginatedCryptos = computed(() => store.paginatedCryptos)
const loading = computed(() => store.loading)
const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)
const pageNumbers = computed(() => store.pageNumbers)
const itemsPerPage = computed(() => store.itemsPerPage)

// Emite o evento quando uma criptomoeda é selecionada
const emit = defineEmits<{
  (e: 'select-crypto', crypto: Crypto): void
}>()

const selectCrypto = (crypto: Crypto) => {
  emit('select-crypto', crypto)
}

const handlePageChange = (page: number) => {
  store.setPage(page)
}

onMounted(() => {
  store.fetchCryptos()
})
</script>

<style scoped>
tr {
  @apply transition-all duration-200;
}

tr:hover td {
  @apply bg-gray-50 dark:bg-dark-lighter;
}
</style> 