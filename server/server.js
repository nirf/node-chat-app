const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
// configure our app to use the public path(middleware)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')
    // Sending message to the user emitted the message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        // Sending messages to everyone in the chat to know that user emitted the message(excluding the sending user)
        socket.broadcast.emit('newMessage', generateMessage('Admin', `New User Joined: ${message.from}`))
        // Sending message to everyone in the group
        io.emit('newMessage', generateMessage(message.from, message.text))
        // Send acknowledgement to the client
        callback('This is from the server.')
    })

    socket.on('createLocationMessage', (message) => {
        console.log('Received location message')
        // Sending the location to
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude, message.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User was Disconnected')
    })
})


server.listen(port, () => {
    console.log(`Started on post ${port}`)
})
