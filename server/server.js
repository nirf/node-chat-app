const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
// configure our app to use the public path(middleware)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('disconnect', (socket) => {
        console.log('User was Disconnected')
    })
})


server.listen(port, () => {
    console.log(`Started on post ${port}`)
})
