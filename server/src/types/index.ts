import { Socket } from 'net'
import { Server } from 'socket.io'

export type TWithSocketData = {
    // @ts-ignore
    socket: Socket<any>
    io: Server
}
