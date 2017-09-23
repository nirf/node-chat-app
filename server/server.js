const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
let users = new Users()
// configure our app to use the public path(middleware)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        // Validate params
        if (!isRealString(params.name) ||
            !isRealString(params.room)) {
            callback('Invalid Params: name or room name are required!')
        }

        socket.join(params.room)
        // if the user exist on some other room them we remove it
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id)

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }

        callback()
    })

    socket.on('createLocationMessage', (message) => {
        let user = users.getUser(socket.id)

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude))
        }
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    })
})


server.listen(port, () => {
    console.log(`Started on post ${port}`)
})
