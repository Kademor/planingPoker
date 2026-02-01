import { Server } from 'socket.io'
import { createRoomSocket } from './rooms/createRoom'
import { registerUserSocket } from './users/createUser'
import { registerRoomSocket } from './rooms/getRoom'

export function setupSockets(io: Server) {
    io.on('connection', (socket) => {
        registerRoomSocket(socket, io)
        createRoomSocket({ socket, io })
        registerUserSocket({ socket, io })
    })
}
