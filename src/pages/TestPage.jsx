import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import StyleContex from "../context/StyleContex"

export default function TestPage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Distance Tests
            </h2>
            <Outlet />
        </>
    )
}
