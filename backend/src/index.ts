import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cryptoRoutes from './routes/cryptoRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(express.json())

// Rotas
app.use('/api', cryptoRoutes)

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 