import { TWithSocketData } from '../../types'
import { REQUEST_ROOM, REQUESTED_ROOM } from '../../const/events'
import { REQUEST_ROOM_FROM_SITE_STRING_ID } from '../../const/queries'

export const requestRoomGET = ({ socket, db, io }: TWithSocketData) => {
    socket.on(REQUEST_ROOM, async (site_string_id: string) => {
        let roomData
        await db
            .all(REQUEST_ROOM_FROM_SITE_STRING_ID, site_string_id)
            .then((rows: any) => {
                roomData = rows[0]
            })
        io.emit(REQUESTED_ROOM, roomData)
    })
}
