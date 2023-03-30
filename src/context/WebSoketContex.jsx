import React, {createContext, useEffect} from "react"


const WebSocketContex = createContext({})

export default WebSocketContex

export const WebSocketProvider = ({children}) => {

    let contexData = null

    return (
        <WebSocketContex.Provider value={contexData}>
            {loading ? null : children}
        </WebSocketContex.Provider>
    )
}