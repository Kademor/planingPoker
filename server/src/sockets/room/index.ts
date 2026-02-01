import { Server, Socket } from 'socket.io'
import { dbPromise } from '../../db'
import { REQUEST_ROOM_FROM_SITE_STRING_ID } from '../../const/queries'
import { REQUEST_ROOM } from '../../const/events'

export function registerRoomSocket(socket: Socket, io: Server) {
    socket.on(REQUEST_ROOM, async (site_string_id: string) => {
        const db = await dbPromise
        try {
            const data = await db
                .all(REQUEST_ROOM_FROM_SITE_STRING_ID, site_string_id)
                .then((rows: any) => {
                    return rows
                })
            io.emit(data)
        } catch (err) {
            console.log('phil oh no error time')
        }
    })
}
