import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import WebStyleContex from "../context/StyleContex"

export default function TestSettings() {
    const { headerStyle } = useContext(WebStyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Distance Test
            </h2>
            <Outlet />
        </>
    )
}
