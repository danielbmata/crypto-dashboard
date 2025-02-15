import axios from 'axios'

export class CryptoService {
  private readonly baseURL: string

  constructor() {
    this.baseURL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3'
  }

  async getTopCryptos() {
    try {
      const response = await axios.get(`${this.baseURL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          sparkline: true,
          price_change_percentage: '24h'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      return []
    }
  }
}

export default new CryptoService() 