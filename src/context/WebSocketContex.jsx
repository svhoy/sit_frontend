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
        let socket = new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/")
        socket.onopen = () => {
            setIsServerReady(true)
            socket.send(
                JSON.stringify({
                    type: "connection_register",
                    device_id: `Frontend_${user.username}`
                })
            )
        }
        socket.onclose = () => {
            setIsServerReady(false)
            setTimeout(() => {
                socket = new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/")
            }, 1000)
        }
        socket.onerror = (err) => {
            console.error("Socket encountered error: ", err.message, "Closing socket")
            setIsServerReady(false)
            socket.close()
        }

        socket.onmessage = (event) => {
            let data = JSON.parse(event.data)
            setMessage(data)
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
                    setUwbList([])
                }
                if (data.connection_list.includes(`Frontend_${user.username}`)) {
                    setIsServerReady(true)
                }
                if (data.device_list && data.device_list.length > 0) {
                    setUwbList(data.device_list)
                } else {
                    setUwbList([])
                }
            } else if (data.type === "scanning_state" && data.scan.connection === "complete") {
                if (data.scan.device_name !== "") {
                    setUwbList((uwbList) => {
                        return [...uwbList, data.scan.device_name]
                    })
                }
            } else if (data.type === "scanning_state" && data.scan.connection === "disconnect") {
                console.log(data.scan)
                setUwbList((uwbList) => {
                    return uwbList.filter((item) => {
                        return item !== data.scan.device_name
                    })
                })
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
