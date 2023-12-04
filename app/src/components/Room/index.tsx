import { useEffect } from 'react'
import { socket } from '../../socket.ts'
import { Socket } from 'socket.io-client'
import { getUserForRoomFromCookies } from '../../utils/user.ts'
import { useNavigate } from 'react-router'

const Index = () => {
    const navigate = useNavigate()
    const roomCode = window.location.pathname.split('/')[2]
    //User check
    useEffect(() => {
        if (!getUserForRoomFromCookies(roomCode)) {
            navigate(`/createUser/${roomCode}`)
        }
    }, [])

    //Room init
    useEffect(() => {
        //Get room data (room name, owner, name, description, current user, active story)
        socket.on('requestedRoom', (data) => handleRoomData(data, socket))
        //todo: find a better way to pass by the pathname for the room code
        socket.emit('requestRoom', roomCode)
    }, [])

    const handleRoomData = (data: any, socket: Socket) => {
        console.log('data inside room', data)
        socket.off('requestedRoom')
    }
    return (
        <div>
            <div>Room id : </div>
            <div>Room site_string_id : </div>
            <div>Room name : </div>
            <div>Room description : </div>
            <div>Room ownerId : </div>
            <div>Room active_story_id : </div>
        </div>
    )
}

export default Index
