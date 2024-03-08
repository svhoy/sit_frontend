import React from "react"
import { Outlet } from "react-router-dom"

export default function TestSettings() {
    return (
        <>
            <h2 className="font-bold leading-tight mt-3 mb-5 text-l md:text-xl lg:text-2xl">
                Distance Test
            </h2>
            <Outlet />
        </>
    )
}
