import express from 'express';
import productsRouter from './routes/products/index'

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.use('/products', productsRouter)

app.listen(PORT, () => {
    console.log(`App listening on localhost ${PORT}`)
})