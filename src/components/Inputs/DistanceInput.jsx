/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function DistanceInput({ handleInputValue, deviceList }) {
    const [deviceCombinations, setDeviceCombinations] = useState([])

    const generateDeviceCombinations = () => {
        let arr = []
        for (let i = 0; i < deviceList.length - 1; i++) {
            for (let j = i + 1; j < deviceList.length; j++) {
                arr.push([deviceList[i], deviceList[j]])
            }
            setDeviceCombinations(arr)
        }
    }

    useEffect(() => {
        console.log(deviceList)
        if (deviceList.length > 2) {
            generateDeviceCombinations()
        } else {
            setDeviceCombinations([])
        }
    }, [deviceList])

    return (
        <div>
            <div className="text-sm font-semibold leading-6 text-gray-900">
                Device Distances
            </div>
            {deviceCombinations.length > 2 ? (
                deviceCombinations
                && deviceCombinations.map((item) => {
                    return (
                        <label
                            htmlFor={item}
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Distance
                            {" "}
                            {item[0]}
                            {" "}
                            to
                            {" "}
                            {item[1]}
                            <div className="mt-1">
                                <input
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="number"
                                    id={item}
                                    label="Test reale distance"
                                    min="0"
                                    step="0.001"
                                    onChange={
                                        (event) => {
                                            handleInputValue(event, item)
                                        }
                                    }
                                    required
                                />
                            </div>
                        </label>
                    )
                })
            ) : (
                <div className="col-span-2 text-sm font-medium leading-6 text-gray-900">
                    Not enough devices selected
                </div>
            )}

        </div>
    )
}

DistanceInput.propTypes = {
    handleInputValue: PropTypes.func.isRequired,
    deviceList: PropTypes.arrayOf(PropTypes.string).isRequired
}
