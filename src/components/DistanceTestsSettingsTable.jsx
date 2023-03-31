import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPlay } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import useFetch from "../utils/useFetch"

export default function DistanceTestsSettingsTable({ handleTestState }) {
    const [addTestSettingsList, setAddTestSettingsList] = useState([])
    const [baseURL] = useState("/api/tests/settings-list")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    const [checkTest, setCheckTest] = useState(null)
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()

    let getTestSettingsList = async (url = baseURL) => {
        let { response, data } = await api(url)

        if (response.status === 200) {
            if (data.next) {
                let nextPage = data.next.match(rexPage)
                setNextURL(baseURL + nextPage)
            } else {
                setNextURL(null)
            }
            if (data.previous) {
                if (rexPage.test(data.previous)) {
                    let previousPage = data.previous.match(rexPage)
                    setPreviousURL(baseURL + previousPage)
                } else {
                    setPreviousURL(baseURL)
                }
            } else {
                setPreviousURL(null)
            }
            setAddTestSettingsList(data.results)
        }
    }

    useEffect(() => {
        getTestSettingsList()
    }, [])

    let deleteDistance = async (id) => {
        let { response } = await api(`/api/tests/settings/${id}/`, "DELETE")
        console.log(response.status)

        if (response.status === 204) {
            getTestSettingsList()
        }
    }

    let nextPage = () => {
        getTestSettingsList(nextURL)
    }

    let previousPage = () => {
        getTestSettingsList(previousURL)
    }

    let startTest = () => {
        console.log("startTest")
    }

    let toggleSelected = (id) => {
        return () => {
            if (checkTest === id) {
                setCheckTest(null)
            } else {
                setCheckTest(id)
            }
        }
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="font-bold leading-tight text-gray-900 mt-3 mb-5 text-m md:text-l lg:text-xl">
                        Test Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-0">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                            onClick={() => {
                                return handleTestState("add")
                            }}
                        >
                            Add Settings
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-0" />
                    <div className="grid grid-cols-2 gap-0" />
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0 md:w-full">
                <div className="shadow min-w-full sm:overflow-x-auto sm:rounded-md">
                    <div className="overflow-x-auto">
                        <table className="table-auto overflow-scroll min-w-full ">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th
                                        aria-label="Checkbox"
                                        className="text-sm font-medium text-gray-900 px-3 py-4 text-left"
                                    />
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        ID
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Test Name
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Test Typ
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Distanz
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Einheit
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Minimum Messungen
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Maximum Messungen
                                    </th>
                                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Owner
                                    </th>
                                    <th
                                        aria-label="Buttons"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    />
                                </tr>
                            </thead>
                            <tbody>
                                {addTestSettingsList &&
                                    addTestSettingsList.map((item) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className="bg-white border-b odd:bg-gray-100"
                                            >
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        id={item.id}
                                                        checked={checkTest === item.id}
                                                        onChange={toggleSelected(item.id)}
                                                    />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_type}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_distance}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_unit}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_min_measurements}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.test_max_measurements}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.user}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        className="mx-2"
                                                        onClick={() => {
                                                            return handleDeleteClick(item.id)
                                                        }}
                                                        title="Löschen"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-1">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="bg-gray-50 px-1 py-3 text-left sm:px-3">
                                {previousURL != null ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                        onClick={previousPage}
                                    >
                                        Previous
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                )}
                                {nextURL != null ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                        onClick={nextPage}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                        disabled
                                    >
                                        Next
                                    </button>
                                )}
                                {checkTest != null ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-100"
                                        onClick={startTest}
                                    >
                                        Start Test
                                        <span className="ml-2">
                                            <FontAwesomeIcon icon={faPlay} />
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 opacity-30"
                                        disabled
                                    >
                                        Start Test
                                        <span className="ml-2">
                                            <FontAwesomeIcon icon={faPlay} />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

DistanceTestsSettingsTable.propTypes = {
    handleTestState: PropTypes.func.isRequired
}
