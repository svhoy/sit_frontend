import React, { useState, useEffect } from 'react'

export default function ProvisioningDevices(scan) {
    const [isConnected, setIsConnected] = useState(false);
    const [provisioningDevices, setProvisioningDevices] = useState([])
    const [message, setMessage] = useState([]);

    const [ws, setWs] = useState(new WebSocket("ws://127.0.0.1:8000/ws/ble-provisioning/"))

    useEffect(() => {
        if(ws != null) {
            ws.onmessage = function (event) {
                let data = JSON.parse(event.data)
                
                if(data.type === "connection_established") {
                    
                    if (data.connected === true) {
                        setMessage(data.message)
                        setIsConnected(true)
                    }
                }

                if(data.type === "prov_state") {
                    setProvisioningDevices(data.scan.unprovisioned)
                }
            };
        
            ws.onclose = function (event) {
                setMessage(null)
                setIsConnected(false)
                setTimeout(() => {
                    setWs(new WebSocket("ws://127.0.0.1:8000/ws/ble-provisioning/"));
                }, 1000);
            }

            ws.onerror = function (err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                setIsConnected(false);
                ws.close();
            };

            return () => {
                ws.close();
            };
        }
    }, [ws])

    const startProvisioning = () => {
        
    }


    return (
    <>  
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Provisioning new Devices
                    </h3>
                    <div>Connection Status: {message}</div>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <form onSubmit={startProvisioning}>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            {(isConnected && provisioningDevices) ? (
                                <button
                                    type='submit' 
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                >
                                    Start Provisioning
                                </button>
                            ):(
                                <button
                                    type='submit' 
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                    disabled
                                >
                                    Start Provisioning
                                </button>
                            )}
                        </div>
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <table className="table-auto  min-w-full ">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            UUID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {provisioningDevices && provisioningDevices.map((item) => (
                                    <>
                                        <tr key={item}>
                                            <td>
                                                <input type="checkbox"></input>
                                            </td>
                                            <td>
                                                {item}
                                            </td>
                                        </tr>
                                    </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}