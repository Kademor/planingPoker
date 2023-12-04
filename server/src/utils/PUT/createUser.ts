import { generateRandomString } from '../randomString'
import { REQUEST_LATEST_USER_CREATED } from '../../const/queries'
import { CREATE_ROOM, CREATE_USER, CREATED_USER } from '../../const/events'
import { TWithSocketData } from '../../types'
import { createRoom } from './createRoom'

type TUserCreationData = {
    user_name: string
}

export const createUser = async (
    userName: string,
    db: any,
    io: any
): Promise<number | undefined> => {
    let resultId: number
    try {
        let result = await db.run(
            'INSERT INTO users (name, cookie) VALUES (?,?)',
            [userName, generateRandomString(40)]
        )
        resultId = result.lastID
    } catch (e) {
        console.error('Error while trying to create user : ', e)
        return undefined
    }
    let userData
    await db.all(REQUEST_LATEST_USER_CREATED, resultId).then((rows: any) => {
        userData = rows[0]
    })
    console.log('created user : ', userName)
    io.emit(CREATED_USER, userData)
    return resultId
}

export const createUserPUT = ({ socket, db, io }: TWithSocketData) => {
    socket.on(CREATE_USER, async (data: TUserCreationData) => {
        await createUser(data.user_name, db, io)
    })
}
