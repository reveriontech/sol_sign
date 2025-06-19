import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import AuthRoutes from './routes/AuthRoutes.js'

dotenv.config()

const app = express()

app.use(helmet())

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4000',
    credentials: true,
}))

app.use(express.json())

app.use('/', AuthRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})