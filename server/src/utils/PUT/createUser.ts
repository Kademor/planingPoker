import { generateRandomString } from '../randomString'
import { REQUEST_LATEST_USER_CREATED } from '../../const/queries'

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
    io.emit('createdUser', userData)
    return resultId
}
