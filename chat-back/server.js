const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./firebaseConfig");
const {merge} = require("nodemon/lib/utils");

const rooms = ['tech', 'finance', 'general', 'crypto']

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const server = require('http').createServer(app)
const PORT = '5001'

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})



const getLastMessagesFromRoom = async (room)=>{
    let messages = []
    const postRef = db.collection("messages")
    const snapshot = await postRef.where('to', '==', room).get();
    snapshot.forEach(doc => {
        messages = [...messages, doc.data()]
    });
    return messages
}

const sortRoomMessagesByDate = (messages)=>{
    return messages.sort((a, b)=>{
        let date1 = a.date.split('/')
        let date2 = b.date.split('/')

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1]

        return date1 < date2 ? -1 : 1
    })
}

io.on("connection", (socket)=>{

    socket.on("join-room", async (newRoom, previousRoom)=>{
        socket.join(newRoom)
        socket.leave(previousRoom)
        let roomMessages = await getLastMessagesFromRoom(newRoom)
        roomMessages = sortRoomMessagesByDate(roomMessages)
        socket.emit("room-messages", roomMessages)
    })

    socket.on("message-room", async(room, content, sender, time, date)=>{
        /*const newMessage = await Message.create({content, from: sender, time, date, to: room})*/
        const postRef = db.collection("messages")
        const data = {content, from: sender, date, time, to: room}
        await postRef.doc(time).set(data, {merge: true})

        let roomMessages = await getLastMessagesFromRoom(room)

        roomMessages = sortRoomMessagesByDate(roomMessages)
        io.to(room).emit("room-messages", roomMessages)
        socket.broadcast.emit("notifications", room)
    })
})


server.listen(PORT, ()=>{
    console.log(`Server start at port: ${PORT}`)
})
