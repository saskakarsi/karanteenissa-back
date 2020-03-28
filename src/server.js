const http = require('http')
const express = require('express')
const dbConn = require('./db/mongoose')
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')

dbConn()

const app = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/services', serviceRouter)

const server = http.createServer(app)

module.exports =  {
    app,
    server
}