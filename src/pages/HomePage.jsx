import React, { useContext } from "react"
import StyleContex from "../context/StyleContex"

export default function HomePage() {
    const { headerStyle } = useContext(StyleContex)
    return (
        <div className="flex-1 ">
            <h1 className={headerStyle.h1}>
                Sport Indoor Tracking - Test App
            </h1>
            <h2 className={headerStyle.h2}>
                {" "}
                Welcome to the Sport Indoor Tracking - Test App
            </h2>
        </div >
    )
}
