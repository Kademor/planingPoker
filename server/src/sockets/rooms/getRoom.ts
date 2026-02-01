import { Server, Socket } from 'socket.io'
import { REQUEST_ROOM, REQUESTED_ROOM } from '../../const/events'
import { getRoomData } from '../../requests/room/getRoomData'

export function registerRoomSocket(socket: Socket, io: Server) {
    socket.on(REQUEST_ROOM, async (site_string_id: string) => {
        const roomData = await getRoomData(site_string_id)
        io.emit(REQUESTED_ROOM, roomData)
    })
}
