import React, { useState } from "react"
import PropTypes from "prop-types"

export default function ToggleSwitch({ status, statusChange }) {
    const [isSelected, setIsSelected] = useState(status)

    const toggleSelected = () => {
        setIsSelected(!isSelected)
        statusChange(isSelected)
    }

    return (
        <div
            onClick={() => {
                return toggleSelected()
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    toggleSelected()
                }
            }}
            role="button"
            tabIndex={0}
            // eslint-disable-next-line prettier/prettier
            className={`flex w-10 h-5 rounded-full ${isSelected ? "bg-green-500 dark:bg-green-600" : "bg-neutral-600"
                // eslint-disable-next-line prettier/prettier, indent
                }`}
        >
            <span className={`h-5 w-5 bg-white rounded-full ${isSelected ? "ml-5" : ""}`} />
        </div>
    )
}

ToggleSwitch.propTypes = {
    statusChange: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired
}
