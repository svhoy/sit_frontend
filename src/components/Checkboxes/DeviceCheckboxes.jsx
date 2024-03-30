/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"

export default function DeviceCheckboxes({ handleSelectChange, uwbList }) {
    let api = useFetch()

    const [deviceList, setDeviceList] = useState([])

    let getDeviceList = async () => {
        let { response, data } = await api("/api/device/")
        if (response.status === 200) {
            if (uwbList != null) {
                setDeviceList(
                    data.results.filter((item) => {
                        return uwbList.includes(item.device_id)
                    })
                )
            }
        }
    }

    useEffect(() => {
        getDeviceList()
    }, [uwbList])

    useEffect(() => {
        getDeviceList()
    }, [])

    return (
        <fieldset>
            <legend className="text-sm font-semibold leading-6">Calibration Devices</legend>
            {deviceList.length > 0 ? (
                deviceList &&
                deviceList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="grid grid-cols-5 gap-1 mt-5"
                        >
                            <input
                                className="col-span-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                id={item.device_id}
                                label="Device Checkbox"
                                type="checkbox"
                                onChange={handleSelectChange}
                            />
                            <label
                                htmlFor={item.id}
                                className="col-span-2 text-sm font-medium leading-6"
                            >
                                {item.device_name} ({item.device_id})
                            </label>
                            <input
                                className="col-span-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                label="Calibrated"
                                type="checkbox"
                                value={item.calibrated}
                                disabled
                            />
                            <div className="col-span-1 text-sm font-medium leading-6 ">
                                {item.calibrated}
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className="col-span-2 text-sm font-medium leading-6">
                    Please connect devices
                </div>
            )}
        </fieldset>
    )
}

DeviceCheckboxes.propTypes = {
    handleSelectChange: PropTypes.func.isRequired,
    uwbList: PropTypes.arrayOf(PropTypes.string)
}

DeviceCheckboxes.defaultProps = {
    uwbList: null
}
