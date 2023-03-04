import express from "express";
import cors from "cors";
import { Server } from 'socket.io'
import http from 'http'

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`User with id: ${socket.id} joined room ${data}`)
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })

})
server.listen('5000', () => {
    console.log('Server running successfully')
})