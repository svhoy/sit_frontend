import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import AuthContext from "./AuthContext"

const WebSocketContex = createContext(false, false, false, {}, () => {})

export default WebSocketContex

// eslint-disable-next-line react/prop-types
export const WebSocketProvider = ({ children }) => {
    const [isServerReady, setIsServerReady] = useState(false)
    const [uwbList, setUwbList] = useState([])
    const [isGatewayReady, setIsGatewayReady] = useState(false)
    const [message, setMessage] = useState({})
    let { user } = useContext(AuthContext)

    const ws = useRef(null)

    useEffect(() => {
        let socket = new WebSocket("ws://127.0.0.1:8000/ws/sit/1")
        socket.onopen = () => {
            setIsServerReady(true)
            socket.send(
                JSON.stringify({
                    type: "RegisterWsClient",
                    data: {
                        client_id: `Frontend_${user.username}`
                    }
                })
            )
        }
        socket.onclose = () => {
            setIsServerReady(false)
            setTimeout(() => {
                socket = new WebSocket("ws://127.0.0.1:8000/ws/sit/1")
            }, 5000)
        }
        socket.onerror = (err) => {
            console.error("Socket encountered error: ", err.message, "Closing socket")
            setIsServerReady(false)
            socket.close()
        }

        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            console.log(data)
            setMessage(data)
            if (data.type === "PingWsConnection") {
                socket.send(
                    JSON.stringify({
                        type: "RegisterWsClient",
                        data: {
                            client_id: `Frontend_${user.username}`
                        }
                    })
                )
            } else if (data.type === "WsClientRegisterd") {
                if (data.data.clients.includes("PI_Home")) {
                    setIsGatewayReady(true)
                } else {
                    setIsGatewayReady(false)
                    setUwbList([])
                }
                if (data.data.clients.includes(`Frontend_${user.username}`)) {
                    setIsServerReady(true)
                }
            } else if (data.type === "BleDeviceRegistered") {
                setUwbList(data.data.device_list)
            } else if (data.type === "BleDeviceUnregistered") {
                setUwbList(data.data.device_list)
            } else if (data.type === "DeviceList") {
                setUwbList(data.data.device_list)
            }
        }

        ws.current = socket
        return () => {
            socket.close()
        }
    }, [])

    let contexData = {
        isServerReady,
        uwbList,
        isGatewayReady,
        message,
        send: ws.current?.send.bind(ws.current)
    }

    return <WebSocketContex.Provider value={contexData}>{children}</WebSocketContex.Provider>
}

WebSocketProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}
