const express= require('express')
const startServer= require('./config/db')
const PORT= 4545
const authorRoute= require ('./author/author.route')
const bookRoute= require('./book/book.route')

const app= express()

app.use(express.json())
app.use('/', authorRoute)
app.use('/',bookRoute)
startServer(PORT, app)