import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

//app.use('/api/products', products)

//app.use('/api/orders', orders)

export default app