import React, { useContext } from "react"
import UwbSettingsTable from "../components/UwbSettingsTable"
import StyleContex
    from "../context/StyleContex"
export default function SettingsPage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <>
            <h2 className={headerStyle.h2}>
                Settings
            </h2>
            <UwbSettingsTable />
        </>
    )
}
