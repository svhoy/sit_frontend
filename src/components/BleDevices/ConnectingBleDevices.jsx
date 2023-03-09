import React, { useState, useEffect} from 'react'


export default function ConnectingBleDevices(props) {
    const { isBackendConnected, isGatewayConnected, isUWBDeviceConnected, ws, ws_data } = props
    const [isScanning, setScanning] = useState(false);
    const [connectionLog, setConnectionLog] = useState([]);

    useEffect(() => {
        let data = ws_data
        if(data.type=== "connection_established"){
            setScanning(false)
        } else if (data.type === "scanning_state" && data.scan.state == true) {
            setConnectionLog(connectionLog => [connectionLog + data.scan.message + "\n"])
        } else if(data.type === "scanning_state" && data.scan.state == false) {
            setScanning(false)
            setConnectionLog(connectionLog => [connectionLog + data.scan.message + "\n"])
        }
    }, [ws_data])

    useEffect(() => {
        if(!isBackendConnected || !isGatewayConnected) {
            setConnectionLog([])
        }
    }, [isBackendConnected])

    const startConnecting = () => {
        setScanning(true)
        setConnectionLog([])
        try {
            ws.send(
                JSON.stringify( {
                    type: "scanning_state",
                    scan: {
                        state: true,
                        device_name: "DWM3001 Blue"
                    }
                })
            )
        } catch (error){
            console.error(error)
        }
    }

    const disconnecting = () => {
        setScanning(false)
        try {
            ws.send(
                JSON.stringify( {
                    type: "scanning_update",
                    scan: {
                        device_name: "DWM3001 Blue",
                        device_state: "disconnect"
                    }
                })
            )
        } catch (error){
            console.error(error)
        }
    }

    return (
    <>  
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Connect Device
                    </h3>
                    <div className='grid grid-cols-2 gap-0'>
                        <div>Server Status:</div>
                        {isBackendConnected ? (
                            <div className='rounded-full w-5 h-5 bg-green-600'></div>
                        ) : (
                            <div className='rounded-full w-5 h-5 bg-red-600'></div>
                        )}
                    </div>
                    <div className='grid grid-cols-2 gap-0'>
                        <div>PI Status:</div>
                        {isGatewayConnected ? (
                            <div className='rounded-full w-5 h-5 bg-green-600'></div>
                        ) : (
                            <div className='rounded-full w-5 h-5 bg-red-600'></div>
                        )}
                    </div>
                    <div className='grid grid-cols-2 gap-0'>
                        <div>DWM3001 Status:</div>
                        {isUWBDeviceConnected ? (
                            <div className='rounded-full w-5 h-5 bg-green-600'></div>
                        ) : (
                            <div className='rounded-full w-5 h-5 bg-red-600'></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                        {(isBackendConnected && isGatewayConnected && isUWBDeviceConnected && !isScanning) ? (
                            <button
                                type='button' 
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={disconnecting}
                            >
                                Disconnect
                            </button>
                        ):(
                            <button
                                type='button' 
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Disconnect
                            </button>
                        )}   
                        {(isBackendConnected && isGatewayConnected && !isUWBDeviceConnected && !isScanning) ? (
                            <button
                                type='button' 
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={startConnecting}
                            >
                                Start connect
                            </button>
                        ):(
                            <button
                                type='button' 
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Start Connect
                            </button>
                        )}   
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <label htmlFor="connectionLog" className="block text-sm font-medium text-gray-700">Connection Log</label>
                        <div className="mt-1">
                            <textarea 
                                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                rows="8"
                                type='text'
                                id="connectionLog"
                                label="Connection Log"
                                value={connectionLog}
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