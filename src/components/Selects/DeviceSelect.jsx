/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"

export default function DeviceSelect({ handleSelectedValue }) {
    let api = useFetch()

    const [deviceList, setDeviceList] = useState([])

    let getDeviceList = async () => {
        let { response, data } = await api("/api/device/")
        if (response.status === 200) {
            setDeviceList(data.results)
            handleSelectedValue(data.results[0].device_id)
        }
    }

    const handleSelectChange = (event) => {
        event.preventDefault()
        let selectedDeviceId = event.target.value
        handleSelectedValue(selectedDeviceId)
    }

    useEffect(() => {
        getDeviceList()
    }, [])

    return (
        <label
            htmlFor="device"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Device
            <div className="mt-1">
                <select
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="device"
                    label="Device"
                    onChange={handleSelectChange}
                    required
                >
                    {deviceList &&
                        deviceList.map((item) => {
                            return (
                                <option
                                    key={item.device_id}
                                    value={item.device_id}
                                >
                                    {item.device_name} ({item.device_id})
                                </option>
                            )
                        })}
                </select>
            </div>
        </label>
    )
}

DeviceSelect.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired
}
