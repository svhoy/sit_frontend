import React, { useState, useEffect, useContext } from "react"
import WebSocketContex from "../../context/WebSoketContex"

export default function ConnectingBleDevices() {
    const [isScanning, setScanning] = useState(false)
    const [connectionLog, setConnectionLog] = useState([])

    const { isReady, isGatewayReady, isUWBReady, message, send } = useContext(WebSocketContex)

    useEffect(() => {
        if (isReady) {
            if (message.type === "connection_established") {
                setScanning(false)
            } else if (message.type === "scanning_state" && message.scan.state === true) {
                setConnectionLog((connectionLog) => {
                    return [`${connectionLog + message.scan.message}\n`]
                })
            } else if (message.type === "scanning_state" && message.scan.state === false) {
                setScanning(false)
                setConnectionLog((connectionLog) => {
                    return [`${connectionLog + message.scan.message}\n`]
                })
            } else if (
                message.type === "scanning_state" &&
                message.scan.connection === "disconnect"
            ) {
                setScanning(false)
                setConnectionLog((connectionLog) => {
                    return [`${connectionLog + message.scan.message}\n`]
                })
            }
        }
    }, [isReady, message])

    useEffect(() => {
        if (!isReady || !isGatewayReady) {
            setConnectionLog([])
        }
    }, [isReady, isGatewayReady])

    useEffect(() => {}, [isUWBReady])

    const startConnecting = () => {
        setScanning(true)
        setConnectionLog([])
        try {
            send(
                JSON.stringify({
                    type: "scanning_state",
                    scan: {
                        state: true,
                        device_name: "DWM3001 Blue"
                    }
                })
            )
        } catch (error) {
            console.error(error)
        }
    }

    const disconnecting = () => {
        setScanning(false)
        try {
            send(
                JSON.stringify({
                    type: "scanning_state",
                    scan: {
                        state: false,
                        device_name: "DWM3001 Blue",
                        connection: "disconnect"
                    }
                })
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Connect Device
                    </h3>
                    <div className="grid grid-cols-2 gap-0">
                        <div>Server Status:</div>
                        {isReady ? (
                            <div className="rounded-full w-5 h-5 bg-green-600" />
                        ) : (
                            <div className="rounded-full w-5 h-5 bg-red-600" />
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                        <div>PI Status:</div>
                        {isGatewayReady ? (
                            <div className="rounded-full w-5 h-5 bg-green-600" />
                        ) : (
                            <div className="rounded-full w-5 h-5 bg-red-600" />
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                        <div>DWM3001 Status:</div>
                        {isUWBReady ? (
                            <div className="rounded-full w-5 h-5 bg-green-600" />
                        ) : (
                            <div className="rounded-full w-5 h-5 bg-red-600" />
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                        {isReady && isGatewayReady && isUWBReady && !isScanning ? (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={disconnecting}
                            >
                                Disconnect
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Disconnect
                            </button>
                        )}
                        {isReady && isGatewayReady && !isUWBReady && !isScanning ? (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={startConnecting}
                            >
                                Start connect
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Start Connect
                            </button>
                        )}
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <label
                            htmlFor="connectionLog"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Connection Log
                            <div className="mt-1">
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows="8"
                                    type="text"
                                    id="connectionLog"
                                    label="Connection Log"
                                    value={connectionLog}
                                    readOnly
                                />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
