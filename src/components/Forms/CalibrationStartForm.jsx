/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from "react"

import DeviceInformation from "../Informations/DeviceInformation"
import WebSocketContex from "../../context/WebSocketContex"
import LineDivider from "../Dividers/LineDivider"
import DeviceCheckboxes from "../Checkboxes/DeviceCheckboxes"
import StaticSelect from "../Selects/StaticSelect"
import DistanceInput from "../Inputs/DistanceInput"

export default function CalibrationStartForm() {
    const [deviceList, setDeviceList] = useState([])
    const [calibrationIsRunning, setCalibrationIsRunning] = useState(false)
    const [informationLog, setInformationLog] = useState("")
    const [calibrationType, setCalibrationType] = useState("")
    const [measurementType, setMeasurementType] = useState("")
    const [calibrationOptions] = useState(["Antenna Calibration (ASP014)"])
    const [measurementTypeOptions] = useState([["SS-TWR", "ss_twr"], ["DS-TWR", "ds_3_twr"]])
    const [calibrationDistances, setCalibrationDistances] = useState([])
    const informationTextarea = useRef()

    const { uwbList, message, send } = useContext(WebSocketContex)

    const startMeasurements = () => {
        try {
            send(
                JSON.stringify({
                    type: "CreateCalibration",
                    data: {
                        calibration_type: calibrationType,
                        measurement_type: measurementType,
                        devices: deviceList
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

    const handleMeasurementTypeSelectChange = (value) => {
        setMeasurementType(value)
    }

    const handleInputValue = (event, item) => {
        event.preventDefault()
        let buf = calibrationDistances
        let insert = false
        if (buf.length >= 1) {
            buf.forEach((distance, index) => {
                if (item[0] === distance[0] && item[1] === distance[1]) {
                    buf[index][2] = Number(event.target.value)
                    insert = true
                }
            })
        }
        if (insert === false) {
            buf.push([item[0], item[1], Number(event.target.value)])
        }
        console.log(buf)
        setCalibrationDistances(buf)
    }

    useEffect(() => {
        if (message.type === "CalibrationCreated") {
            try {
                send(
                    JSON.stringify({
                        type: "AddCalibrationDistances",
                        data: {
                            calibration_id: message.data.calibration_id,
                            distance_list: calibrationDistances
                        }
                    })
                )
                setInformationLog(`Calibration Added: ${message.data.calibration_id} -> Send Calibration Distances \n`)
            } catch (error) {
                console.error(error)
                setInformationLog(`Calibration Added: ${message.data.calibration_id} -> Fail Send Calibration Distances \n`)
                setCalibrationIsRunning(false)
            }
        } else if (message.type === "StartCalibrationMeasurement") {
            setInformationLog((informationLog) => {
                return [
                    // eslint-disable-next-line
                    `${informationLog} Starting Calibration Measurement \n`
                ]
            })
        } else if (message.type === "CalibrationMeasurementFinished") {
            setInformationLog((informationLog) => {
                return [
                    // eslint-disable-next-line
                    `${informationLog} Measurement Finished: ${message.data.result} \n Starting Calculation`
                ]
            })
        } else if (message.type === "CalibrationCalcFinished") {
            setInformationLog((informationLog) => {
                return [
                    // eslint-disable-next-line
                    `${informationLog} Calcuation Finished: ${message.data.result} \n`
                ]
            })
        } else if (message.type === "CalibrationResultsSaved") {
            setInformationLog((informationLog) => {
                return [
                    // eslint-disable-next-line
                    `${informationLog} Finished Calibration: ${message.data.calibration_id} \n`
                ]
            })
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
                                title="Select more devices or calibration is running"
                                disabled
                            >
                                Start Calibration
                            </button>
                        )}
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Calibration Options
                        </legend>
                        <StaticSelect handleSelectedValue={handleTypeSelectChange} label="Calibration Type" options={calibrationOptions} />
                        <StaticSelect handleSelectedValue={handleMeasurementTypeSelectChange} label="Measurement Type" options={measurementTypeOptions} />
                        <LineDivider />
                        <DeviceCheckboxes
                            handleSelectChange={handleSelectChange}
                            uwbList={uwbList}
                        />
                        <LineDivider />
                        <DistanceInput
                            handleInputValue={handleInputValue}
                            deviceList={deviceList}
                        />
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
