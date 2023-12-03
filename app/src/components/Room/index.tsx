import { useEffect } from 'react'
import { socket } from '../../socket.ts'
import { Socket } from 'socket.io-client'

const Index = () => {
    //Room init
    useEffect(() => {
        //Get room data (room name, owner, name, description, current user, active story)
        socket.on('requestedRoom', (data) => handleRoomData(data, socket))
        socket.emit('requestRoom', window.location.pathname.split('/')[2])
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
