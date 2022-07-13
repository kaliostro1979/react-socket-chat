const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')


app.use(cors())

const server = http.createServer(app)

const PORT = 3001

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"]
    }
})


io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on('disconnect', () => {

    })
})

server.listen(PORT, () => {
    console.log(`Server run on ${PORT}`)
})
