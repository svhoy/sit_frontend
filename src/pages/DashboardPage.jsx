import React, { useContext } from "react"
import StyleContex from "../context/StyleContex"

export default function DashboardPage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <h2 className={headerStyle.h2}>
            Dashboard
        </h2>
    )
}
