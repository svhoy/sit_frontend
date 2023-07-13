/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from "react"

import PropTypes from "prop-types"
import WebSocketContex from "../../context/WebSocketContex"
import DeviceInformation from "../Informations/DeviceInformation"
import DeviceSelect from "../Selects/DeviceSelect"
import ScatterChartTest from "../Charts/ScatterChartTest"

export default function DistanceMeasurements({
    testID,
    testDistance,
    minMeasurements,
    maxMeasurements,
    devicePreSelected
}) {
    const [initiatorDevice, setInitinatorDevice] = useState([])
    const [responderDevice, setResponderDevice] = useState([])
    const [distanceMeasurementLog, setDistanceMeasurementLog] = useState([])
    const [distanceData, setDistanceData] = useState([])
    const [distancePoints, setdistancePoints] = useState(0)
    const [measurementIsRunning, setMeasurementIsRunning] = useState(false)
    const [canStop, setCanStop] = useState(null)
    const distanceTextarea = useRef()

    const { uwbList, message, send } = useContext(WebSocketContex)

    const startMeasurements = () => {
        try {
            if (devicePreSelected) {
                send(
                    JSON.stringify({
                        type: "distance_msg",
                        data: {
                            state: "start",
                            test_id: testID
                        }
                    })
                )
            } else {
                send(
                    JSON.stringify({
                        type: "distance_msg",
                        data: {
                            state: "start",
                            test_id: testID
                        },
                        setup: {
                            initiator_device: initiatorDevice[1],
                            responder_device: [responderDevice[1]]
                        }
                    })
                )
            }
            setDistanceData([])
            setdistancePoints(0)
            setDistanceMeasurementLog([])
            setMeasurementIsRunning(true)
        } catch (error) {
            console.error(error)
        }
    }

    const stopMeasurements = () => {
        try {
            send(
                JSON.stringify({
                    type: "distance_msg",
                    data: {
                        state: "stop",
                        test_id: testID
                    },
                    setup: null
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

    let checkUwbList = (deviceName) => {
        return Array.isArray(uwbList) ? uwbList.includes(deviceName) : false
    }

    useEffect(() => {
        if (message.type === "distance_msg" && message.data.state === "scanning") {
            setdistancePoints(distancePoints + 1)
            setDistanceMeasurementLog((distanceMeasurementLog) => {
                return [
                    // eslint-disable-next-line
                    `${distanceMeasurementLog + message.data.distance}m  ${message.data.error_distance
                    }m  \n`
                ]
            })
            setDistanceData([
                ...distanceData,
                {
                    x: message.data.distance,
                    y: message.data.error_distance,
                    dataPoints: distancePoints
                }
            ])
            const area = distanceTextarea.current
            area.scrollTop = area.scrollHeight
            if (minMeasurements >= distancePoints || minMeasurements === null) {
                setCanStop(true)
            }
            if (maxMeasurements !== null && maxMeasurements <= distancePoints) {
                stopMeasurements()
            }
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
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Distance Measurments
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
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
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
                            </>
                        ) : (<div />)}
                        <label
                            htmlFor="distanceMeasurementLog"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Distance Measurements
                            <div className="mt-1">
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
    devicePreSelected: PropTypes.bool
}

DistanceMeasurements.defaultProps = {
    testID: null,
    testDistance: null,
    minMeasurements: null,
    maxMeasurements: null,
    devicePreSelected: false
}
