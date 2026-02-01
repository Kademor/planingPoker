import { createServer } from 'node:http'
import { Server } from 'socket.io'
import express from 'express'
import { dbPromise } from './db'
import { setupSockets } from './sockets'

async function main() {
    const db = await dbPromise
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

    setupSockets(io)

    server.listen(3000, () => {
        console.log('server running at http://localhost:3000')
    })
}

main()
