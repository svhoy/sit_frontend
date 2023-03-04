import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import ConnectingBleDevices from './BleDevices/ConnectingBleDevices';

export default function BleDevices() {
    const [isConnected, setIsConnected] = useState(false);
    const [ws_data, setWsData] = useState([])
    
    const [ws, setWs] = useState(new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/"))

    useEffect(() => {
        if(ws != null) {
            ws.onmessage = function (event) {
                let data = JSON.parse(event.data)
                setWsData(data)
                if(data.type === "connection_established") {
                    if (data.connected === true) {
                        setIsConnected(true)
                    }
                }
            };
        
            ws.onclose = function (event) {
                setIsConnected(false)
                setTimeout(() => {
                    setWs(new WebSocket("ws://127.0.0.1:8000/ws/ble-devices/"));
                }, 1000);
            }

            ws.onerror = function (err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                setIsConnected(false);
                ws.close();
            };

            return () => {
                setIsConnected(false);

            };
        }
    }, [ws])

    return (
    <>  
        <div className='md:grid md:grid-cols-1 md:gap-10'>
            <div>
                <ConnectingBleDevices 
                    isConnected={isConnected}
                    ws={ws}
                    ws_data={ws_data}
                />
            </div>
        </div>
        
    </>
  );
}
