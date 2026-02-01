import { Route, Routes } from 'react-router'

import Room from '../../pages/Room'
import CreateUser from '../../pages/CreateUser'
import CreateRoom from '../../pages/CreateRoom'

const Index = () => {
    return (
        <Routes>
            <Route index element={<CreateRoom />} />
            <Route path="/room/*" element={<Room />} />
            <Route path="/createUser/*" element={<CreateUser />} />
        </Routes>
    )
}

export default Index
