/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFetch from "../../utils/useFetch"
import StyleContex from "../../context/StyleContex"

export default function AntennaDelaySelect({ handleSelectedValue, lableName, id, }) {
    let api = useFetch()
    const { formStyle } = useContext(StyleContex)
    const [delayList, setDelayList] = useState([])

    let getDelayList = async () => {
        setDelayList([])
        let { response, data } = await api("/api/antennadelay/?size=1000")
        console.log(data)
        if (response.status === 200) {
            setDelayList(
                data.results.filter((item) => {
                    return item.device === id
                })
            )
        }
    }


    const handleSelectChange = (event) => {
        event.preventDefault()
        let selectedDeviceId = event.target.value
        handleSelectedValue(selectedDeviceId)
    }

    useEffect(() => {
        if (delayList.length > 0) {
            handleSelectedValue(0)
        }
    }, [delayList])

    useEffect(() => {
        getDelayList()
    }, [id])

    useEffect(() => {
        getDelayList()
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
                {delayList &&
                    delayList.map((item) => {
                        return (
                            <option
                                key={item.device}
                                value={item.id}
                            >
                                {item.calibration_mod} ({item.device})
                            </option>
                        )
                    })}
            </select>
        </label>
    )
}

AntennaDelaySelect.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired,
    lableName: PropTypes.string.isRequired,
    id: PropTypes.number,

}

AntennaDelaySelect.defaultProps = {
    id: 0,
}
