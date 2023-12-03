import { Socket } from 'socket.io-client'
import Cookies from 'universal-cookie'

// await createUser(formSubmissionEvent.target[0].value, socket)
export const createUser = async (username: string, socket: Socket) => {
    socket.on('createdUser', (data) => handleNewUser(data, socket))
    socket.emit('createUser', username)
}

type NewUserSocketReturn = { roomName: string; cookie: string }
export const handleNewUser = (data: NewUserSocketReturn, socket?: Socket) => {
    const cookies = new Cookies()
    cookies.set(data.roomName, data.cookie, { path: '/' })
    if (socket) {
        socket.off('createdUser')
    }

    console.log('created new cookie for :', data)
}
