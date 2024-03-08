/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../utils/useFetch"

export default function DistancesTable() {
    const [distanceMeasurementsList, setdistanceMeasurementsList] = useState([])
    const [baseURL] = useState("/api/measurement-list/")
    const [nextURL, setNextURL] = useState(null)
    const [previousURL, setPreviousURL] = useState(null)
    let rexPage = /\?page=\d{1,}/

    let api = useFetch()

    let getDistanceMeasurements = async (url = baseURL) => {
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
            setdistanceMeasurementsList(data.results)
        }
    }

    useEffect(() => {
        getDistanceMeasurements()
    }, [])

    let deleteDistance = async (settingId) => {
        let { response } = await api(`/api/measurement-list/${settingId}/`, "DELETE")

        if (response.status === 204) {
            getDistanceMeasurements()
        }
    }

    let nextPage = () => {
        getDistanceMeasurements(nextURL)
    }

    let previousPage = () => {
        getDistanceMeasurements(previousURL)
    }

    let handleDeleteClick = (settingId) => {
        deleteDistance(settingId)
    }

    return (
        <div className="shadow sm:overflow-x-auto sm:rounded-md">
            <div className="overflow-x-auto">
                <table className="table-auto">
                    <thead className="border-b">
                        <tr>
                            <th className="text-sm font-medium px-6 py-4 text-left">ID</th>
                            <th className="text-sm font-medium px-6 py-4 text-left">Created</th>
                            <th className="text-sm font-medium px-6 py-4 text-left">Distance</th>
                            <th
                                aria-label="Button"
                                className="text-sm font-medium px-6 py-4 text-left"
                            />
                        </tr>
                    </thead>
                    <tbody>
                        {distanceMeasurementsList &&
                            distanceMeasurementsList.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b odd:bg-gray-100 dark:odd:bg-neutral-700"
                                    >
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.id}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.created}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            {item.distance}
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
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
            <div className="mt-5 md:mt-2">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="bg-white-50 dark:bg-neutral-800 px-1 py-3 text-left sm:px-3">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
