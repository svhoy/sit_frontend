/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DeviceSelect from "../Selects/DeviceSelect"
import DeviceInformation from "../Informations/DeviceInformation"
import WebSocketContex from "../../context/WebSocketContex"

export default function ConnectingBleDevices() {
    const [isScanning, setScanning] = useState(false)
    const [connectionLog, setConnectionLog] = useState([])
    const [deviceName, setDeviceName] = useState("")
    const { isServerReady, isGatewayReady, uwbList, message, send } = useContext(WebSocketContex)

    useEffect(() => {
        if (isServerReady) {
            if (message.type === "connection_established") {
                setScanning(false)
            } else if (message.type === "scanning_state" && message.scan.state === true) {
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
            } else if (
                message.type === "scanning_state" &&
                message.scan.connection === "complete"
            ) {
                setScanning(false)
                setConnectionLog((connectionLog) => {
                    return [`${connectionLog + message.scan.message}\n`]
                })
            } else if (message.type === "scanning_state" && message.scan.state === false) {
                setScanning(false)
                setConnectionLog((connectionLog) => {
                    return [`${connectionLog + message.scan.message}\n`]
                })
            }
        }
    }, [isServerReady, message, uwbList])

    useEffect(() => {
        if (!isServerReady || !isGatewayReady) {
            setConnectionLog([])
        }
    }, [isServerReady, isGatewayReady])

    useEffect(() => {
        console.log(uwbList)
    }, [uwbList])

    const handleSelectedValue = (selectedDeviceID) => {
        setDeviceName(selectedDeviceID[1])
    }

    const startConnecting = () => {
        setScanning(true)
        setConnectionLog([])
        try {
            send(
                JSON.stringify({
                    type: "scanning_state",
                    scan: {
                        state: true,
                        device_name: deviceName
                    }
                })
            )
            console.log("Test")
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
                        device_name: deviceName,
                        connection: "disconnect"
                    }
                })
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-4">
            <div className="md:col-span-1 px-4 sm:px-0">
                <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                    Connect Device
                </h3>

                <div className="grid grid-cols-2 gap-10">
                    <DeviceInformation
                        deviceName="Server Status"
                        deviceStatus={isServerReady}
                    />
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <DeviceInformation
                        deviceName="Gateway Status"
                        deviceStatus={isGatewayReady}
                    />
                </div>
                {uwbList &&
                    uwbList.map((item) => {
                        return (
                            <div key={item} className="grid grid-cols-2 gap-10">
                                <DeviceInformation
                                    deviceName={item}
                                    deviceStatus
                                />
                            </div>
                        )
                    })}
                <div className="grid grid-cols-2 gap-0 mt-3">
                    <Link to="/devices/ble/add">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                        >
                            Add Device
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                        {isServerReady &&
                            isGatewayReady &&
                            !isScanning &&
                            (Array.isArray(uwbList) ? uwbList.includes(deviceName) : false) ? (
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
                        {isServerReady &&
                            isGatewayReady &&
                            !isScanning &&
                            !(Array.isArray(uwbList) ? uwbList.includes(deviceName) : false) ? (
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
                    <form className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <DeviceSelect handleSelectedValue={handleSelectedValue} lableName="Device" />
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
                    </form>
                </div>
            </div>
        </div>
    )
}
