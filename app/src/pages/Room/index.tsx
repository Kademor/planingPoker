import { useEffect, useState } from 'react'
import { socket } from '../../socket.ts'
import { Socket } from 'socket.io-client'
import { getUserForRoomFromCookies } from '../../utils/user.ts'
import { useNavigate } from 'react-router'

type RoomData = {
    description: string
    name: string
    owner_user_id: number
    site_string_id: string
}
const Index = () => {
    const navigate = useNavigate()
    const roomCode = window.location.pathname.split('/')[2]
    const [roomData, setRoomData] = useState<RoomData | null>()
    //User check
    useEffect(() => {
        if (!getUserForRoomFromCookies(roomCode)) {
            navigate(`/createUser/${roomCode}`)
        }
    }, [])

    //Room init
    useEffect(() => {
        socket.on('requestedRoom', (data) => handleRoomData(data, socket))
        socket.emit('requestRoom', roomCode)
    }, [])

    const handleRoomData = (data: RoomData, socket: Socket) => {
        setRoomData(data)
        console.log('data inside room', data)
        socket.off('requestedRoom')
    }
    return (
        <div>
            {roomData && (
                <div>
                    <div>Room site_string_id : {roomData.site_string_id}</div>
                    <div>Room name : {roomData.name}</div>
                    <div>Room description : {roomData.description}</div>
                    <div>Room ownerId :</div>
                    <div>Room active_story_id :</div>
                </div>
            )}
        </div>
    )
}

export default Index
