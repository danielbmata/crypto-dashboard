<script setup lang="ts">
import AppLayout from './components/layout/AppLayout.vue'
import CryptoTable from './components/crypto/CryptoTable.vue'
import CryptoChart from './components/crypto/CryptoChart.vue'
import { useCryptoStore } from './store/useCryptoStore'
import { computed } from 'vue'

const store = useCryptoStore()
const topCrypto = computed(() => store.paginatedCryptos[0])
</script>

<template>
  <AppLayout>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Tabela de Criptomoedas -->
      <div class="lg:col-span-2">
        <CryptoTable />
      </div>

      <!-- Gráfico da Principal Cripto -->
      <div v-if="topCrypto">
        <CryptoChart :crypto="topCrypto" />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
