import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
})

export const cryptoService = {
  async getTopCryptos(limit: number = 100) {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false
      }
    })
    return response.data
  }
}

export default api 