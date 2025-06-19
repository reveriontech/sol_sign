import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import AuthRoutes from './routes/AuthRoutes.js'

dotenv.config()

const app = express()
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:4000',
    process.env.CLIENT_URL2,
    process.env.CLIENT_URL3,
    process.env.CLIENT_URL4,
].filter(Boolean)

app.use(helmet())

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use(express.json())

app.use('/', AuthRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log('Allowed origins:', allowedOrigins)
})