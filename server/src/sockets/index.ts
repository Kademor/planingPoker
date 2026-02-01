import { Server } from 'socket.io'
import { createRoomPUT } from './rooms/createRoom'
import { createUserPUT } from './users/createUser'
import { registerRoomSocket } from './rooms/getRoom'

export function setupSockets(io: Server) {
    io.on('connection', (socket) => {
        registerRoomSocket(socket, io)
        createRoomPUT({ socket, io })
        createUserPUT({ socket, io })
    })
}
