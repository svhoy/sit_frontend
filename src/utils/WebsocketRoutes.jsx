import { Outlet } from "react-router-dom"
import { WebSocketProvider } from "../context/WebSocketContex"

const WebsocketRoutes = () => {
    return (
        <WebSocketProvider>
            <Outlet />
        </WebSocketProvider>
    )
}

export default WebsocketRoutes
