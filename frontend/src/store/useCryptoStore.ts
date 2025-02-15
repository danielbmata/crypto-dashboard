import { defineStore } from 'pinia'
import type { CryptoState, Crypto } from '@/types'
import axios from 'axios'

// Configurações da API e paginação
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const ITEMS_PER_PAGE = 10

// Store principal para gerenciar o estado das criptomoedas
export const useCryptoStore = defineStore('crypto', {
  state: (): CryptoState => ({
    cryptos: [], // Lista de criptomoedas
    loading: false, // Estado de carregamento
    error: null, // Mensagem de erro, se houver
    currentPage: 1, // Página atual da paginação
    itemsPerPage: ITEMS_PER_PAGE // Itens por página
  }),

  getters: {
    // Retorna apenas as criptomoedas da página atual
    paginatedCryptos: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.cryptos.slice(start, end)
    },
    
    // Calcula o número total de páginas
    totalPages: (state) => Math.ceil(state.cryptos.length / state.itemsPerPage),
    
    // Gera os números das páginas para a navegação
    // Implementa uma lógica de ellipsis (...) para muitas páginas
    pageNumbers: (state) => {
      const total = Math.ceil(state.cryptos.length / state.itemsPerPage)
      const current = state.currentPage
      
      // Se tiver 7 páginas ou menos, mostra todas
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1)
      }
      
      // Lógica para páginas iniciais
      if (current <= 4) {
        return [...Array.from({ length: 5 }, (_, i) => i + 1), '...', total]
      }
      
      // Lógica para páginas finais
      if (current >= total - 3) {
        return [1, '...', ...Array.from({ length: 5 }, (_, i) => total - 4 + i)]
      }
      
      // Lógica para páginas do meio
      return [1, '...', current - 1, current, current + 1, '...', total]
    },

    // Retorna a primeira criptomoeda para o gráfico inicial
    firstCrypto: (state) => state.cryptos[0]
  },

  actions: {
    // Busca os dados das criptomoedas da API
    async fetchCryptos() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get<Crypto[]>(`${API_URL}/api/cryptos`)
        this.cryptos = response.data
      } catch (error) {
        this.error = 'Erro ao carregar dados das criptomoedas'
        console.error('Erro:', error)
      } finally {
        this.loading = false
      }
    },

    // Atualiza a página atual
    setPage(page: number) {
      this.currentPage = page
    }
  }
}) 