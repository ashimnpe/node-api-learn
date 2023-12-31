const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello server')
})


// create product
app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// get product
app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// get product by id
app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
       const product = await Product.findById(id)
       res.status(200).json(product)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// update product
app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find product with id ${id}`})
        }
        
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    }
    catch(error){
        res.status(500).json(error)
    }
})

// delete product
app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find product with id ${id}`})
        }
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://admin:admin@nodeapi.qgplrys.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, () => {
        console.log(`Node api app is running on port 3000`)
    })
}).catch((error) => {
    console.log(error)
})