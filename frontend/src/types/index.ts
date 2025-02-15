// Interface que define a estrutura dos dados de uma criptomoeda
export interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d?: {
    price: number[] // Array de preços dos últimos 7 dias
  }
}

// Interface que define o estado global da aplicação
export interface CryptoState {
  cryptos: Crypto[] // Lista de todas as criptomoedas
  loading: boolean // Indicador de carregamento
  error: string | null // Mensagem de erro, se houver
  currentPage: number // Página atual da paginação
  itemsPerPage: number // Quantidade de itens por página
}

// Interface para as respostas da API
export interface CryptoResponse {
  data: Crypto[]
  error?: string
} 