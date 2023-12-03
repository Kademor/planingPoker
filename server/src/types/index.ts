import { Socket } from 'net'

export type TWithSocketData = {
    // @ts-ignore
    socket: Socket<any>
    db: any
    io: any
}
