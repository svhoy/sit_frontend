import React, { useState, useEffect } from 'react'

export default function ProvisioningDevices(props) {
    const { isConnected, ws, ws_data } = props
    const [provisioningDevices, setProvisioningDevices] = useState([])
    const [selectedUUID, setSelctedUUID] = useState(null)

    useEffect(() => {
        let data = ws_data
        if(data.type === "scanning_state" && data.scan.unprovisioned != null) {
            setProvisioningDevices(data.scan.unprovisioned)
        }
    }, [ws_data])

    useEffect(() => {
        if(!isConnected) {
            setProvisioningDevices([])
            setSelctedUUID(null)
        }
    }, [isConnected])

    const startProvisioning = (event) => {
        event.preventDefault()
        try {
            ws.send(
                JSON.stringify( {
                    type: "prov_start",
                    prov: {
                        state: true,
                        uuid: selectedUUID
                    }
                })
            )
        } catch (error){
            console.error(error)
        }
    }

    const onCheckboxChange = (value) => {
        selectedUUID === value ? setSelctedUUID(null) : setSelctedUUID(value)
    }


    return (
    <>  
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Provisioning new Devices
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
                    <form onSubmit={startProvisioning}>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            {(isConnected && selectedUUID != null) ? (
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
                                        <th className="text-sm font-medium text-gray-900 px-1 py-4 text-left">
                                            
                                        </th>
                                        <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                                            UUID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {provisioningDevices && provisioningDevices.map((item) => (
                                        <tr key={item}>
                                            <td className="text-sm font-medium text-gray-900 px-1 py-4 text-left">
                                                <input type="checkbox" onChange={() => onCheckboxChange(item)} checked={selectedUUID===item}></input>
                                            </td>
                                            <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                {item}
                                            </td>
                                        </tr>
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