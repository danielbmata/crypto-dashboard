import { Request, Response } from 'express'
import cryptoService from '../services/cryptoService'

export const getCryptos = async (req: Request, res: Response) => {
  try {
    const cryptos = await cryptoService.getTopCryptos()
    res.json(cryptos)
  } catch (error) {
    console.error('Erro ao buscar criptomoedas:', error)
    res.status(500).json({ error: 'Erro ao buscar dados das criptomoedas' })
  }
} 