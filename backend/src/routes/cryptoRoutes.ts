import { Router } from 'express'
import { getCryptos } from '../controllers/cryptoController'

const router = Router()

router.get('/cryptos', getCryptos)

export default router 