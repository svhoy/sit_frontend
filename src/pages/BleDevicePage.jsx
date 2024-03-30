import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import StyleContex from "../context/StyleContex"

export default function BleDevicePage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Bluetooth Devices
            </h2>
            <Outlet />
        </>
    )
}
