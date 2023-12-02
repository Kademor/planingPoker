import { generateRandomString } from './randomString'

export const REQUEST_ROOM_FROM_ID =
    'SELECT name,description,owner_user_id,site_string_id FROM rooms WHERE id = ? LIMIT 1'

export type RoomCreationData = {
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

    console.log('created room : ', roomData)
    io.emit('createdRoom', roomData)
}
