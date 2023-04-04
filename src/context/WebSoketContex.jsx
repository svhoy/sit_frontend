import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import AuthContext from "./AuthContext"

const WebSocketContex = createContext(false, false, false, {}, () => {})

export default WebSocketContex

// eslint-disable-next-line react/prop-types
export const WebSocketProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false)
    const [isUWBReady, setIsUWBReady] = useState(false)
    const [isGatewayReady, setIsGatewayReady] = useState(false)
    const [message, setMessage] = useState({})
    let { user } = useContext(AuthContext)

    const ws = useRef(null)

    useEffect(() => {
        let socket = new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/")
        socket.onopen = () => {
            setIsReady(true)
            socket.send(
                JSON.stringify({
                    type: "connection_register",
                    device_id: `Frontend_${user.username}`
                })
            )
        }
        socket.onclose = () => {
            setIsReady(false)
            setTimeout(() => {
                socket = new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/")
            }, 1000)
        }
        socket.onerror = (err) => {
            console.error("Socket encountered error: ", err.message, "Closing socket")
            setIsReady(false)
            socket.close()
        }

        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)

            if (data.type === "connection_ping") {
                socket.send(
                    JSON.stringify({
                        type: "connection_ping",
                        device_id: `Frontend_${user.username}`
                    })
                )
            } else if (data.type === "connection_update") {
                if (data.connection_list.includes("PI_Home")) {
                    setIsGatewayReady(true)
                } else {
                    setIsGatewayReady(false)
                    setIsUWBReady(false)
                }
                if (data.connection_list.includes(`Frontend_${user.username}`)) {
                    setIsReady(true)
                }
                if (data.device_list.includes("DWM3001 Blue")) {
                    setIsUWBReady(true)
                } else {
                    setIsUWBReady(false)
                }
            } else if (data.type === "scanning_state" && data.scan.connection === "complete") {
                if (data.scan.device_name !== "") {
                    setIsUWBReady(true)
                } else {
                    setIsUWBReady(false)
                }
            } else if (data.type === "scanning_state" && data.scan.connection === "disconnect") {
                setIsUWBReady(false)
            } else {
                setMessage(data)
            }
        }

        ws.current = socket
        return () => {
            socket.close()
        }
    }, [])

    let contexData = {
        isReady,
        isUWBReady,
        isGatewayReady,
        message,
        send: ws.current?.send.bind(ws.current)
    }

    return <WebSocketContex.Provider value={contexData}>{children}</WebSocketContex.Provider>
}

WebSocketProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}
