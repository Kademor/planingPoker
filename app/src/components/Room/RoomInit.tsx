import {FormEvent, useRef} from "react";
import { socket } from '../../socket';
import {Socket} from "socket.io-client";
import {handleNewUser} from "../../utils/user.ts";
import {RoomInitFormContainer} from "./style.ts";
const RoomInit = () => {
    const ref : any = useRef();
    const submitForm = async (formSubmissionEvent: FormEvent<HTMLFormElement>) => {
        formSubmissionEvent.preventDefault();
        const formData = new FormData(ref.current);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        socket.emit('createRoom', formDataObject)
        socket.on('createdUser',(data) => handleNewUser(data,socket));
        socket.on('createdRoom',(data) => handleRoomCreation(data,socket));
    }

    const handleRoomCreation = (data: any, socket: Socket) => {
        console.log('received data' , data)
        socket.off('createdRoom')
    }
    return (
        <RoomInitFormContainer>
            <h2>Create your room!</h2>
            <form onSubmit={e =>submitForm(e)} ref={ref} >
                <label>Your name:
                    <input type="text" name={"user_name"} />
                </label>
                <label>Poke game name (Optional)
                    <input type="text" name={"name"}/>
                </label>
                <label>Description (Optional)
                    <input type="description" name={"description"}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </RoomInitFormContainer>
    );
};

export default RoomInit;
