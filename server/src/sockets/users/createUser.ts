import { generateRandomString } from '../../utils/randomString'
import { REQUEST_LATEST_USER_CREATED } from '../../const/queries'
import {
    CREATE_USER,
    CREATED_USER,
    REQUEST_ROOM,
    REQUESTED_ROOM,
} from '../../const/events'
import { TWithSocketData } from '../../types'
import { dbPromise } from '../../db'
import { getRoomData } from '../../requests/room/getRoomData'

type TUserCreationData = {
    userName: string
    roomCode?: string
}

// Creates a new user from userName ad returns generated user ID
export const createUser = async (
    userData: TUserCreationData,
    io: any
): Promise<number | undefined> => {
    const db = await dbPromise
    let resultId: number | undefined
    console.log('phil usedata', userData)
    try {
        let result = await db.run(
            'INSERT INTO users (name, cookie) VALUES (?,?)',
            [userData.userName, generateRandomString(40)]
        )
        resultId = result.lastID
        // Create relation to room if roomId provided
        if (userData.roomCode && resultId) {
            //Get room id from room code
            const roomId = await db.all(
                'SELECT id FROM rooms WHERE site_string_id = ?',
                [userData.roomCode]
            )
            console.log('phil roomId', roomId[0].id)
            await db.run(
                'INSERT INTO rooms_users (room_id, user_id) VALUES (?,?)',
                [roomId[0].id, resultId]
            )
            // Emit user being created to other listeners
            const roomData = await getRoomData(userData.roomCode)
            io.emit(REQUESTED_ROOM, roomData)
        }
    } catch (e) {
        console.error('Error while trying to create user : ', e)
        return undefined
    }

    // Emits to client username and user cookie for set
    await db.all(REQUEST_LATEST_USER_CREATED, resultId).then((rows: any) => {
        io.emit(CREATED_USER, rows[0])
    })

    return resultId
}

export const registerUserSocket = ({ socket, io }: TWithSocketData) => {
    socket.on(CREATE_USER, async (data: TUserCreationData) => {
        await createUser(
            { userName: data.userName, roomCode: data.roomCode },
            io
        )
    })
}
