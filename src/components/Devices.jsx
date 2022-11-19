import React, { useState, useEffect } from 'react'

export default function Devices() {
    const [isConnected, setIsConnected] = useState(false);
    const [isScanning, setScanning] = useState(false);
    const [message, setMessage] = useState([]);
    const [scanningLog, setScanningLog] = useState([]);

    const ws = new WebSocket("ws://127.0.0.1:5500/ws/ble-scan/");

    ws.onmessage = (event) => {
        let data = JSON.parse(event.data)
        
        if(data.type === "connection_established") {
            setMessage(data.message)
            if (data.connected === true) {
                setIsConnected(true)
            }
        }

        if(data.type === "scanning_state") {
            setScanning(true)
            setScanningLog([...scanningLog, data.message])
        }
    };

    ws.onclose = (event) => {
        setMessage(null)
        setIsConnected(false)
    }

    const startScan = () => {
        ws.send(
            JSON.stringify( {
                scan: true
            })
        )
    }


    return (
    <>  
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Scanning for new Devices
                    </h3>
                    <p>Connection Status: {message}</p>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type='button' 
                                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isScanning ? "opacity-30" : "opacity-100"}`} 
                                onClick={startScan}
                                disabled={(!isConnected || isScanning) ? true : false}
                            >
                                BLE Mesh Scan
                            </button>
                        </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <label for="scanningLog" className="block text-sm font-medium text-gray-700">Scanning Log</label>
                        <div className="mt-1">
                            <textarea 
                                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type='text'
                                id="scanningLog"
                                label="ScanningLog"
                                value={scanningLog}
                                margin="normal"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
