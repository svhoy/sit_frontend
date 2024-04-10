import React, { useState, useEffect, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../../utils/useFetch"
import StaticSelect from "../Selects/StaticSelect"
import LineDivider from "../Dividers/LineDivider"
import WebSocketContex from "../../context/WebSocketContex"
import StyleContex from "../../context/StyleContex"



export default function CalibrationCopieForm() {
    let params = useParams()
    let api = useFetch()

    const { message, send } = useContext(WebSocketContex)
    const { formStyle, descriptionStyle } = useContext(StyleContex)

    const [calibration, setCalibration] = useState({})
    const [calibrationDistances, setCalibrationDistances] = useState([])
    const [devices, setDevices] = useState([])
    const [calibrationIsRunning, setCalibrationIsRunning] = useState(false)
    const [calibrationType, setCalibrationType] = useState("")
    const [calibrationOptions] = useState(["Antenna Calibration (ASP014)", "Antenna Calibration (PSO) - EDM", "Antenna Calibration (PSO) - ADS", "Antenna Calibration (GNA) - ADS"])
    const [informationLog, setInformationLog] = useState("")
    const [calibrationUrl] = useState(`/api/calibration/${params.calibrationID}/`)
    const [calibrationDistanceUrl] = useState(`/api/calibration-distance?calibration=${params.calibrationID}`)
    const informationTextarea = useRef()

    let getDevices = async (url = calibrationUrl) => {
        let { response, data } = await api(url)
        console.log(data)
        if (response.status === 200) {
            const device_buf = devices
            if (!device_buf.some(device => device.device_id === data.device_id)) {
                device_buf.push(data)
            }
            setDevices(device_buf)
        }
    }
    let getCalibrationDistances = async (url = calibrationDistanceUrl) => {
        let { response, data } = await api(url)
        console.log(data)
        if (response.status === 200) {
            setCalibrationDistances(data.results)
        }
    }



    let getCalibration = async (url = calibrationUrl) => {
        let { response, data } = await api(url)
        if (response.status === 200) {
            setCalibration(data)
            setDevices([])
            data.devices.map((deviceID) => {
                getDevices(`/api/device/${deviceID}/`)
            })
            console.log(data)
        }
    }

    const copieCalibration = () => {
        try {
            send(
                JSON.stringify({
                    type: "CopieCalibration",
                    data: {
                        copie_calibration_id: params.calibrationID,
                        calibration_type: calibrationType,
                    }
                })
            )
            setInformationLog([])
            setCalibrationIsRunning(true)
        } catch (error) {
            console.error(error)
        }
    }

    const handleTypeSelectChange = (value) => {
        setCalibrationType(value)
    }

    useEffect(() => {
        getCalibration()
        getCalibrationDistances()
    }, [])

    useEffect(() => {
        if (message.type === "CalibrationCopied") {
            try {
                send(
                    JSON.stringify({
                        type: "CalibrationMeasurementFinished",
                        data: {
                            calibration_id: message.data.calibration_id,
                        }
                    })
                )
                console.log("Calibration Copied: ", message.data.calibration_id)
                setInformationLog(`Calibration Copied: ${message.data.calibration_id} -> Start Calculation \n`)
            } catch (error) {
                console.error(error)
                setInformationLog(`Calibration Copied: ${message.data.calibration_id} -> Fail Send Calibration Distances \n`)
                setCalibrationIsRunning(false)
            }
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
    }, [message]) // Include 'send' in the dependency array

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Copie Calibration
                    </h3>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-gray-50 dark:bg-neutral-700 dark:border-b-2 dark:border-neutral-600 px-1 py-3 text-right sm:px-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            onClick={copieCalibration}
                        >
                            Copie Calibration
                        </button>
                    </div>
                    <div className="space-y-6 px-4 py-5 sm:p-6">
                        <legend className="text-sm font-semibold leading-6">
                            Calibration Options
                        </legend>
                        <StaticSelect handleSelectedValue={handleTypeSelectChange} label="Calibration Type" options={calibrationOptions} />
                        <div className={descriptionStyle.infoConatinerFull}>
                            <dt className={descriptionStyle.dt}>Measurement Type:</dt>
                            <dd className={descriptionStyle.dd}>
                                {calibration.measurement_type}
                            </dd>
                        </div>
                        <LineDivider />
                        <div className={descriptionStyle.infoConatinerFull}>
                            <dt className={descriptionStyle.dt}>Devices:</dt>
                            {devices && devices.map((device, index) => {
                                return (
                                    <dd key={index} className={descriptionStyle.dd}>
                                        {device.device_name} ({device.device_id})
                                    </dd>
                                )
                            })}
                        </div>
                        <LineDivider />
                        <div className={descriptionStyle.infoConatinerFull}>
                            <dt className={descriptionStyle.dt}>Device Distances (Real):</dt>
                            {calibrationDistances && calibrationDistances.map((calibrationDistance, index) => {
                                return (
                                    <>
                                        <dd key={index} className={descriptionStyle.dd}>
                                            {calibrationDistance.initiator} - {calibrationDistance.responder}
                                        </dd>
                                        <dd key={index} className={descriptionStyle.dd}>
                                            Distance: {calibrationDistance.distance}
                                        </dd>
                                    </>
                                )
                            })}
                        </div>
                        <LineDivider />
                        <label
                            htmlFor="distanceMeasurementLog"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Calibration Information
                            <div className="mt-1">
                                <textarea
                                    className="mt-1 block w-full rounded-md dark:bg-neutral-600 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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