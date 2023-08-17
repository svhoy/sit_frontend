/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from "react"

import DeviceInformation from "./Informations/DeviceInformation"
import WebSocketContex from "../context/WebSocketContex"
import LineDivider from "./Dividers/LineDivider"
import DeviceCheckboxes from "./Checkboxes/DeviceCheckboxes"
import StaticSelect from "./Selects/StaticSelect"

export default function Calibration() {
    const [deviceList, setDeviceList] = useState([])
    const [calibrationIsRunning, setCalibrationIsRunning] = useState(false)
    const [informationLog, setInformationLog] = useState("")
    const [calibrationType, setCalibrationType] = useState("")
    const [calibrationOptions] = useState(["Antenna Calibration"])
    const informationTextarea = useRef()

    const { uwbList, message, send } = useContext(WebSocketContex)

    const startMeasurements = () => {
        try {
            send(
                JSON.stringify({
                    type: "calibration_msg",
                    data: {
                        type: calibrationType,
                        state: "start"
                    }
                })
            )
            setInformationLog([])
            setCalibrationIsRunning(true)
        } catch (error) {
            console.error(error)
        }
    }

    let checkDeviceList = () => {
        return deviceList && deviceList.length >= 3
    }

    const handleSelectChange = (event) => {
        let selectedDeviceId = event.target.id
        if (event.target.checked) {
            setDeviceList([...deviceList, selectedDeviceId])
        } else {
            setDeviceList(
                deviceList.filter(
                    (item) => {
                        return item !== selectedDeviceId
                    }
                )
            )
        }
    }
    const handleTypeSelectChange = (value) => {
        setCalibrationType(value)
    }

    useEffect(() => {
        if (message.type === "calibration_msg" && message.data.state === "running") {
            setDeviceList([])
            setInformationLog((informationLog) => {
                return [
                    // eslint-disable-next-line
                    `${informationLog + message.data.distance}m  ${message.data.error_distance
                    }m  \n`
                ]
            })
            const area = informationTextarea.current
            area.scrollTop = area.scrollHeight
        }
    }, [message])

    useEffect(() => {}, [uwbList])
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        System Calibration
                    </h3>
                    {uwbList
                        && uwbList.map((item) => {
                            return (
                                <div
                                    key={item}
                                    className="grid grid-cols-2 gap-10"
                                >
                                    <DeviceInformation
                                        deviceName={item}
                                        deviceStatus
                                    />
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 px-1 py-3 text-right sm:px-3">
                        {!calibrationIsRunning && checkDeviceList() ? (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={startMeasurements}
                            >
                                Start Calibration
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Start Calibration
                            </button>
                        )}
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <StaticSelect handleSelectedValue={handleTypeSelectChange} label="Calibration Type" options={calibrationOptions} />
                        <LineDivider />
                        <DeviceCheckboxes handleSelectChange={handleSelectChange} />
                        <LineDivider />
                        <label
                            htmlFor="distanceMeasurementLog"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Calibration Information
                            <div className="mt-1">
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows="8"
                                    type="text"
                                    id="distanceMeasurementLog"
                                    ref={informationTextarea}
                                    label="Distance Measurment Log"
                                    value={informationLog}
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
