import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import StyleContex from "../context/StyleContex"

export default function DistancePage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Distances
            </h2>
            <Outlet />
        </>
    )
}
