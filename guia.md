# Crypto Dashboard - Guia de Desenvolvimento

## 📌 Visão Geral
Este projeto é um **Dashboard de Criptomoedas** desenvolvido com **Vue.js, TailwindCSS e Node.js**. Ele consome a API da **CoinGecko** para exibir preços, tendências e permitir conversões de moedas. O desenvolvimento será guiado por **Cursor AI**, seguindo boas práticas e design patterns modernos.

---

## 📁 Estrutura do Projeto
```
crypto-dashboard/
├── frontend/   # Aplicação Vue.js
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── services/    # Serviços de API
│   │   ├── views/       # Páginas principais
│   │   ├── store/       # Gerenciamento de estado (Pinia ou Vuex)
│   │   ├── main.ts      # Arquivo principal
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│
├── backend/    # API Node.js
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── index.ts
│   ├── package.json
│   ├── .env
│
├── README.md
```

---

## 🚀 Tecnologias Utilizadas
### **Frontend (Vue.js + TailwindCSS)**
- Vue.js 3 + Vite
- TailwindCSS para estilização moderna
- Chart.js para gráficos interativos
- Axios para consumo da API
- Pinia para gerenciamento de estado
- Dark Mode

### **Backend (Node.js + Express)**
- Express para criação da API
- Axios para comunicação com a API da CoinGecko
- Cache com Redis para otimização
- WebSockets para atualizações em tempo real
- Railway para deploy do backend

---

## 🛠️ Passo a Passo de Desenvolvimento

### **1️⃣ Configuração Inicial**
 siga os seguintes passos:
1. Crie um repositório no GitHub chamado `crypto-dashboard`.
2. Configure um projeto full-stack com Vue.js no frontend e Node.js no backend.
3. Use TypeScript no frontend e backend para melhor tipagem.

### **2️⃣ Configuração do Frontend**
- Crie o projeto Vue.js com Vite:
  ```sh
  yarn create vue@latest frontend
  cd frontend
  yarn install
  ```
- Adicione TailwindCSS:
  ```sh
  yarn add -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- Crie **componentes Vue.js**:
  - Tabela de criptomoedas (`CryptoTable.vue`)
  - Gráfico de tendências (`CryptoChart.vue`)
  - Conversor de moedas (`CurrencyConverter.vue`)
  - Dark Mode (`DarkModeToggle.vue`)

### **3️⃣ Configuração do Backend**
- Crie o backend com Node.js e Express:
  ```sh
  mkdir backend
  cd backend
  yarn init -y
  yarn add express axios cors dotenv redis
  ```
- Crie **serviço de API** em `src/services/cryptoService.ts` que busca dados da CoinGecko.
- Implemente **cache com Redis** para evitar chamadas excessivas.
- Crie WebSocket para atualizar preços em tempo real.

### **4️⃣ Integração Frontend ↔ Backend**
- Crie um serviço Vue.js (`cryptoService.ts`) para consumir o backend.
- Implemente `useCryptoStore.ts` no Pinia para gerenciar estado global.
- Adicione loading skeletons para melhorar UX.

### **5️⃣ Deploy na Vercel e Railway**
- **Frontend:** Faça o deploy na Vercel com `vercel.json`.
- **Backend:** Faça o deploy na Railway com suporte a variáveis `.env`.

---

## 🔥 Features Futuras
- Notificações de alerta de preço
- Autenticação com Firebase para salvar favoritos
- Suporte a múltiplos idiomas

---

## 📌 Design Patterns Utilizados
✅ **Factory Pattern** → Para modularizar criação de serviços
✅ **Observer Pattern** → Para WebSockets e atualizações em tempo real
✅ **Singleton Pattern** → Para cache de dados com Redis
✅ **Modularização** → Separação de controllers, services e rotas no backend
✅ **Gerenciamento de estado** → Usando Pinia para Vue.js

---

siga este guia passo a passo para desenvolver o projeto de forma moderna e otimizada. 🚀
