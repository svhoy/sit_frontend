import React, { useContext } from "react"
import ConnectingBleDevices from "./BleDevices/ConnectingBleDevices"
import DistanceMeasurements from "./BleDevices/DistanceMeasurements"
import StyleContex from "../context/StyleContex"

export default function BleDevices() {
    const { containerStyle } = useContext(StyleContex)
    return (
        <div className={containerStyle.twoComponents}>
            <ConnectingBleDevices />
            <DistanceMeasurements />
        </div>
    )
}
