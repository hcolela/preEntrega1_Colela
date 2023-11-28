const express = require('express')
const productsRouter = require('./routes/products.router.js')

const app = express()
const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//http://localhost:3001 /
app.use('/api/products', productsRouter)

app.use('/api/carts', () => {
    res.send('hola carts')
})



app.listen(PORT, () => {
    console.log('Corriendo en el puerto 3001')
})