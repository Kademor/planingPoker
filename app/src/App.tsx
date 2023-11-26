import { useState, useEffect } from 'react'
import { socket } from './socket'
import RoomInit from './components/Room/RoomInit.tsx'

export default function App() {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [fooEvents, setFooEvents] = useState([])

    useEffect(() => {
        // function onConnect() {
        //     setIsConnected(true);
        // }
        //
        // function onDisconnect() {
        //     setIsConnected(false);
        // }
        //
        // function onFooEvent(value) {
        //     setFooEvents(previous => [...previous, value]);
        // }
        //
        // socket.on('connect', onConnect);
        // socket.on('disconnect', onDisconnect);
        // socket.on('foo', onFooEvent);
        //
        // return () => {
        //     socket.off('connect', onConnect);
        //     socket.off('disconnect', onDisconnect);
        //     socket.off('foo', onFooEvent);
        // };
    }, [])

    useEffect(() => {
        if (!isConnected) {
            socket.connect()
        }
    })

    return (
        <div className="App">
            <RoomInit />
            {/*<ConnectionState isConnected={ isConnected } />*/}
            {/*<Events events={ fooEvents } />*/}
            {/*<ConnectionManager />*/}
            {/*<MyForm />*/}
        </div>
    )
}
