import React, { useState, useEffect, useRef, useContext } from "react"

import PropTypes from "prop-types"
import WebSocketContex from "../../context/WebSocketContex"
import ScatterChartTest from "../Charts/ScatterChartTest"

export default function DistanceMeasurements({
    testID,
    testDistance,
    minMeasurements,
    maxMeasurements
}) {
    const [distanceMeasurementLog, setDistanceMeasurementLog] = useState([])
    const [distanceData, setDistanceData] = useState([])
    const [distancePoints, setdistancePoints] = useState(0)
    const [measurementIsRunning, setMeasurementIsRunning] = useState(false)
    const [canStop, setCanStop] = useState(null)
    const distanceTextarea = useRef()

    const { isReady, isUWBReady, message, send } = useContext(WebSocketContex)

    const startMeasurements = () => {
        try {
            send(
                JSON.stringify({
                    type: "distance_msg",
                    data: {
                        state: "start",
                        distance: null,
                        test_id: testID
                    }
                })
            )
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
                        distance: null,
                        test_id: testID
                    }
                })
            )
            setMeasurementIsRunning(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (isReady) {
            if (message.type === "distance_msg" && message.data.state === "scanning") {
                setdistancePoints(distancePoints + 1)
                let errorDistance = message.data.distance - testDistance
                setDistanceMeasurementLog((distanceMeasurementLog) => {
                    return [
                        `${distanceMeasurementLog + message.data.distance}m  ${errorDistance}m  \n`
                    ]
                })
                setDistanceData([
                    ...distanceData,
                    { x: message.data.distance, y: errorDistance, dataPoints: distancePoints }
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
        }
    }, [isReady, message])

    useEffect(() => {}, [isUWBReady])
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Distance Measurments
                    </h3>
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
                        {isUWBReady ? (
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
    maxMeasurements: PropTypes.number
}

DistanceMeasurements.defaultProps = {
    testID: null,
    testDistance: null,
    minMeasurements: null,
    maxMeasurements: null
}
