import React from "react"
import { Outlet } from "react-router-dom"

export default function TestPage() {
    return (
        <>
            <h2 className="font-bold leading-tight mt-3 mb-5 text-l md:text-xl lg:text-2xl">
                Distance Tests
            </h2>
            <Outlet />
        </>
    )
}
