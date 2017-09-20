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

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        // Sending message to the user emitted the message
        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the chat app',
            createAt: new Date().getTime()
        })
        // Sending messages to everyone in the chat to know that user emitted the message
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: `New User Joined: ${message.from}`,
            createAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User was Disconnected')
    })
})


server.listen(port, () => {
    console.log(`Started on post ${port}`)
})
