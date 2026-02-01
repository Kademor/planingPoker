import { useContent } from './components/Context'
import { useEffect, useState } from 'react'
import { socket } from './socket.ts'
import AppRouter from './features/AppRouter'

export default function App() {
    const { context, setContext } = useContent()
    const [isConnected, setIsConnected] = useState(socket.connected)
    useEffect(() => {
        if (!isConnected) {
            socket.connect()
        }
    }, [isConnected])

    return (
        <div className="App">
            <AppRouter />
        </div>
    )
}
