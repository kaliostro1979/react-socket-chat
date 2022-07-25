const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const { uuid } = require('uuidv4');



app.use(cors())

const server = http.createServer(app)

const PORT = 3001

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"]
    }
})

let users = []

const addUser = (uid, socketId) => {
    if (uid) {
        !users.some(user => user.uid === uid) &&
        users.push({uid, socketId})
    }
}

const removeUser = (socketId) => {
    users = users.filter((user => user.socketId !== socketId))
}

const getUser = (uid) => users.find(user => {
    return user.uid === uid
})

io.on('connection', (socket) => {

    socket.on("addUser", (uid) => {
        addUser(uid, socket.id)
        io.emit('getUsers', users)
    })

    //Send and get message
    socket.on("sendMessage", ({senderId, receiverId, text, senderName}) => {
        const user = getUser(receiverId)
        io.to(user && user.socketId).emit("getMessage", {senderId,text, senderName, receiverId})
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})

server.listen(PORT, () => {
    console.log(`Server run on ${PORT}`)
})
