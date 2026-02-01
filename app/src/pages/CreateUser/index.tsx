import { FormEvent, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { UserCreationFormContainer } from './style.ts'
import { socket } from '../../socket.ts'
import { getFormDataObject } from '../../utils/form.ts'
import { handleNewUser } from '../../utils/user.ts'
import { useNavigate } from 'react-router'
const index = () => {
    const navigate = useNavigate()
    const roomCode = window.location.pathname.split('/')[2]
    const ref: any = useRef()
    const submitForm = async (
        formSubmissionEvent: FormEvent<HTMLFormElement>
    ) => {
        formSubmissionEvent.preventDefault()
        socket.on('createdUser', (data) => handleUserCreation(data, socket))
        console.log('phil emiting with', getFormDataObject(ref))
        socket.emit('createUser', {
            ...getFormDataObject(ref),
            roomCode: roomCode,
        })
    }

    const handleUserCreation = (user: any, socket: Socket) => {
        console.log('data from user creation', user)
        handleNewUser({ roomName: roomCode, cookie: user.cookie }, socket)
        navigate(`/room/${roomCode}`)
    }

    return (
        <UserCreationFormContainer>
            <h2>Who are you?</h2>
            <form onSubmit={(e) => submitForm(e)} ref={ref}>
                <label>
                    Your name:
                    <input type="text" name={'userName'} />
                </label>
                {/*todo: as an improvement, add a role for the user : QA/DEV/PO */}
                {/*<label> */}
                {/*    Role*/}
                {/*    <input type="text" name={'name'} />*/}
                {/*</label>*/}
                <input type="submit" value="Submit" />
            </form>
        </UserCreationFormContainer>
    )
}

export default index
