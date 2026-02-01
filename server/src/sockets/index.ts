import { Server } from 'socket.io'
import { registerRoomSocket } from './room'

export function setupSockets(io: Server) {
    io.on('connection', (socket) => {
        registerRoomSocket(socket, io)
    })
}
