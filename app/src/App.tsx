import RoomInit from './components/Room/RoomInit/RoomInit.tsx'
import { Route, Routes } from 'react-router'
import Room from './components/Room'
import { useContent } from './components/Context'
import { useEffect, useState } from 'react'
import { socket } from './socket.ts'
import UserCreation from './components/UserCreation'

export default function App() {
    const { context, setContext } = useContent()
    const [isConnected, setIsConnected] = useState(socket.connected)
    useEffect(() => {
        if (!isConnected) {
            socket.connect()
        }
    })

    return (
        <div className="App">
            <Routes>
                <Route index element={<RoomInit />} />
                <Route path="/room/*" element={<Room />} />
                <Route path="/createUser/*" element={<UserCreation />} />
            </Routes>

            {/*<ConnectionState isConnected={ isConnected } />*/}
            {/*<Events events={ fooEvents } />*/}
            {/*<ConnectionManager />*/}
            {/*<MyForm />*/}
        </div>
    )
}
