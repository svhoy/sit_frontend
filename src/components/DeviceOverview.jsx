/* eslint-disable operator-linebreak */
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import DeviceTable from "./Tables/DeviceTable"
import StyleContex from "../context/StyleContex"

export default function DeviceOverview() {
    const { containerStyle, headerStyle, buttonStyle } = useContext(StyleContex)
    return (
        <div className={containerStyle.component}>
            <div className={containerStyle.left}>

                <h3 className={headerStyle.h3}>
                    Devices
                </h3>
                <div className={containerStyle.leftComponent}>
                    <Link to="/devices/ble/add">
                        <button
                            type="button"
                            className={buttonStyle.activ}
                        >
                            Add Device
                        </button>
                    </Link>
                </div>
            </div>
            <div className={containerStyle.right}>
                <DeviceTable />
            </div>
        </div>
    )
}
