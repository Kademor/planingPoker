import { FormEvent, useRef } from 'react'
import { socket } from '../../../socket.ts'
import { Socket } from 'socket.io-client'
import { handleNewUser } from '../../../utils/user.ts'
import { RoomInitFormContainer } from './style.ts'
import { useContent } from '../../Context'
import { TRoomInit } from '../../../types/socketTypes.ts'
import { checkAndRedirectToRoom } from '../../../utils'
import { useNavigate } from 'react-router'
const RoomInit = () => {
    const navigate = useNavigate()
    // const { context, setContext } = useContent()
    const ref: any = useRef()
    const submitForm = async (
        formSubmissionEvent: FormEvent<HTMLFormElement>
    ) => {
        formSubmissionEvent.preventDefault()
        const formData = new FormData(ref.current)
        const formDataObject = {}
        formData.forEach((value, key) => {
            formDataObject[key] = value
        })
        socket.emit('createRoom', formDataObject)
        socket.on('createdUser', (data) => handleNewUser(data, socket))
        socket.on('createdRoom', (data) => handleRoomCreation(data, socket))
    }

    const handleRoomCreation = (data: TRoomInit, socket: Socket) => {
        navigate(`/room/${data.site_string_id}`)
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
                    <input type="text" name={'name'} />n
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

export default RoomInit
