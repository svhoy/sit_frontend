/* eslint-disable prettier/prettier */
import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function StaticSelect({ handleSelectedValue, label, options }) {
    const handleSelectChange = (event) => {
        event.preventDefault()
        handleSelectedValue(event.target.value)
    }

    useEffect(() => {
        if (Array.isArray(options[0])) {
            handleSelectedValue(options[0][1])
        } else {
            handleSelectedValue(options[0])
        }
    }, [])

    return (
        <label
            htmlFor="select"
            className="block text-sm font-medium leading-6"
        >
            {label}
            <div className="mt-1">
                <select
                    className="block w-full rounded-md border-0 px-2 py-1.5 dark:bg-neutral-600 text-gray-700 dark:text-neutral-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 dark:placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="select"
                    label={label}
                    onChange={handleSelectChange}
                >
                    {options
                        && options.map((item) => {
                            if (typeof item === "string") {
                                return (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            }
                            return (
                                <option
                                    key={item[1]}
                                    value={item[1]}
                                >
                                    {item[0]}
                                </option>
                            )
                        })}
                </select>
            </div>
        </label>
    )
}

StaticSelect.propTypes = {
    handleSelectedValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType(
            [PropTypes.string, PropTypes.arrayOf(PropTypes.string)]
        )
    ).isRequired
}
