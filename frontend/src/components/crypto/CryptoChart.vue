<template>
  <div class="bg-white dark:bg-dark-lighter rounded-lg shadow p-4 transition-all duration-300">
    <!-- Cabeçalho do gráfico -->
    <div v-if="crypto" class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})
      </h2>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Últimos 7 dias
      </div>
    </div>
    
    <!-- Container do gráfico -->
    <div class="h-64 flex items-center justify-center relative">
      <div 
        v-if="!crypto || !crypto.sparkline_in_7d" 
        class="text-gray-500 absolute inset-0 flex items-center justify-center"
      >
        Dados do gráfico não disponíveis
      </div>
      <canvas 
        v-else 
        ref="chartRef"
        class="transition-opacity duration-300"
        :class="{ 'opacity-0': loading }"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { Crypto } from '@/types'
import Chart from 'chart.js/auto'

// Props para receber os dados da criptomoeda
const props = defineProps<{
  crypto: Crypto
}>()

// Referências para o canvas do gráfico
const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null
const loading = ref(false)

// Função para criar/atualizar o gráfico
const createChart = async () => {
  if (!chartRef.value || !props.crypto.sparkline_in_7d) return
  
  loading.value = true
  
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  // Prepara os dados para o gráfico
  const prices = props.crypto.sparkline_in_7d.price
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toLocaleDateString('pt-BR')
  })

  // Limpa o gráfico anterior se existir
  if (chart) {
    chart.destroy()
  }

  // Pequeno delay para a animação
  await new Promise(resolve => setTimeout(resolve, 150))

  // Cria um novo gráfico com Chart.js
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `Preço ${props.crypto.symbol.toUpperCase()}`,
        data: prices,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 750,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`
          }
        }
      }
    }
  })

  loading.value = false
}

// Cria o gráfico quando o componente é montado
onMounted(() => {
  if (props.crypto.sparkline_in_7d) {
    createChart()
  }
})

// Atualiza o gráfico quando os dados mudam
watch(() => props.crypto, () => {
  if (props.crypto.sparkline_in_7d) {
    createChart()
  }
}, { deep: true })

// Limpa o gráfico quando o componente é destruído
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
.opacity-0 {
  opacity: 0;
}
</style> 