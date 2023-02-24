import React, { useState, useEffect} from 'react'


export default function ScanningDevices(props) {
    const { isConnected, ws, ws_data } = props
    const [isScanning, setScanning] = useState(false);
    const [scanningLog, setScanningLog] = useState([]);

    useEffect(() => {
        let data = ws_data
            
        if(data.type === "connection_established") {
            setScanning(data.scan.state)
        }
        if(data.type === "scanning_state") {
            setScanning(data.scan.state)
            if (data.scan.hasOwnProperty('unprovisioned') && data.scan.unprovisioned != null) {
                setScanningLog(scanningLog => [scanningLog + data.scan.unprovisioned + "\n"])
            }
            setScanningLog(scanningLog => [scanningLog + data.scan.message + "\n"])
        }
    }, [ws_data])

    useEffect(() => {
        if(!isConnected) {
            setScanningLog([])
        }
    }, [isConnected])

    const startScan = () => {
        
        setScanningLog([])
        try {
            ws.send(
                JSON.stringify( {
                    type: "scanning_update",
                    scan: {
                        state: true
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
                        Scanning for new Devices
                    </h3>
                    <div className='grid grid-cols-2 gap-0'>
                        <div>Connection Status:</div>
                        {isConnected ? (
                            <div className='rounded-full w-5 h-5 bg-green-600'></div>
                        ) : (
                            <div className='rounded-full w-5 h-5 bg-red-600'></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            {(isConnected && !isScanning) ? (
                                <button
                                    type='button' 
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                    onClick={startScan}
                                >
                                    BLE Mesh Scan
                                </button>
                            ):(
                                <button
                                    type='button' 
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                    disabled
                                >
                                    BLE Test Scan
                                </button>
                            )}   
                        </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <label htmlFor="scanningLog" className="block text-sm font-medium text-gray-700">Scanning Log</label>
                        <div className="mt-1">
                            <textarea 
                                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                rows="8"
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