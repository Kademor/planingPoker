import { dbPromise } from '../../db'
import { REQUEST_ROOM_FROM_SITE_STRING_ID } from '../../const/queries'

export async function getRoomData(site_string_id: string) {
    const db = await dbPromise
    try {
        return await db
            .all(REQUEST_ROOM_FROM_SITE_STRING_ID, site_string_id)
            .then((rows: any) => {
                return rows[0]
            })
    } catch (err) {
        console.log('phil oh no error time')
    }
}
