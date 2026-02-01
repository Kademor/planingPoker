import { createServer } from 'node:http'
import { Server } from 'socket.io'
import express from 'express'
import { createRoomPUT } from './utils/PUT/createRoom'
import { TWithSocketData } from './types'
import { requestRoomGET } from './utils/GET/requestRoom'
import { createUserPUT } from './utils/PUT/createUser'
import { dbPromise } from './db'
import roomRouter from './routes/room'
import { setupSockets } from './sockets'

async function main() {
    const db = await dbPromise
    const app = express()
    const server = createServer(app)
    app.use('/room', roomRouter)
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

    setupSockets(io)

    io.on('connection', (socket) => {
        console.log('user connected')
        const data: TWithSocketData = {
            socket: socket,
            db: db,
            io: io,
        }
        //PUTS
        createRoomPUT(data)
        createUserPUT(data)
        //GETS
        requestRoomGET(data)
    })

    server.listen(3000, () => {
        console.log('server running at http://localhost:3000')
    })
}

main()
