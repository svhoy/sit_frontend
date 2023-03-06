import React, { useState, useEffect, useContext } from 'react'
import ConnectingBleDevices from './BleDevices/ConnectingBleDevices';
import AuthContext from '../context/AuthContext';

export default function BleDevices() {
    const [isBackendConnected, setIsBackendConnected] = useState(false);
    const [isGatewayConnected, setIsGatewayConnected] = useState(false);
    const [isUWBDeviceConnected, setIsUWBDeviceConnected] = useState(false);
    const [ws_data, setWsData] = useState([])
    let {user} = useContext(AuthContext);

    const [ws, setWs] = useState(new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/"))

    useEffect(() => {
        if(ws != null) {
            ws.onopen = function (event) {
                console.log(user.username)
                ws.send(
                    JSON.stringify( {
                        type: "connection_register",
                        device_id: "Frontend_" + user.username
                    })
                )
            }

            ws.onmessage = function (event) {
                let data = JSON.parse(event.data)
                setWsData(data)
                if(data.type === "connection_established") {
                    if (data.connected === true) {
                        setIsBackendConnected(true)
                    }
                }
            };
        
            ws.onclose = function (event) {
                setIsBackendConnected(false)
                setIsGatewayConnected(false)
                setIsUWBDeviceConnected(false)
                setTimeout(() => {
                    setWs(new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/"));
                }, 1000);
            }

            ws.onerror = function (err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                setIsBackendConnected(false);
                setIsGatewayConnected(false)
                setIsUWBDeviceConnected(false)
                ws.close();
            };

            return () => {
                setIsBackendConnected(false);
                setIsGatewayConnected(false)
                setIsUWBDeviceConnected(false)
            };
        }
    }, [ws])

    return (
    <>  
        <div className='md:grid md:grid-cols-1 md:gap-10'>
            <div>
                <ConnectingBleDevices 
                    isBackendConnected={isBackendConnected}
                    isGatewayConnected={isGatewayConnected}
                    isUWBDeviceConnected={isUWBDeviceConnected}
                    ws={ws}
                    ws_data={ws_data}
                />
            </div>
        </div>
        
    </>
  );
}
