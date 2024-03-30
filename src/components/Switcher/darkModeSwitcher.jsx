import React, { useState } from "react"
import useDarkSide from "../../utils/useDarkSide"
import ToggleSwitch from "./toggle"

export default function DarkModeSwitcher() {
    const [colorTheme, setTheme] = useDarkSide()
    const [darkSide, setDarkSide] = useState(colorTheme === "light")

    let toggleDarkMode = (value) => {
        console.log(value)
        setTheme(colorTheme)
        setDarkSide(value)
    }

    return (
        <ToggleSwitch
            status={darkSide}
            statusChange={toggleDarkMode}
        />
    )
}
