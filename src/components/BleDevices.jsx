import React from "react"
import ConnectingBleDevices from "./BleDevices/ConnectingBleDevices"
import DistanceMeasurements from "./BleDevices/DistanceMeasurements"

export default function BleDevices() {
    return (
        <div className="md:grid md:grid-cols-1 md:gap-10">
            <div>
                <ConnectingBleDevices />
                <DistanceMeasurements />
            </div>
        </div>
    )
}
