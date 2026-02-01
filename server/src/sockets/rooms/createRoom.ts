import { generateRandomString } from '../../utils/randomString'
import { createUser } from '../users/createUser'
import { TWithSocketData } from '../../types'
import { CREATE_ROOM, CREATED_ROOM, REQUESTED_ROOM } from '../../const/events'
import { dbPromise } from '../../db'
import { getRoomData } from '../../requests/room/getRoomData'

type RoomCreationData = {
    name: string
    user_name: string
    description: string
}
export const createRoom = async (
    data: RoomCreationData,
    userId: number,
    io: any
) => {
    const db = await dbPromise
    let createdRoomId: number
    const generatedRoomId = generateRandomString(5)
    try {
        //creates room and add user to room_users
        const resultId = await db.run(
            'INSERT INTO rooms (name, owner_user_id, description,site_string_id) VALUES (?,?,?,?)',
            [data.name, userId, data.description, generatedRoomId]
        )
        // todo: double check if this doesnt  break
        createdRoomId = resultId.lastID as number
        await db.run(
            'INSERT INTO rooms_users (room_id, user_id) VALUES (?,?)',
            [createdRoomId, userId]
        )
    } catch (e) {
        console.error('Error while trying to create room : ', e)
        return undefined
    }

    // Return room data to user with its cookie
    const roomData = await getRoomData(generatedRoomId)
    const userCookie = await db.get('SELECT cookie FROM users WHERE id = ?', [
        userId,
    ])
    io.emit(CREATED_ROOM, { ...roomData, ...userCookie })
}

export const createRoomSocket = ({ socket, io }: TWithSocketData) => {
    socket.on(CREATE_ROOM, async (data: RoomCreationData) => {
        await createUser({ userName: data.user_name }, io).then(
            async (userID) => {
                if (userID) {
                    await createRoom(data, userID, io)
                }
            }
        )
    })
}
