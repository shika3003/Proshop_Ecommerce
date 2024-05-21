import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
const port = process.env.PORT || 5000
connectDB()
const app = express()
// Body parser middle ware parse to the body data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('API is runnig')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server Runnig on${port} `))
