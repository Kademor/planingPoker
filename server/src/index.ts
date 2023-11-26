import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { open } from 'sqlite'
import express from 'express'
import { Database } from 'sqlite3'
import { randomBytes } from 'crypto'
import { generateRandomString } from './utils/randomString'
import { createUser } from './utils/createUser'
import { createRoom, RoomCreationData } from './utils/createRoom'

async function main() {
    const db = await open({
        filename: './database/planningPoker.db',
        driver: Database,
    })

    const app = express()
    const server = createServer(app)

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
        },
    })

    io.listen(4000)

    app.get('/', (req: any, res: any) => {
        res.send('<h1>Hello world</h1>')
        console.log('i like trains')
    })

    io.on('connection', (socket) => {
        socket.on('createRoom', async (data: RoomCreationData) => {
            await createUser(data.user_name, db, io).then(async (userID) => {
                if (userID) {
                    await createRoom(data, userID, db, io)
                }
            })
        })
    })

    server.listen(3000, () => {
        console.log('server running at http://localhost:3000')
    })
}

main()
