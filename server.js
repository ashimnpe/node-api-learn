const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.get('/', (req, res) => {
    res.send('hello server')
})

app.get('/blog', (req, res) => {
    res.send('blog')
})

app.listen(3000, () => {
    console.log(`Node api app is running on port 3000`)
})

mongoose.connect('mongodb+srv://admin:admin@nodeapi.qgplrys.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB')
}).catch((error) => {
    console.log(error)
})