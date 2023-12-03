import { generateRandomString } from '../randomString'
import { REQUEST_ROOM_FROM_ID } from '../../const/queries'
import { createUser } from './createUser'
import { TWithSocketData } from '../../types'
import { CREATE_ROOM, CREATED_ROOM } from '../../const/events'

type RoomCreationData = {
    name: string
    user_name: string
    description: string
}
export const createRoom = async (
    data: RoomCreationData,
    userId: number,
    db: any,
    io: any
) => {
    let createdRoomId: number | undefined
    let roomData
    try {
        const resultId = await db.run(
            'INSERT INTO rooms (name, owner_user_id, description,site_string_id) VALUES (?,?,?,?)',
            [data.name, userId, data.description, generateRandomString(5)]
        )
        createdRoomId = resultId.lastID
        await db.run(
            'INSERT INTO rooms_users (room_id, room_id) VALUES (?,?)',
            [createdRoomId, userId]
        )
    } catch (e) {
        console.error('Error while trying to create room : ', e)
        return undefined
    }

    await db.all(REQUEST_ROOM_FROM_ID, createdRoomId).then((rows: any) => {
        roomData = rows[0]
    })

    io.emit(CREATED_ROOM, roomData)
}

export const createRoomPUT = ({ socket, db, io }: TWithSocketData) => {
    socket.on(CREATE_ROOM, async (data: RoomCreationData) => {
        await createUser(data.user_name, db, io).then(async (userID) => {
            if (userID) {
                await createRoom(data, userID, db, io)
            }
        })
    })
}
