import React from "react"
import PropTypes from "prop-types"

export default function DeviceInformation({ deviceName, deviceStatus }) {
    return (
        <>
            <div>{`${deviceName} Status:`}</div>
            {deviceStatus ? (
                <div className="rounded-full w-5 h-5 bg-green-600" />
            ) : (
                <div className="rounded-full w-5 h-5 bg-red-600" />
            )}
        </>
    )
}

DeviceInformation.propTypes = {
    deviceName: PropTypes.string.isRequired,
    deviceStatus: PropTypes.bool.isRequired
}
