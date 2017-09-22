const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {generateMessage} = require('./utils/message')

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
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        // Sending messages to everyone in the chat to know that user emitted the message
        socket.broadcast.emit('newMessage', generateMessage('Admin', `New User Joined: ${message.from}`))
        // Sending message to everyone in the group
        io.emit('newMessage', generateMessage(message.from, message.text))
    })

    socket.on('disconnect', () => {
        console.log('User was Disconnected')
    })
})


server.listen(port, () => {
    console.log(`Started on post ${port}`)
})
