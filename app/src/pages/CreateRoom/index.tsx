import { FormEvent, useRef } from 'react'
import { socket } from '../../socket.ts'
import { Socket } from 'socket.io-client'
import { handleNewUser } from '../../utils/user.ts'
import { RoomInitFormContainer } from './style.ts'
import { TRoomInit } from '../../types/socketTypes.ts'
import { useNavigate } from 'react-router'
import { getFormDataObject } from '../../utils/form.ts'
const Index = () => {
    const navigate = useNavigate()
    const ref: any = useRef()
    const submitForm = async (
        formSubmissionEvent: FormEvent<HTMLFormElement>
    ) => {
        formSubmissionEvent.preventDefault()
        socket.on('createdRoom', (data) => handleRoomCreation(data, socket))
        socket.emit('createRoom', getFormDataObject(ref))
    }

    const handleRoomCreation = (room: TRoomInit, socket: Socket) => {
        handleNewUser(
            { roomName: room.site_string_id, cookie: room.cookie },
            socket
        )
        navigate(`/room/${room.site_string_id}`)
        socket.off('createdRoom')
    }

    return (
        <RoomInitFormContainer>
            <h2>Create your room!</h2>
            <form onSubmit={(e) => submitForm(e)} ref={ref}>
                <label>
                    Your name:
                    <input type="text" name={'user_name'} />
                </label>
                <label>
                    Poke game name (Optional)
                    <input type="text" name={'name'} />
                </label>
                <label>
                    Description (Optional)
                    <input type="description" name={'description'} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </RoomInitFormContainer>
    )
}

export default Index
