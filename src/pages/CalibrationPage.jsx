import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import StyleContex from "../context/StyleContex"

export default function CalibrationPage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Calibration
            </h2>
            <Outlet />
        </>
    )
}
