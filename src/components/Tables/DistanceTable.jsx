/* eslint-disable operator-linebreak */
import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function DistanceTable({ headers, distanceData }) {
    useEffect(() => {}, [])

    return (
        <div className="sm:overflow-x-auto">
            <div className="overflow-x-auto">
                <table className="table-auto ">
                    <thead className="bg-white border-b">
                        <tr>
                            {headers &&
                                headers.map((item) => {
                                    return (
                                        <th
                                            key={item}
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            {item}
                                        </th>
                                    )
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {distanceData &&
                            distanceData.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b odd:bg-gray-100"
                                    >
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.sequence}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.distance}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.error_distance}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.RecivedSignalStrengthIndex}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.firstPathIndex}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.nlos}
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

DistanceTable.propTypes = {
    distanceData: PropTypes.arrayOf(
        PropTypes.shape({
            RecivedSignalStrengthIndex: PropTypes.number,
            distance: PropTypes.number,
            error_distance: PropTypes.number,
            firstPathIndex: PropTypes.number,
            id: PropTypes.number,
            nlos: PropTypes.number,
            sequence: PropTypes.number
        }).isRequired
    ).isRequired,
    headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}
