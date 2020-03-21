const http = require('http')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(userRouter)

const server = http.createServer(app)

module.exports =  {
    app,
    server
}