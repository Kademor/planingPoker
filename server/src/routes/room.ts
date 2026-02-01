// In `server/src/routes/room.ts`
import express from 'express'
import { dbPromise } from '../db'
import { REQUEST_ROOM_FROM_SITE_ID } from '../const/queries'

const router = express.Router()

router.get('/:roomcode', async (req, res) => {
    const { roomcode } = req.params
    const db = await dbPromise
    try {
        const rows = await db.all(REQUEST_ROOM_FROM_SITE_ID, roomcode)
        res.json(rows[0] || null)
    } catch (err) {
        res.status(500).json({ error: 'Database error' })
    }
})

export default router
