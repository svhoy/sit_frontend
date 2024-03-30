/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"
import StyleContex from "../../context/StyleContex"

export default function DeviceSelect({ handleSelectedValue, lableName, uwbList, couldEmpty }) {
    let api = useFetch()
    const { formStyle } = useContext(StyleContex)
    const [deviceList, setDeviceList] = useState([])

    let getDeviceList = async () => {
        let { response, data } = await api("/api/device/")
        if (response.status === 200) {
            if (uwbList == null && couldEmpty === true) {
                setDeviceList([])
                handleSelectedValue([])
            } else if (uwbList != null) {
                setDeviceList(
                    data.results.filter((item) => {
                        return uwbList.includes(item.device_id)
                    })
                )
            } else {
                setDeviceList(data.results)
            }
        }
    }

    const handleSelectChange = (event) => {
        event.preventDefault()
        let selectedDeviceId = event.target.value
        let index = deviceList.findIndex((item) => {
            return Number(item.id) === Number(selectedDeviceId)
        })
        handleSelectedValue([deviceList[index].id, deviceList[index].device_id])
    }

    useEffect(() => {
        if (deviceList.length > 0) {
            handleSelectedValue([deviceList[0].id, deviceList[0].device_id])
        }
    }, [deviceList])

    useEffect(() => {
        getDeviceList()
    }, [uwbList])

    useEffect(() => {
        getDeviceList()
    }, [])

    return (
        <label
            htmlFor="device"
            className={formStyle.label}
        >
            {lableName}
            <select
                className={formStyle.select}
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
                                value={item.id}
                            >
                                {item.device_name} ({item.device_id})
                            </option>
                        )
                    })}
            </select>
        </label>
    )
}

DeviceSelect.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired,
    lableName: PropTypes.string.isRequired,
    couldEmpty: PropTypes.bool,
    uwbList: PropTypes.arrayOf(PropTypes.string)
}

DeviceSelect.defaultProps = {
    couldEmpty: false,
    uwbList: null
}
