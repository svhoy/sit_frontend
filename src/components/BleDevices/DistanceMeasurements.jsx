/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import WebSocketContex from "../../context/WebSocketContex"
import DeviceInformation from "../Informations/DeviceInformation"
import DeviceSelect from "../Selects/DeviceSelect"
import ScatterChartTest from "../Charts/ScatterChartTest"
import StaticSelect from "../Selects/StaticSelect"

export default function DistanceMeasurements({
    testID,
    testDistance,
    minMeasurements,
    maxMeasurements,
    initiator,
    responder,
    init_rx_ant_dly,
    init_tx_ant_dly,
    resp_rx_ant_dly,
    resp_tx_ant_dly,
    measurementTypePre,
    devicePreSelected
}) {
    const [initiatorDevice, setInitinatorDevice] = useState([])
    const [responderDevice, setResponderDevice] = useState([])
    const [distanceMeasurementLog, setDistanceMeasurementLog] = useState([])
    const [distanceData, setDistanceData] = useState([])
    const [distancePoints, setdistancePoints] = useState(0)
    const [measurementType, setMeasurementType] = useState("")
    const [measurementTypeOptions] = useState([["SS-TWR", "ss_twr"], ["DS-TWR", "ds_3_twr"]])
    const [measurementIsRunning, setMeasurementIsRunning] = useState(false)
    const [canStop, setCanStop] = useState(false)
    const distanceTextarea = useRef()
    let navigate = useNavigate()

    const { uwbList, message, send } = useContext(WebSocketContex)

    const startMeasurements = () => {
        try {
            if (devicePreSelected) {
                send(
                    JSON.stringify({
                        type: "StartTestMeasurement",
                        data: {
                            test_id: parseInt(testID),
                            initiator,
                            responder: [responder],
                            measurement_type: measurementTypePre,
                            min_measurement: minMeasurements,
                            max_measurement: maxMeasurements,
                            init_rx_ant_dly: init_rx_ant_dly,
                            init_tx_ant_dly: init_tx_ant_dly,
                            resp_rx_ant_dly: resp_rx_ant_dly,
                            resp_tx_ant_dly: resp_tx_ant_dly,

                        }
                    })
                )
            } else {
                console.log("test")
                send(
                    JSON.stringify({
                        type: "StartDistanceMeasurement",
                        data: {
                            initiator: initiatorDevice[1],
                            responder: [responderDevice[1]],
                            measurement_type: measurementType
                        }
                    })
                )
            }
            setDistanceData([])
            setdistancePoints(0)
            setDistanceMeasurementLog([])
            setMeasurementIsRunning(true)
            if (minMeasurements === 0) {
                setCanStop(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const stopMeasurements = () => {
        try {
            send(
                JSON.stringify({
                    type: "StopDistanceMeasurement",
                    data: {
                    }
                })
            )
            setMeasurementIsRunning(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleInitiatorValue = (selectedDeviceID) => {
        setInitinatorDevice(selectedDeviceID)
    }
    const handleResponderValue = (selectedDeviceID) => {
        setResponderDevice(selectedDeviceID)
    }

    const handleMeasurementTypeSelectChange = (value) => {
        setMeasurementType(value)
    }

    let checkUwbList = (deviceName) => {
        return Array.isArray(uwbList) ? uwbList.includes(deviceName) : false
    }

    useEffect(() => {
        if (message.type === "MeasurementSaved") {
            setdistancePoints(distancePoints + 1)
            setDistanceMeasurementLog((distanceMeasurementLog) => {
                return [
                    // eslint-disable-next-line
                    `${distanceMeasurementLog + message.data.distance}m  ${message.data.e_distance
                    }m  \n`
                ]
            })
            setDistanceData([
                ...distanceData,
                {
                    x: message.data.distance,
                    y: message.data.e_distance,
                    dataPoints: distancePoints
                }
            ])
            const area = distanceTextarea.current
            area.scrollTop = area.scrollHeight
            if (minMeasurements >= distancePoints || minMeasurements === 0) {
                setCanStop(true)
            }
            if (maxMeasurements !== 0 && maxMeasurements <= distancePoints) {
                stopMeasurements()
            }
        } else if (message.type === "TestFinished") {
            message.type = "Broken"
            setMeasurementIsRunning(false)
            navigate(`/tests/review/${message.data.test_id}`)
        }
    }, [message])

    useEffect(() => {
        if (minMeasurements === null) {
            setCanStop(true)
        }
    }, [measurementIsRunning])

    useEffect(() => {}, [uwbList])
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Distance Measurements
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
                    <div className="bg-gray-50 dark:bg-neutral-700 px-1 py-3 text-right sm:px-3">
                        {((checkUwbList(initiatorDevice[1])
                            && (initiatorDevice[1] !== responderDevice[1]))
                            || devicePreSelected)
                            && !measurementIsRunning ? (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={startMeasurements}
                            >
                                Start Measurements
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Start Measurements
                            </button>
                        )}
                        {measurementIsRunning && canStop ? (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                onClick={stopMeasurements}
                            >
                                Stop Measurements
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                disabled
                            >
                                Stop Measurements
                            </button>
                        )}
                    </div>
                    <div className="space-y-6 px-4 py-5 sm:p-6">
                        {!devicePreSelected ? (
                            <>
                                <DeviceSelect
                                    handleSelectedValue={handleInitiatorValue}
                                    lableName="Initiator"
                                    uwbList={uwbList}
                                    couldEmpty
                                />
                                <DeviceSelect
                                    handleSelectedValue={handleResponderValue}
                                    lableName="Responder"
                                    uwbList={uwbList}
                                    couldEmpty
                                />
                                <StaticSelect
                                    handleSelectedValue={handleMeasurementTypeSelectChange}
                                    label="Measurement Type"
                                    options={measurementTypeOptions}
                                />
                            </>
                        ) : (<div />)}
                        <label
                            htmlFor="distanceMeasurementLog"
                            className="block text-sm font-medium"
                        >
                            Distance Measurements
                            <div className="mt-1">
                                <textarea
                                    className="mt-1 block w-full rounded-md dark:bg-neutral-600 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows="8"
                                    type="text"
                                    id="distanceMeasurementLog"
                                    ref={distanceTextarea}
                                    label="Distance Measurment Log"
                                    value={distanceMeasurementLog}
                                    readOnly
                                />
                                <ScatterChartTest
                                    distanceData={distanceData}
                                    testDistance={testDistance}
                                />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

DistanceMeasurements.propTypes = {
    testID: PropTypes.number,
    testDistance: PropTypes.number,
    minMeasurements: PropTypes.number,
    maxMeasurements: PropTypes.number,
    initiator: PropTypes.string,
    responder: PropTypes.string,
    measurementTypePre: PropTypes.string,
    devicePreSelected: PropTypes.bool,
    init_rx_ant_dly: PropTypes.number,
    init_tx_ant_dly: PropTypes.number,
    resp_rx_ant_dly: PropTypes.number,
    resp_tx_ant_dly: PropTypes.number
}

DistanceMeasurements.defaultProps = {
    testID: null,
    testDistance: null,
    minMeasurements: 0,
    maxMeasurements: 0,
    initiator: null,
    responder: null,
    measurementTypePre: null,
    devicePreSelected: false,
    init_rx_ant_dly: 2.630913330620677e-07,
    init_tx_ant_dly: 2.630913330620677e-07,
    resp_rx_ant_dly: 2.630913330620677e-07,
    resp_tx_ant_dly: 2.630913330620677e-07
}
